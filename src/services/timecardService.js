// Unchanged API logic — only the service layer touches the API
export async function submitTimecard(userId, formData) {
  const response = await fetch("/api/timecard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, ...formData }),
  });

  if (!response.ok) {
    throw new Error(`Submission failed: ${response.statusText}`);
  }

  return response.json();
}
