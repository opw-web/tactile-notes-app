// Format a Date as YYYY-MM-DD using LOCAL components.
// Avoids the toISOString() bug where local midnight in UTC+ timezones
// converts back to the previous calendar day in UTC.
export function localISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayLocalISO() {
  return localISO(new Date());
}

export function generateDateRange(daysBeforeAfter = 15) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const labels = [];
  const values = [];

  for (let i = -daysBeforeAfter; i <= daysBeforeAfter; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    values.push(localISO(d));
    if (i === 0) {
      labels.push('TODAY');
    } else {
      labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
  }

  return { labels, values, todayIndex: daysBeforeAfter };
}

export function getCurrentTimeIndices() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampmIdx = hours >= 12 ? 1 : 0;
  hours = hours % 12 || 12;
  const hourIdx = hours - 1;
  const minuteIdx = Math.round(minutes / 15) % 4;
  return { hourIdx, minuteIdx, ampmIdx };
}
