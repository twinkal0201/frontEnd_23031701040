import React, { useEffect, useState } from "react";
import { getAllClinic } from "../services/AdminServices";
function Clinic() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClinics = async () => {
    const res = await getAllClinic();
    console.log("API:", res);

    if (!res.error) {
      // ✅ handle both object & array
      setClinics(Array.isArray(res) ? res : [res]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Clinics</h2>
        <p style={{ color: "#666", fontSize: "14px" }}>
          List of all registered clinics
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            {/* Table Head */}
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Code</th>
                <th style={thStyle}>Users</th>
                <th style={thStyle}>Appointments</th>
                <th style={thStyle}>Queue</th>
                <th style={thStyle}>Created</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {clinics.length > 0 ? (
                clinics.map((clinic, index) => (
                  <tr
                    key={clinic.id}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "#fff" : "#f9f9f9",
                    }}
                  >
                    <td style={tdStyle}>{clinic.name}</td>
                    <td style={tdStyle}>{clinic.code}</td>
                    <td style={tdStyle}>{clinic.userCount}</td>
                    <td style={tdStyle}>{clinic.appointmentCount}</td>
                    <td style={tdStyle}>{clinic.queueCount}</td>
                    <td style={tdStyle}>
                      {clinic.createdAt
                        ? new Date(clinic.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#999",
                    }}
                  >
                    No clinics found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Styles
const thStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
};

export default Clinic;