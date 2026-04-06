import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, createUser } from "../services/api";

const AuthContext = createContext(null);

const SESSION_KEY = "productive_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function persist(userData) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
    setError(null);
  }

  async function login(userId, password) {
    setLoading(true);
    setError(null);
    try {
      const userData = await apiLogin(userId, password);
      persist(userData);
      return userData;
    } catch (e) {
      setError("Invalid username or password.");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function signup(formData) {
    setLoading(true);
    setError(null);
    try {
      const userData = await createUser(formData);
      persist(userData);
      return userData;
    } catch (e) {
      setError(e.message || "Signup failed. Please try again.");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
