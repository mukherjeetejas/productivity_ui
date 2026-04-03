const BASE_URL = "http://localhost:8080";

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.statusText}`);
  return res.json();
}

// ── Timecard ──────────────────────────────────────────────
export const getToday = (userId) =>
  get(`/timecard/${userId}/today`);

export const getByDate = (userId, date) =>
  get(`/timecard/${userId}/${date}`);

export const getRange = (userId, start, end) =>
  get(`/timecard/${userId}?start=${start}&end=${end}`);

// ── Streaks ───────────────────────────────────────────────
export const getStreaks = (userId) =>
  get(`/user/${userId}/streaks`);

// ── Submit timecard ───────────────────────────────────────
export async function submitTimecard(userId, formData) {
  const res = await fetch(`${BASE_URL}/timecard/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error(`Submit failed: ${res.statusText}`);
  return res.json();
}

// ── Body metrics ──────────────────────────────────────────
export const getWeightHistory = (userId) =>
  get(`/user/${userId}/weightHistory`);

export const getBodyFatHistory = (userId) =>
  get(`/user/${userId}/bodyFat`);

export async function postWeight(userId, weight) {
  const res = await fetch(`${BASE_URL}/user/${userId}/weight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weight }),
  });
  if (!res.ok) throw new Error(`Post weight failed: ${res.statusText}`);
  return res.json();
}

export async function postBodyFat(userId, neckCircumference, waistCircumference) {
  const res = await fetch(`${BASE_URL}/user/${userId}/bodyFat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ neckCircumference, waistCircumference }),
  });
  if (!res.ok) throw new Error(`Post body fat failed: ${res.statusText}`);
  return res.json();
}
