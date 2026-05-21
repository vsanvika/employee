import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Home() {
  const [stats, setStats] = useState({ total: 0, departments: 0 });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/emp-api/employees`);
        if (res.status === 200) {
          const emps = res.data.payload || [];
          const depts = new Set(emps.map((e) => e.designation).filter(Boolean));
          setStats({ total: emps.length, departments: depts.size });
        }
      } catch (_) {}
    };
    fetchStats();
  }, []);

  const cards = [
    { icon: "👥", label: "Total Employees", value: stats.total, color: "#7c3aed" },
    { icon: "🏢", label: "Designations", value: stats.departments, color: "#0ea5e9" },
    { icon: "📈", label: "Active Today", value: stats.total, color: "#10b981" },
  ];

  return (
    <div className="fade-in">
      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px 40px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: 999,
            background: "rgba(124,58,237,0.18)",
            border: "1px solid rgba(167,139,250,0.3)",
            color: "#a78bfa",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
            letterSpacing: 1,
          }}
        >
          ✦ EMPLOYEE MANAGEMENT SYSTEM
        </div>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900,
            margin: "0 0 20px",
            background: "linear-gradient(135deg, #fff 30%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          Manage Your Team<br />Like Never Before
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 18,
            maxWidth: 500,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          A modern platform to track, manage, and organize your entire workforce in one beautiful dashboard.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/create-emp")}
            className="btn-primary"
            style={{ fontSize: 16, padding: "14px 36px" }}
          >
            ➕ Add Employee
          </button>
          <button
            onClick={() => navigate("/list")}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 12,
              padding: "14px 36px",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.14)")}
            onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.08)")}
          >
            📋 View All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
          marginTop: 48,
        }}
      >
        {cards.map((c) => (
          <div key={c.label} className="stat-card fade-in">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `${c.color}22`,
                border: `1px solid ${c.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                margin: "0 auto 14px",
              }}
            >
              {c.icon}
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {c.value}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500 }}>
              {c.label}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Highlights */}
      <div
        style={{
          marginTop: 60,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {[
          {
            icon: "🔍",
            title: "Smart Search",
            desc: "Instantly search and filter employees by name, email, or designation.",
          },
          {
            icon: "✏️",
            title: "Quick Edit",
            desc: "Update employee details with a single click — changes reflect instantly.",
          },
          {
            icon: "🗑️",
            title: "Safe Delete",
            desc: "Remove employees from the system with confirmation safeguards.",
          },
        ].map((f) => (
          <div key={f.title} className="glass-card" style={{ padding: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#fff" }}>
              {f.title}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;