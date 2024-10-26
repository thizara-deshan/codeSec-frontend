import { useState, useEffect } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const logout = async () => {
    await fetch(`${API_BASE_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};
