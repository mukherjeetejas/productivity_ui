const BASE_URL = "https://productivity-timecard.onrender.com";

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.statusText}`);
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `POST ${path} failed: ${res.statusText}`);
  }
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────
// authenticate returns the full user object (userWeights, bodyFats, habitStreaks, etc.)
export const login = (userId, tempAuthentication) =>
  post(`/user/${userId}/authenticate`, { tempAuthentication });

export const createUser = (userData) =>
  post(`/user`, userData);

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
export const submitTimecard = (userId, formData) =>
  post(`/timecard/submit/${userId}`, formData);

// ── Body metrics ──────────────────────────────────────────
export const getWeightHistory = (userId) =>
  get(`/user/${userId}/weightHistory`);

export const getBodyFatHistory = (userId) =>
  get(`/user/${userId}/bodyFat`);

export const postWeight = (userId, weight) =>
  post(`/user/${userId}/weight`, { weight });

export const postBodyFat = (userId, neckCircumference, waistCircumference, hipCircumference) =>
  post(`/user/${userId}/bodyFat`, { neckCircumference, waistCircumference, hipCircumference});

// ── Habits ────────────────────────────────────────────────
export const getHabits = (userId) =>
  get(`/user/${userId}/habits`);


