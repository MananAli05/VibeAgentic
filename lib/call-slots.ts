// Strategy-call slots are offered in US Eastern time (the Philadelphia office) and shown to each
// visitor in their own timezone as well, so someone in Karachi or London can pick a time correctly.

export const OFFICE_TIMEZONE = 'America/New_York'

/** Slot start times in office (Eastern) time, as [hour, minute]. */
export const CALL_SLOTS: [number, number][] = [
  [9, 0],
  [11, 0],
  [14, 0],
  [16, 0],
]

export function slotKey([h, m]: [number, number]) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function visitorTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

/** Offset of `timeZone` from UTC, in minutes, at the given instant (handles daylight saving). */
function offsetMinutes(timeZone: string, at: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(at)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return Math.round((asUtc - at.getTime()) / 60000)
}

/** The exact instant of an Eastern-time slot on a yyyy-mm-dd date (today if no date is chosen yet). */
export function slotInstant(date: string, [h, m]: [number, number]): Date {
  const [y, mo, d] = date
    ? date.split('-').map(Number)
    : (() => {
        const now = new Date()
        return [now.getFullYear(), now.getMonth() + 1, now.getDate()]
      })()
  const guess = new Date(Date.UTC(y, mo - 1, d, h, m))
  const offset = offsetMinutes(OFFICE_TIMEZONE, guess)
  return new Date(guess.getTime() - offset * 60000)
}

export function formatInZone(instant: Date, timeZone: string, withDate = false): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
    ...(withDate ? { weekday: 'short', month: 'short', day: 'numeric' } : {}),
  }).format(instant)
}

/** e.g. "7:00 PM GMT+5 (9:00 AM EST)": the visitor's own time first; office time only when it differs. */
export function slotLabel(date: string, slot: [number, number], localZone: string): string {
  const instant = slotInstant(date, slot)
  const office = formatInZone(instant, OFFICE_TIMEZONE)
  const local = formatInZone(instant, localZone)
  return office === local ? office : `${local} (${office})`
}

/** Today's date in the visitor's timezone as yyyy-mm-dd, for the date input's `min`. */
export function todayISO(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}
