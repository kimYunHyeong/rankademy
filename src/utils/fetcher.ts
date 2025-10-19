import { API_BASE_URL } from "@/lib/api";

export async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!res.ok) throw new Error(`API Error: ${res.status}`);

  // 응답을 복제해서 로그 확인 (res.json()은 한 번만 가능하므로)
  const cloned = res.clone();
  const data = await cloned.json();
  console.log("✅ API Response:", data);

  // 실제 반환용
  return res.json();
}
