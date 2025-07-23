import { useUserInfo } from "./useUserInfo";

export const useAdminInfo = () => {
  const user = useUserInfo();
  return user?.role === "admin" ? user : null;
};
