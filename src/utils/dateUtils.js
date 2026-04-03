// Returns "YYYY-MM-DD" for today
export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// Returns "YYYY-MM-DD" for N days ago
export function daysAgoStr(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

// "2026-03-25" → "Mar 25"
export function shortDate(dateStr) {
  const [, m, d] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[+m - 1]} ${+d}`;
}

// Fill missing dates in a range with null-data entries
export function fillDateRange(data, start, end) {
  const map = {};
  data.forEach((d) => { map[d.date] = d; });

  const result = [];
  const cur = new Date(start);
  const last = new Date(end);
  while (cur <= last) {
    const key = cur.toISOString().slice(0, 10);
    result.push(map[key] || { date: key, _empty: true });
    cur.setDate(cur.getDate() + 1);
  }
  return result;
}
