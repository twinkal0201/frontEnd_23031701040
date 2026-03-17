// src/pages/MyPrescriptions.jsx
import React, { useEffect, useState } from "react";
import { getMyprescriptions } from "../services/patientServices";

function MyPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPrescriptions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMyPrescriptions(); // fetch API
      if (res.error) {
        setError(res.error);
      } else {
        setPrescriptions(res); // assume array of prescriptions
      }
    } catch (err) {
      setError("Failed to fetch prescriptions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>My Prescriptions</h2>

      {loading && <p>Loading...</p>}
      {error && <div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "4px" }}>{error}</div>}
      {!loading && prescriptions.length === 0 && <p>No prescriptions found.</p>}

      {!loading && prescriptions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {prescriptions.map((pres) => (
            <div key={pres.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px" }}>
              <h3>Prescription ID: {pres.id}</h3>
              <p><strong>Notes:</strong> {pres.notes || "-"}</p>

              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th style={thStyle}>Medicine</th>
                    <th style={thStyle}>Dosage</th>
                    <th style={thStyle}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {pres.medicines.map((med, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                      <td style={tdStyle}>{med.name}</td>
                      <td style={tdStyle}>{med.dosage}</td>
                      <td style={tdStyle}>{med.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Table Styles
const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #ddd",
};
const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default MyPrescriptions;