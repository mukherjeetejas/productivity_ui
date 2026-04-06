import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const GENDERS = ["MALE", "FEMALE", "OTHER"];

export default function SignupPage() {
  const { signup, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    height: "",
    tempAuthentication: "",
    confirmPassword: "",
  });

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  const passwordMatch = form.tempAuthentication === form.confirmPassword;
  const valid = form.id && form.name && form.email && form.gender &&
    form.tempAuthentication && passwordMatch;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;
    try {
      const { confirmPassword, ...payload } = form;
      await signup({
        ...payload,
        height: form.height ? parseFloat(form.height) : 0,
      });
      navigate("/");
    } catch {
      // error already set in context
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#f7f8fc",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
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
            Create account
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#8892a4", margin: 0 }}>
            Start tracking your daily progress
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "white", borderRadius: "16px",
          border: "1px solid #e2e6f0", padding: "28px 24px",
          boxShadow: "0 4px 24px rgba(3,14,79,0.06)",
        }}>
          <form onSubmit={handleSubmit}>

            {/* Name + Username */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div>
                <label className="tc-label">Full name</label>
                <input className="tc-input" placeholder="Tejas Mukherjee"
                  value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label className="tc-label">Username</label>
                <input className="tc-input" placeholder="tejasMukherjee"
                  value={form.id} onChange={(e) => set("id", e.target.value)}
                  autoComplete="username" />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "14px" }}>
              <label className="tc-label">Email</label>
              <input className="tc-input" type="email" placeholder="you@example.com"
                value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>

            {/* Gender + Height */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div>
                <label className="tc-label">Gender</label>
                <select className="tc-input" value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}>
                  <option value="">Select</option>
                  {GENDERS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="tc-label">Height (cm) <span style={{ color: "#b0b8c9", fontWeight: 400 }}>optional</span></label>
                <input className="tc-input" type="number" placeholder="182"
                  value={form.height} onChange={(e) => set("height", e.target.value)} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #e2e6f0", margin: "18px 0 16px" }} />

            {/* Password */}
            <div style={{ marginBottom: "14px" }}>
              <label className="tc-label">Password</label>
              <input className="tc-input" type="password" placeholder="••••••••"
                value={form.tempAuthentication}
                onChange={(e) => set("tempAuthentication", e.target.value)}
                autoComplete="new-password" />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="tc-label">Confirm password</label>
              <input
                className="tc-input"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => set("confirmPassword", e.target.value)}
                autoComplete="new-password"
                style={{
                  borderColor: form.confirmPassword && !passwordMatch ? "#fca5a5" : undefined,
                }}
              />
              {form.confirmPassword && !passwordMatch && (
                <p style={{ fontSize: "0.75rem", color: "#b91c1c", marginTop: "5px" }}>
                  Passwords don't match
                </p>
              )}
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
              disabled={!valid || loading}
              className="tc-submit"
              style={{ opacity: !valid || loading ? 0.6 : 1 }}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.875rem", color: "#8892a4" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#030e4f", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
