<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { getQueue, updateQueueStatus } from "../services/ReceptionistServices";
import { getDoctorQueue } from "../services/DoctorServices";
import { useAuth } from "../context/AuthProvider";

function Queue() {
  const { user } = useAuth();
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(""); // selected date
  const [updatingId, setUpdatingId] = useState(null);

  // Convert date to YYYY-MM-DD string
  const formatDate = (d) => new Date(d).toISOString().split("T")[0];

  // Fetch queue for selected date or doctor queue
  const fetchQueue = async () => {
    setLoading(true);
    let res;
    if (user?.role === "doctor") {
      res = await getDoctorQueue();
    } else {
      if (!date) {
        setLoading(false);
        return;
      }
      res = await getQueue(date);
    }
    if (!res.error) {
      setQueue(res);
    } else {
      setQueue([]);
      console.error(res.error);
    }
    setLoading(false);
  };

  // Auto-load today's queue on component mount
  useEffect(() => {
    const today = formatDate(new Date());
    setDate(today);
  }, []);

  // Fetch queue whenever date changes
  useEffect(() => {
    if (date) fetchQueue();
  }, [date]);

  // Handle status update for receptionist
  const handleStatusUpdate = async (queueId, status) => {
    setUpdatingId(queueId);

    // Map UI statuses to backend expected statuses
    const statusMap = {
      "called": "in-progress",
      "completed": "done",
      "cancelled": "skipped",
      "waiting": "waiting"
    };

    const backendStatus = statusMap[status] || status;

    const res = await updateQueueStatus(queueId, { status: backendStatus });
    if (!res.error) {
      setQueue((prev) =>
        prev.map((q) => (q.id === queueId ? { ...q, status } : q))
      );
    } else {
      alert("Error updating queue");
    }
    setUpdatingId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Queue Management</h2>

      {/* Date Filter - hide for doctor since it gets today by default */}
      {user?.role !== "doctor" && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button
            onClick={fetchQueue}
            style={{
              marginLeft: "10px",
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Fetch Queue
          </button>
        </div>
      )}

      {/* Queue Table */}
      {loading ? (
        <p>Loading...</p>
      ) : queue.length === 0 ? (
        <p>No queue for selected date</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "650px",
            }}
          >
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th style={thStyle}>Token</th>
                <th style={thStyle}>Patient Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Appointment Time</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {queue.map((q, index) => (
                <tr
                  key={q.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  }}
                >
                  <td style={tdStyle}>{q.tokenNumber}</td>
                  <td style={tdStyle}>{q.appointment?.patient?.name || "-"}</td>
                  <td style={tdStyle}>{q.appointment?.patient?.phone || "-"}</td>
                  <td style={tdStyle}>{q.appointment?.timeSlot || "-"}</td>
                  <td style={tdStyle}>{q.status}</td>
                  <td style={tdStyle}>
                    <select
                      value={q.status}
                      onChange={(e) => handleStatusUpdate(q.id, e.target.value)}
                      disabled={updatingId === q.id}
                      style={{ padding: "4px", borderRadius: "4px" }}
                    >
                      <option value="waiting">Waiting</option>
                      <option value="called">Called</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
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

=======
import React, { useEffect, useState } from "react";
import { getQueueByDate } from "../services/ReceptionistServices";
function Queue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(""); // selected date
  const [updatingId, setUpdatingId] = useState(null);

  // Convert date to YYYY-MM-DD string
  const formatDate = (d) => new Date(d).toISOString().split("T")[0];

  // Fetch queue for selected date
  const fetchQueue = async () => {
    if (!date) return;
    setLoading(true);
    const res = await getQueueByDate(date);
    if (!res.error) {
      setQueue(res);
    } else {
      setQueue([]);
      console.error(res.error);
    }
    setLoading(false);
  };

  // Auto-load today's queue on component mount
  useEffect(() => {
    const today = formatDate(new Date());
    setDate(today);
  }, []);

  // Fetch queue whenever date changes
  useEffect(() => {
    if (date) fetchQueue();
  }, [date]);

  // Handle status update for receptionist
//   const handleStatusUpdate = async (queueId, status) => {
//     setUpdatingId(queueId);
//     const res = await updateQueueStatus(queueId, { status });
//     if (!res.error) {
//       setQueue((prev) =>
//         prev.map((q) => (q.id === queueId ? { ...q, status } : q))
//       );
//     } else {
//       alert("Error updating queue");
//     }
//     setUpdatingId(null);
//   };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Queue Management</h2>

      {/* Date Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={fetchQueue}
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Fetch Queue
        </button>
      </div>

      {/* Queue Table */}
      {loading ? (
        <p>Loading...</p>
      ) : queue.length === 0 ? (
        <p>No queue for selected date</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "650px",
            }}
          >
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th style={thStyle}>Token</th>
                <th style={thStyle}>Patient Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Appointment Time</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {queue.map((q, index) => (
                <tr
                  key={q.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  }}
                >
                  <td style={tdStyle}>{q.tokenNumber}</td>
                  <td style={tdStyle}>{q.appointment?.patient?.name || "-"}</td>
                  <td style={tdStyle}>{q.appointment?.patient?.phone || "-"}</td>
                  <td style={tdStyle}>{q.appointment?.timeSlot || "-"}</td>
                  <td style={tdStyle}>{q.status}</td>
                  <td style={tdStyle}>
                    <select
                      value={q.status}
                    //   onChange={(e) => handleStatusUpdate(q.id, e.target.value)}
                      disabled={updatingId === q.id}
                      style={{ padding: "4px", borderRadius: "4px" }}
                    >
                      <option value="waiting">Waiting</option>
                      <option value="called">Called</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
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

>>>>>>> c3ccde0c2c7243fbc8c62ee56f5490382ea3f223
export default Queue;