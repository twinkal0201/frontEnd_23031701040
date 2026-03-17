import React, { useEffect, useState } from "react";
import { getMyReports } from "../services/patientServices";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMyReports();
      if (res.error) {
        setError(res.error);
      } else {
        setReports(res);
      }
    } catch (err) {
      setError("Failed to fetch reports");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>My Reports</h2>

      {loading && <p>Loading...</p>}
      {error && <div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "4px", marginBottom: "15px" }}>{error}</div>}
      {!loading && reports.length === 0 && <p>No reports found.</p>}

      {!loading && reports.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {reports.map((report) => (
            <div key={report.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", backgroundColor: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <h3 style={{ margin: 0 }}>Report ID: {report.id}</h3>
                <span style={{ color: "#666", fontSize: "0.9em" }}>
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div>
                  <strong style={{ color: "#555" }}>Diagnosis:</strong> 
                  <p style={{ margin: "5px 0" }}>{report.diagnosis || "-"}</p>
                </div>
                <div>
                  <strong style={{ color: "#555" }}>Tests Recommended:</strong> 
                  <p style={{ margin: "5px 0" }}>{report.testRecommended || "-"}</p>
                </div>
              </div>
              
              <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                <strong style={{ color: "#555" }}>Doctor's Remarks:</strong> 
                <p style={{ margin: "5px 0" }}>{report.remarks || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReports;
