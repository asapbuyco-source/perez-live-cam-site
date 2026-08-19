// Server-only proxy to the Perez Live Cam license server admin API.
// The X-Admin-Key never leaves the server. Env vars:
//   PLC_LICENSE_API_URL - base URL of the deployed license server
//   PLC_ADMIN_KEY       - admin key (must match the server's PLC_ADMIN_KEY)

export interface CreatedCode {
  code: string
  licenseId: string
}

export interface LicenseInfo {
  id: string
  codePrefix: string
  status: string
  expiresAt: string | null
  createdAt: string | null
  revokedAt: string | null
  deviceId: string | null
  maxDevices: number
  activationCount: number
  lastValidation: string | null
}

function licenseApiUrl(): string {
  return (process.env.PLC_LICENSE_API_URL ?? '').replace(/\/+$/, '')
}

function adminKey(): string {
  return process.env.PLC_ADMIN_KEY ?? ''
}

export function isConfigured(): boolean {
  return Boolean(licenseApiUrl() && adminKey())
}

export async function adminRequest(
  path: string,
  init?: RequestInit,
): Promise<Record<string, unknown>> {
  const base = licenseApiUrl()
  if (!base) throw new Error('License server URL is not configured (PLC_LICENSE_API_URL).')
  const key = adminKey()
  if (!key) throw new Error('Admin key is not configured (PLC_ADMIN_KEY).')

  const res = await fetch(`${base}/admin${path}`, {
    ...init,
    headers: {
      'X-Admin-Key': key,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  })
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>
  if (!res.ok) {
    throw new Error(
      (typeof data?.message === 'string' ? data.message : undefined) ||
        `License server error (${res.status})`,
    )
  }
  return data
}

export async function listLicenses(search?: string, status?: string): Promise<LicenseInfo[]> {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (status) params.set('status', status)
  const qs = params.toString()
  const data = await adminRequest(`/licenses${qs ? `?${qs}` : ''}`)
  return Array.isArray(data.licenses) ? (data.licenses as LicenseInfo[]) : []
}

export async function createCodes(days: number, maxDevices: number, count: number): Promise<CreatedCode[]> {
  const out: CreatedCode[] = []
  for (let i = 0; i < Math.min(count, 50); i++) {
    const data = await adminRequest('/licenses', {
      method: 'POST',
      body: JSON.stringify({ days, maxDevices }),
    })
    out.push({ code: String(data.code ?? ''), licenseId: String(data.licenseId ?? '') })
  }
  return out
}

export async function getLicense(id: string): Promise<LicenseInfo> {
  const data = await adminRequest(`/licenses/${encodeURIComponent(id)}`)
  return data.license as LicenseInfo
}

export async function revokeLicense(id: string): Promise<void> {
  await adminRequest(`/licenses/${encodeURIComponent(id)}/revoke`, { method: 'POST' })
}

export async function extendLicense(id: string, days: number): Promise<void> {
  await adminRequest(`/licenses/${encodeURIComponent(id)}/extend`, {
    method: 'POST',
    body: JSON.stringify({ days }),
  })
}

export async function deactivateDevice(id: string): Promise<void> {
  await adminRequest(`/licenses/${encodeURIComponent(id)}/deactivate-device`, { method: 'POST' })
}
