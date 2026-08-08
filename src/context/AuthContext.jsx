import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USER = {
  userId: "demo",
  password: "shop123",
  name: "Demo Shopper",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("shop_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState("");

  function login(userId, password) {
    if (userId === DEMO_USER.userId && password === DEMO_USER.password) {
      const nextUser = { userId, name: DEMO_USER.name };
      setUser(nextUser);
      sessionStorage.setItem("shop_user", JSON.stringify(nextUser));
      setError("");
      return true;
    }
    setError("Invalid User ID or Password.");
    return false;
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem("shop_user");
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), error, login, logout }),
    [user, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}