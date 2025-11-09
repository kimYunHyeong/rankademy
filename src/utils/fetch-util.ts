import { cookies } from "next/headers";

/**
 * application/json POST 요청을 보내며, 쿠키의 accessToken을 Bearer 인증으로 포함합니다.
 */
export async function postWithAuthJSON<T = any>(
  url: string,
  body: Record<string, any>,
  options: RequestInit = {}
): Promise<T> {
  try {
    // 1️⃣ accessToken 가져오기
    let token: string | undefined;
    if (typeof window === "undefined") {
      // 서버 환경 (Next.js Server Component, Server Action 등)
      const cookieStore = cookies();
      token = (await cookieStore).get("accessToken")?.value;
    } else {
      // 클라이언트 환경
      token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
    }

    // 2️⃣ 요청 전송
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
      credentials: "include", // 쿠키 전송 허용
      ...options,
    });

    // 3️⃣ 에러 처리
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`❌ [POST ${res.status}] ${errorText}`);
    }

    // 4️⃣ JSON 응답 파싱 및 로그
    const data = (await res.json()) as T;
    console.log("📤 [Request]", body);
    console.log("📥 [Response]", data);
    return data;
  } catch (err) {
    console.error("🚨 Fetch Error:", err);
    throw err;
  }
}
