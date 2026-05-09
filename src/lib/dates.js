export function generateDateRange(daysBeforeAfter = 15) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const labels = [];
  const values = [];

  for (let i = -daysBeforeAfter; i <= daysBeforeAfter; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    values.push(iso);
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
