import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await login(userId.trim(), password);
      navigate("/");
    } catch {
      // error already set in context
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#f7f8fc",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "13px",
            background: "#030e4f", display: "inline-flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "22px", marginBottom: "14px",
          }}>
            ⚡
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "1.6rem", color: "#030e4f", margin: "0 0 6px",
            lineHeight: 1.3,
          }}>
            Productive
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#8892a4", margin: 0 }}>
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "white", borderRadius: "16px",
          border: "1px solid #e2e6f0", padding: "28px 24px",
          boxShadow: "0 4px 24px rgba(3,14,79,0.06)",
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label className="tc-label">Username</label>
              <input
                className="tc-input"
                placeholder="e.g. tejasMukherjee"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label className="tc-label">Password</label>
              <input
                className="tc-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div style={{
                background: "#fff5f5", border: "1px solid #fecaca",
                borderRadius: "8px", padding: "10px 12px",
                fontSize: "0.82rem", color: "#b91c1c", marginBottom: "16px",
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !userId || !password}
              className="tc-submit"
              style={{ opacity: loading || !userId || !password ? 0.6 : 1 }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.875rem", color: "#8892a4" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#030e4f", fontWeight: 600, textDecoration: "none" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
