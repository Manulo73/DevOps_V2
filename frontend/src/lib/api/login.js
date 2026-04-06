const api_base = process.env.NEXT_PUBLIC_API_BASE;
const API_BASE = `${api_base}/auth`;

async function loginRequest(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

// ===========================
//     PUBLIC LOGIN FUNCTION
// ===========================
export async function login(email, password) {
  const { ok, data } = await loginRequest(email, password);

  if (!ok) {
    return { ok: false, error: data.error || "Error desconocido." };
  }

  // Store token for middleware (cookie)
  document.cookie = `auth_token=${data.token}; path=/; max-age=28800; SameSite=Lax`;

  // Optional for client access
  localStorage.setItem("account", JSON.stringify(data.account));

  return { ok: true };
}

// ===========================
//     PUBLIC LOGOUT FUNCTION
// ===========================
export function logout() {
  // Remove cookie
  document.cookie = "auth_token=; path=/; max-age=0";

  // Remove localstorage
  localStorage.removeItem("account");
}
