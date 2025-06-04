"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        // localStorage.clear();
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};

export default useLogout;
