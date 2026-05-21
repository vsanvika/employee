import { NavLink } from "react-router";

function Header() {
  return (
    <nav
      style={{
        background: "rgba(15, 12, 41, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
      className="flex items-center justify-between px-8 py-4"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            boxShadow: "0 4px 16px rgba(124,58,237,0.5)",
          }}
        >
          👥
        </div>
        <span
          style={{
            fontWeight: 800,
            fontSize: 22,
            background: "linear-gradient(90deg, #a78bfa, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          EmpTrack
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-2">
        {[
          { to: "", label: "Home" },
          { to: "create-emp", label: "Add Employee" },
          { to: "list", label: "Employees" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ""}
            className={({ isActive }) =>
              isActive ? "active-nav-link nav-link" : "nav-link"
            }
            style={({ isActive }) => ({
              padding: "8px 18px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.25s",
              background: isActive
                ? "linear-gradient(135deg, #7c3aed33, #4f46e533)"
                : "transparent",
              color: isActive ? "#a78bfa" : "rgba(255,255,255,0.65)",
              border: isActive
                ? "1px solid rgba(167,139,250,0.35)"
                : "1px solid transparent",
            })}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Header;