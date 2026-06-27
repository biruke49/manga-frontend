import type { LoginResponse, AuthProfile } from "../model/types";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload?.message ||
      payload?.error ||
      `Request failed with status ${response.status}`;
    throw new Error(Array.isArray(message) ? message.join(" ") : message);
  }
  return response.json() as Promise<T>;
}

export async function login(
  phoneNumber: string,
  password: string,
  type: string = "reader"
): Promise<LoginResponse> {
  const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, password, type }),
    cache: "no-store",
  });
  return parseResponse<LoginResponse>(response);
}

export async function getUserInfo(token: string): Promise<AuthProfile | null> {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/auth/get-user-info`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    return parseResponse<AuthProfile>(response);
  } catch {
    return null;
  }
}

export async function logout(token: string): Promise<void> {
  try {
    await fetch(`${getApiBaseUrl()}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    // ignore logout errors
  }
}
