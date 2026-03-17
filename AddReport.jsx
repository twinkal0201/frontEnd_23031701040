import React, { useState } from "react";
import { createReport } from "../services/DoctorServices";

function AddReport({ defaultAppointmentId = "" }) {
  const [appointmentId, setAppointmentId] = useState(defaultAppointmentId);
  const [diagnosis, setDiagnosis] = useState("");
  const [testRecommended, setTestRecommended] = useState("");
  const [remarks, setRemarks] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!appointmentId) {
        setError("Please enter an Appointment ID");
        setLoading(false);
        return;
      }
      const data = { diagnosis, testRecommended, remarks };
      const res = await createReport(data, appointmentId);
      
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess("Report added successfully!");
        setDiagnosis("");
        setTestRecommended("");
        setRemarks("");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Add Report</h2>

      {error && <div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "10px", marginBottom: "15px" }}>{error}</div>}
      {success && <div style={{ color: "#155724", backgroundColor: "#d4edda", padding: "10px", marginBottom: "15px" }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Appointment / Patient ID</label>
          <input
            type="text"
            placeholder="Enter Appointment/Patient ID"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Diagnosis</label>
          <input
            type="text"
            placeholder="e.g., Viral Fever"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Tests Recommended</label>
          <input
            type="text"
            placeholder="e.g., Blood Test"
            value={testRecommended}
            onChange={(e) => setTestRecommended(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Remarks</label>
          <textarea
            placeholder="e.g., Rest for 3 days"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            style={{ width: "100%", height: "80px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Saving..." : "Save Report"}
        </button>
      </form>
    </div>
  );
}

export default AddReport;
