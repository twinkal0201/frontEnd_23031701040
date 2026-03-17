import React, { useEffect, useState } from "react";
import { getmyAppointments } from "../services/patientServices";
import { useNavigate } from "react-router-dom";

function Patient() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    const res = await getmyAppointments();
    console.log("Appointments:", res);

    if (!res.error) {
      setAppointments(Array.isArray(res) ? res : [res]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Appointments</h2>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Manage all appointments
          </p>
        </div>

        <button
          onClick={() => navigate("/book-appointment")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add Appointment
        </button>
      </div>

      {/* Table */}
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
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <tr
                    key={appt.id || index}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "#fff" : "#f9f9f9",
                    }}
                  >
                    <td style={tdStyle}>
                      {appt.appointmentDate
                        ? new Date(appt.appointmentDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td style={tdStyle}>{appt.timeSlot}</td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "10px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      >
                        Booked
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                    No appointments found
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
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

export default Patient;