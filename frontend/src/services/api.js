const API_BASE = "http://127.0.0.1:8000";

export function getToken() {
  return localStorage.getItem("admin_token");
}

export async function apiRequest(
  url,
  method = "GET",
  body = null,
  isAdmin = false
) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (isAdmin) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return res.json();
}
