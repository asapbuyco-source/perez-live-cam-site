'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  KeyRound,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Smartphone,
} from 'lucide-react'

interface LicenseInfo {
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

const STATUS_STYLE: Record<string, string> = {
  active: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  unused: 'border-border bg-muted/40 text-muted-foreground',
  expired: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  revoked: 'border-destructive/30 bg-destructive/10 text-destructive',
}

function fmtDate(value: string | null): string {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        })
      }}
      className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      title="Copy"
    >
      {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
    </button>
  )
}

export function AdminClient() {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [busy, setBusy] = useState(false)

  // create
  const [days, setDays] = useState(365)
  const [devices, setDevices] = useState(1)
  const [count, setCount] = useState(1)
  const [created, setCreated] = useState<{ code: string; licenseId: string }[]>([])
  const [createError, setCreateError] = useState('')

  // list
  const [licenses, setLicenses] = useState<LicenseInfo[]>([])
  const [listError, setListError] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notice, setNotice] = useState('')

  // download settings
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloadName, setDownloadName] = useState('')
  const [appVersion, setAppVersion] = useState('')
  const [androidApkUrl, setAndroidApkUrl] = useState('')
  const [androidApkName, setAndroidApkName] = useState('')
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  useEffect(() => {
    void fetch('/api/admin/session')
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.ok)))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  useEffect(() => {
    if (!authed || settingsLoaded) return
    void fetch('/api/admin/settings')
      .then((r) => r.json().catch(() => ({})))
      .then((data) => {
        const s = data?.settings
        if (s) {
          setDownloadUrl(s.downloadUrl ?? '')
          setDownloadName(s.downloadName ?? '')
          setAppVersion(s.appVersion ?? '')
          setAndroidApkUrl(s.androidApkUrl ?? '')
          setAndroidApkName(s.androidApkName ?? '')
        }
      })
      .catch(() => {})
      .finally(() => setSettingsLoaded(true))
  }, [authed, settingsLoaded])

  async function saveDownloadSettings() {
    setBusy(true)
    setNotice('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloadUrl, downloadName, appVersion, androidApkUrl, androidApkName }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.message || 'Save failed')
      setNotice('Download settings saved.')
    } catch (err) {
      setNotice(`Failed: ${(err as Error).message}`)
    } finally {
      setBusy(false)
    }
  }

  async function login() {
    setBusy(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.message || 'Login failed')
      setAuthed(true)
    } catch (err) {
      setLoginError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false)
    setPassword('')
    setCreated([])
    setLicenses([])
  }

  async function createCodes() {
    setBusy(true)
    setCreateError('')
    setNotice('')
    try {
      const res = await fetch('/api/admin/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days, maxDevices: devices, count }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.message || 'Create failed')
      setCreated(data.codes)
    } catch (err) {
      setCreateError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function loadLicenses() {
    setListError('')
    try {
      const res = await fetch('/api/admin/licenses')
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.message || 'Load failed')
      setLicenses(data.licenses)
    } catch (err) {
      setListError((err as Error).message)
    }
  }

  async function action(id: string, path: string, body?: unknown) {
    try {
      const res = await fetch(`/api/admin/licenses/${id}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.message || 'Action failed')
      setNotice(`Done (${id.slice(0, 8)}…)`)
      await loadLicenses()
    } catch (err) {
      setNotice(`Failed: ${(err as Error).message}`)
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    )
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <Logo />
            <h1 className="mt-2 text-xl font-semibold text-foreground">Admin sign in</h1>
            <p className="text-sm text-muted-foreground">Perez Live Cam license manager</p>
          </div>
          <form
            className="mt-6 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              void login()
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/50"
            />
            {loginError && <p className="text-sm text-destructive">{loginError}</p>}
            <Button type="submit" size="lg" disabled={busy || !password}>
              <KeyRound className="size-4" />
              Sign in
            </Button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              Admin
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => void logout()}>
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>

        {notice && (
          <div className="mt-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
            {notice}
          </div>
        )}

        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Download className="size-4 text-primary" />
            Download link
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The URL the site&apos;s Download buttons point to. Update it whenever
            you ship a new installer.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_160px]">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">Download URL</span>
              <input
                type="url"
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                placeholder="https://…/installer.exe"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">File name (optional)</span>
              <input
                type="text"
                value={downloadName}
                onChange={(e) => setDownloadName(e.target.value)}
                placeholder="Perez Live Cam-Setup-0.1.0-x64.exe"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">Version</span>
              <input
                type="text"
                value={appVersion}
                onChange={(e) => setAppVersion(e.target.value)}
                placeholder="0.1.0"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={() => void saveDownloadSettings()} disabled={busy || (!downloadUrl && !androidApkUrl)}>
              <Save className="size-4" />
              Save download links
            </Button>
            <span className="text-xs text-muted-foreground">
              {downloadUrl ? 'Currently: ' + downloadUrl : 'No Windows link set'}
            </span>
          </div>

          <div className="mt-5 border-t border-border pt-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Smartphone className="size-4 text-primary" />
              Android app (APK)
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Set the APK link and a banner asking Android visitors to download
              the app will show automatically at the top of the site.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_220px]">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">APK download URL</span>
                <input
                  type="url"
                  value={androidApkUrl}
                  onChange={(e) => setAndroidApkUrl(e.target.value)}
                  placeholder="https://…/perez-live-cam.apk"
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">File name (optional)</span>
                <input
                  type="text"
                  value={androidApkName}
                  onChange={(e) => setAndroidApkName(e.target.value)}
                  placeholder="Perez Live Cam.apk"
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
                />
              </label>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
          {/* Create codes */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Plus className="size-4 text-primary" />
              Create codes
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">Duration (days)</span>
                <input
                  type="number"
                  min={1}
                  max={3650}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">Max devices</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={devices}
                  onChange={(e) => setDevices(Number(e.target.value))}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">How many</span>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring"
                />
              </label>
              <Button onClick={() => void createCodes()} disabled={busy}>
                <KeyRound className="size-4" />
                Generate
              </Button>
              {createError && <p className="text-sm text-destructive">{createError}</p>}
            </div>

            {created.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Generated codes
                </h3>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {created.map((c) => (
                    <li
                      key={c.licenseId}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground"
                    >
                      <span className="truncate">{c.code}</span>
                      <CopyButton text={c.code} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Licenses */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Licenses</h2>
              <Button variant="outline" size="sm" onClick={() => void loadLicenses()}>
                <RefreshCw className="size-4" />
                Refresh
              </Button>
            </div>
            {listError && <p className="mt-3 text-sm text-destructive">{listError}</p>}
            {licenses.length === 0 && !listError && (
              <p className="mt-4 text-sm text-muted-foreground">
                No licenses yet. Click Refresh or generate some codes on the left.
              </p>
            )}
            <ul className="mt-4 flex flex-col gap-2">
              {licenses.map((lic) => {
                const open = expanded === lic.id
                return (
                  <li key={lic.id} className="rounded-xl border border-border bg-background">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[lic.status] ?? STATUS_STYLE.unused}`}
                      >
                        {lic.status}
                      </span>
                      <span className="font-mono text-xs text-foreground">
                        {lic.codePrefix}…·{lic.id.slice(0, 6)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        expires {fmtDate(lic.expiresAt)}
                      </span>
                      <span className="ml-auto flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpanded(open ? null : lic.id)}
                        >
                          {open ? (
                            <ChevronUp className="size-3.5" />
                          ) : (
                            <ChevronDown className="size-3.5" />
                          )}
                          Info
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => void action(lic.id, 'extend', { days: 7 })}
                        >
                          +7 days
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => void action(lic.id, 'device')}
                          disabled={!lic.deviceId}
                        >
                          Unlink device
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => void action(lic.id, 'revoke')}
                          disabled={lic.status === 'revoked'}
                        >
                          Revoke
                        </Button>
                      </span>
                    </div>
                    {open && (
                      <dl className="grid gap-x-6 gap-y-1 border-t border-border px-4 py-3 text-xs sm:grid-cols-2">
                        <div className="flex justify-between gap-2">
                          <dt className="text-muted-foreground">ID</dt>
                          <dd className="font-mono text-foreground">{lic.id}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-muted-foreground">Created</dt>
                          <dd className="text-foreground">{fmtDate(lic.createdAt)}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-muted-foreground">Device</dt>
                          <dd className="font-mono text-foreground">{lic.deviceId ?? '—'}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-muted-foreground">Activations</dt>
                          <dd className="text-foreground">
                            {lic.activationCount} / {lic.maxDevices}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-muted-foreground">Last validated</dt>
                          <dd className="text-foreground">{fmtDate(lic.lastValidation)}</dd>
                        </div>
                        {lic.revokedAt && (
                          <div className="flex justify-between gap-2">
                            <dt className="text-muted-foreground">Revoked</dt>
                            <dd className="text-foreground">{fmtDate(lic.revokedAt)}</dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
