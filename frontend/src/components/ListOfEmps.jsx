import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// Color palette for avatar backgrounds
const avatarColors = [
  "linear-gradient(135deg,#7c3aed,#4f46e5)",
  "linear-gradient(135deg,#0ea5e9,#06b6d4)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#ec4899,#db2777)",
  "linear-gradient(135deg,#ef4444,#dc2626)",
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const filtered = emps.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.designation?.toLowerCase().includes(search.toLowerCase()) ||
      e.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  const gotoEmployee = (empObj) => navigate("/employee", { state: empObj });
  const gotoEditEmployee = (empObj) => navigate("/edit-emp", { state: empObj });

  const deleteEmpById = async (id) => {
    setDeleteId(id);
    try {
      const res = await axios.delete(`${API_URL}/emp-api/employees/${id}`);
      if (res.status === 200) getEmps();
    } finally {
      setDeleteId(null);
    }
  };

  async function getEmps() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/emp-api/employees`);
      if (res.status === 200) setEmps(res.data.payload || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getEmps(); }, []);

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 6px",
          }}
        >
          👥 Employees
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", margin: 0, fontSize: 15 }}>
          {emps.length} team member{emps.length !== 1 ? "s" : ""} registered
        </p>
      </div>

      {/* Search + Add Row */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 28,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 16,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 12,
              color: "#fff",
              padding: "12px 16px 12px 42px",
              width: "100%",
              fontSize: 14,
              outline: "none",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </div>
        <button
          onClick={() => navigate("/create-emp")}
          className="btn-primary"
          style={{ padding: "12px 22px", fontSize: 14, whiteSpace: "nowrap" }}
        >
          ➕ Add Employee
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.4)" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
          <p style={{ fontSize: 16 }}>Loading employees...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div
          className="glass-card"
          style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.45)" }}
        >
          <div style={{ fontSize: 52, marginBottom: 16 }}>🙈</div>
          <p style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "#fff" }}>
            {search ? "No employees match your search" : "No employees yet"}
          </p>
          <p style={{ fontSize: 14, margin: "8px 0 0" }}>
            {search ? "Try a different keyword." : "Click 'Add Employee' to get started."}
          </p>
        </div>
      )}

      {/* Employee Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((empObj, idx) => (
          <div
            key={empObj._id}
            className="glass-card"
            style={{ padding: 24 }}
          >
            {/* Avatar + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: avatarColors[idx % avatarColors.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#fff",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                {getInitials(empObj.name)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#fff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {empObj.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.45)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {empObj.email}
                </div>
              </div>
            </div>

            {/* Info Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {empObj.designation && (
                <span
                  style={{
                    background: "rgba(124,58,237,0.2)",
                    border: "1px solid rgba(167,139,250,0.3)",
                    color: "#a78bfa",
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  💼 {empObj.designation}
                </span>
              )}
              {empObj.department && (
                <span
                  style={{
                    background: "rgba(14,165,233,0.15)",
                    border: "1px solid rgba(14,165,233,0.3)",
                    color: "#38bdf8",
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  🏢 {empObj.department}
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => gotoEmployee(empObj)}
                style={{
                  flex: 1,
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#6ee7b7",
                  borderRadius: 10,
                  padding: "8px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "rgba(16,185,129,0.28)")}
                onMouseLeave={(e) => (e.target.style.background = "rgba(16,185,129,0.15)")}
              >
                👁 View
              </button>
              <button
                onClick={() => gotoEditEmployee(empObj)}
                style={{
                  flex: 1,
                  background: "rgba(59,130,246,0.15)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  color: "#93c5fd",
                  borderRadius: 10,
                  padding: "8px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "rgba(59,130,246,0.28)")}
                onMouseLeave={(e) => (e.target.style.background = "rgba(59,130,246,0.15)")}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteEmpById(empObj._id)}
                disabled={deleteId === empObj._id}
                style={{
                  flex: 1,
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#fca5a5",
                  borderRadius: 10,
                  padding: "8px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: deleteId === empObj._id ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  opacity: deleteId === empObj._id ? 0.6 : 1,
                }}
                onMouseEnter={(e) => { if (deleteId !== empObj._id) e.target.style.background = "rgba(239,68,68,0.28)"; }}
                onMouseLeave={(e) => (e.target.style.background = "rgba(239,68,68,0.15)")}
              >
                {deleteId === empObj._id ? "⏳" : "🗑 Del"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmps;