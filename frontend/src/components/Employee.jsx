import { useLocation, useNavigate } from "react-router";

const avatarColors = [
  "linear-gradient(135deg,#7c3aed,#4f46e5)",
  "linear-gradient(135deg,#0ea5e9,#06b6d4)",
  "linear-gradient(135deg,#10b981,#059669)",
];

function getInitials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  );
}

function Employee() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.5)" }}>
        <p style={{ fontSize: 20 }}>No employee data found.</p>
        <button className="btn-primary" onClick={() => navigate("/list")} style={{ marginTop: 16 }}>
          ← Back to List
        </button>
      </div>
    );
  }

  const colorIdx = (state.name || "").charCodeAt(0) % avatarColors.length;

  return (
    <div className="fade-in" style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Back button */}
      <button
        onClick={() => navigate("/list")}
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.6)",
          borderRadius: 10,
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: 24,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#fff")}
        onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
      >
        ← Back to Employees
      </button>

      {/* Profile Card */}
      <div className="glass-card" style={{ padding: "40px 36px" }}>
        {/* Avatar + Name */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: avatarColors[colorIdx],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 32,
              color: "#fff",
              margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            {getInitials(state.name)}
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 6px",
            }}
          >
            {state.name}
          </h1>
          {state.designation && (
            <span
              style={{
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(167,139,250,0.3)",
                color: "#a78bfa",
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {state.designation}
            </span>
          )}
        </div>

        {/* Info Rows */}
        <div>
          <InfoRow icon="✉️" label="Email" value={state.email} />
          <InfoRow icon="📱" label="Mobile" value={state.mobile} />
          <InfoRow icon="🏢" label="Company" value={state.companyName} />
          <InfoRow icon="🏷️" label="Department" value={state.department} />
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button
            onClick={() => navigate("/edit-emp", { state })}
            className="btn-primary"
            style={{ flex: 1, padding: "13px", fontSize: 15 }}
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={() => navigate("/list")}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              borderRadius: 12,
              padding: "13px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            📋 All Employees
          </button>
        </div>
      </div>
    </div>
  );
}

export default Employee;