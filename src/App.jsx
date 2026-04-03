import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TimecardForm from "./components/timecard/TimecardForm";

function Nav() {
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
        Productive
      </span>
      <NavLink to="/" end style={linkStyle}>Dashboard</NavLink>
      <NavLink to="/log" style={linkStyle}>Log Today</NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/log" element={<TimecardForm />} />
      </Routes>
    </BrowserRouter>
  );
}
