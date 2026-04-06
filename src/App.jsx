import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TimecardForm from "./components/timecard/TimecardForm";

function Nav() {
  const { user, logout } = useAuth();

  const linkStyle = ({ isActive }) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#030e4f" : "#8892a4",
    background: isActive ? "#eef0fb" : "transparent",
    transition: "all 0.15s ease",
  });

  return (
    <nav style={{
      borderBottom: "1px solid #e2e6f0",
      background: "white",
      padding: "0 1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      height: "52px",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: "0.95rem",
        color: "#030e4f",
        marginRight: "20px",
        letterSpacing: "-0.01em",
      }}>
        ⚡ Productive
      </span>

      {user && (
        <>
          <NavLink to="/" end style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/log" style={linkStyle}>Log Today</NavLink>
        </>
      )}

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
        {user ? (
          <>
            <span style={{
              fontSize: "0.8rem", color: "#8892a4", fontWeight: 500,
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: "#eef0fb", color: "#030e4f",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.72rem", fontWeight: 700,
              }}>
                {user.name?.charAt(0) ?? user.id?.charAt(0) ?? "?"}
              </span>
              {user.name || user.id}
            </span>
            <button
              onClick={logout}
              style={{
                background: "transparent", border: "1.5px solid #e2e6f0",
                borderRadius: "7px", padding: "5px 12px",
                fontSize: "0.78rem", fontWeight: 500, color: "#8892a4",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <NavLink to="/login" style={linkStyle}>Sign in</NavLink>
        )}
      </div>
    </nav>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignupPage />} />

      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/log" element={<ProtectedRoute><TimecardForm /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
