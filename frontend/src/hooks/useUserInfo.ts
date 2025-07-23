import { useEffect, useState } from "react";

export const useUserInfo = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return user;
};
