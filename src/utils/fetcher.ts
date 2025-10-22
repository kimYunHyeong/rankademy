import { API_BASE_URL } from "@/lib/api";

export async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJob25naGN5MDFAZ21haWwuY29tIiwiaWQiOjE2LCJzdW1tb25lck5hbWUiOiLtmY3ssKzsmIFfR09PR0xFIiwiaXNBdXRob3JpemVkIjpmYWxzZSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTc2MTA0OTczMiwiZXhwIjoxNzYxMTM2MTMyfQ.x8JmYziRJiJaFmWglDLlpRgzRo3_0x_VwuXjM_joaYU";

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`API Error: ${res.status}`);

  // 응답 복제해서 로그 출력
  const cloned = res.clone();
  const data = await cloned.json();
  console.log("✅ API Response:", data);

  return res.json();
}
