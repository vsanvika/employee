import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

const inputStyle = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 12,
  color: "#fff",
  padding: "13px 16px",
  width: "100%",
  marginBottom: 14,
  fontSize: 15,
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
  fontFamily: "Inter, sans-serif",
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "rgba(255,255,255,0.5)",
  marginBottom: 6,
  letterSpacing: 0.8,
  textTransform: "uppercase",
};

function FieldGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(139,92,246,0.7)";
    e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.2)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,0.15)";
    e.target.style.boxShadow = "none";
  };

  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);
      setError("");
      let res = await fetch(`${API_URL}/emp-api/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });
      if (res.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/list"), 1200);
      } else {
        let errorRes = await res.json();
        throw new Error(errorRes.reason || "Something went wrong");
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? `Cannot reach backend at ${API_URL}. Make sure the server is running and the API URL is correct.`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 8px",
          }}
        >
          Add New Employee
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, margin: 0 }}>
          Fill in the details below to register a new team member.
        </p>
      </div>

      {/* Success Banner */}
      {success && (
        <div
          style={{
            background: "rgba(16,185,129,0.15)",
            border: "1px solid rgba(16,185,129,0.4)",
            borderRadius: 12,
            padding: "14px 20px",
            marginBottom: 20,
            color: "#6ee7b7",
            fontWeight: 600,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          ✅ Employee created! Redirecting...
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.4)",
            borderRadius: 12,
            padding: "14px 20px",
            marginBottom: 20,
            color: "#fca5a5",
            fontWeight: 600,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Form Card */}
      <div className="glass-card" style={{ padding: "36px 40px" }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FieldGroup label="Full Name">
            <input
              type="text"
              {...register("name", { required: true })}
              style={{ ...inputStyle, borderColor: errors.name ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.15)" }}
              onFocus={onFocus} onBlur={onBlur}
            />
          </FieldGroup>

          <FieldGroup label="Email Address">
            <input
              type="email"
              {...register("email", { required: true })}
              style={{ ...inputStyle, borderColor: errors.email ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.15)" }}
              onFocus={onFocus} onBlur={onBlur}
            />
          </FieldGroup>

          <FieldGroup label="Mobile Number">
            <input
              type="number"
              {...register("mobile", { required: true })}
              style={{ ...inputStyle, borderColor: errors.mobile ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.15)" }}
              onFocus={onFocus} onBlur={onBlur}
            />
          </FieldGroup>

          <FieldGroup label="Designation">
            <input
              type="text"
              {...register("designation", { required: true })}
              style={{ ...inputStyle, borderColor: errors.designation ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.15)" }}
              onFocus={onFocus} onBlur={onBlur}
            />
          </FieldGroup>

          <FieldGroup label="Company Name">
            <input
              type="text"
              {...register("companyName", { required: true })}
              style={{ ...inputStyle, borderColor: errors.companyName ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.15)" }}
              onFocus={onFocus} onBlur={onBlur}
            />
          </FieldGroup>


          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              marginTop: 8,
              padding: "15px",
              fontSize: 16,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Creating..." : "🚀 Create Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmp;