import { createHmac, timingSafeEqual } from 'node:crypto'

// Single-password admin login. No database: the session is a stateless
// signed token (HMAC) so it works on serverless hosts (Vercel, etc.).
// Env vars:
//   PLC_ADMIN_PASSWORD     - the single login password
//   PLC_ADMIN_SESSION_SECRET - HMAC secret for session tokens (falls back to PLC_ADMIN_KEY)

const SESSION_TTL_MS = 12 * 60 * 60 * 1000
const COOKIE = 'plc_admin_token'

function secret(): string {
  return process.env.PLC_ADMIN_SESSION_SECRET || process.env.PLC_ADMIN_KEY || ''
}

export function passwordConfigured(): boolean {
  return Boolean(process.env.PLC_ADMIN_PASSWORD)
}

export function checkPassword(input: string): boolean {
  const expected = process.env.PLC_ADMIN_PASSWORD ?? ''
  if (!expected) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function createSessionToken(): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  const expected = sign(payload)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number }
    return typeof parsed.exp === 'number' && parsed.exp > Date.now()
  } catch {
    return false
  }
}

export function sessionCookieName(): string {
  return COOKIE
}
