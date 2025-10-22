// useAuthStatus.ts
import { useEffect, useState } from "react";

export default function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!window.localStorage.getItem("accessToken"));

      const onStorage = (event: StorageEvent) => {
        if (event.key === "accessToken") {
          setIsAuthenticated(!!event.newValue);
        }
      };
      const onCustom = () => setIsAuthenticated(false); // rankademy:logout

      window.addEventListener("storage", onStorage);
      window.addEventListener("rankademy:logout", onCustom as EventListener);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(
          "rankademy:logout",
          onCustom as EventListener
        );
      };
    }
  }, []);

  return { isAuthenticated };
}
