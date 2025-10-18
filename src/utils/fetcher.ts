//API 호출 함수
import { API_BASE_URL } from "@/lib/api";

export async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}
