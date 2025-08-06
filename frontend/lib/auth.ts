import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import Cookies from "js-cookie";

export const useAuth = () => {
  const router = useRouter();

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 8 });
    router.push("/tasks");
  };

  const logout = () => {
    Cookies.remove("token");
    notifications.show({
      title: "Success",
      message: "You have been logged out",
      color: "green",
    });
    router.push("/sign-in");
  };

  const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      return !!Cookies.get("token");
    }
    return false;
  };

  return { login, logout, isAuthenticated };
};
