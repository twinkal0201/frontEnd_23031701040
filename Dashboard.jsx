import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  console.log("==============", user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

<<<<<<< HEAD
  const roleDetails = {
    admin: {
      title: "Admin Dashboard",
      message: "Manage the clinic, users, and oversee all operations.",
      links: [
        { path: "/admin/users", label: "Manage Users", color: "#4B0082" },
        { path: "/clinic", label: "Manage Clinic", color: "#000080" }
      ]
    },
    doctor: {
      title: "Doctor's Portal",
      message: "View your queue and manage patient prescriptions and reports.",
      links: [
        { path: "/queue", label: "Today's Queue", color: "#008080" },
        { path: "/priscription", label: "Add Prescription", color: "#2E8B57" },
        { path: "/report", label: "Add Report", color: "#D2691E" }
      ]
    },
    receptionist: {
      title: "Receptionist Desk",
      message: "Manage daily appointments and update the live patient queue.",
      links: [
        { path: "/queue", label: "Manage Queue", color: "#008B8B" }
      ]
    },
    patient: {
      title: "Patient Dashboard",
      message: "Book appointments, view your prescriptions, and check your medical reports.",
      links: [
        { path: "/book-appointment", label: "Book Appointment", color: "#4682B4" },
        { path: "/appointment", label: "My Appointments", color: "#5F9EA0" },
        { path: "/myprescriptions", label: "My Prescriptions", color: "#8B4513" },
        { path: "/myreports", label: "My Reports", color: "#9932CC" }
      ]
    }
  };

  const currentRole = roleDetails[user?.role] || {
    title: "Welcome",
    message: "Here is a summary of your data.",
    links: []
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>{currentRole.title}</h1>
        <p style={{ margin: 0, fontSize: "1.1em", color: "#666" }}>
          Hello, <strong>{user?.name || "Guest"}</strong>! {currentRole.message}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {currentRole.links.map((link, index) => (
          <div
            key={index}
            onClick={() => navigate(link.path)}
            style={{
              backgroundColor: "#fff",
              padding: "20px 25px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              borderLeft: `5px solid ${link.color || "#007bff"}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div>
              <h3 style={{ margin: 0, color: "#333" }}>{link.label}</h3>
              <p style={{ margin: "6px 0 0 0", fontSize: "0.85em", color: "#888", fontWeight: "500" }}>ACCESS MODULE →</p>
            </div>
          </div>
        ))}
=======
  return (
    <div>
      {/* <h2>{user.name}</h2> */}
      <p>Welcome back! Here is a summary of your data.</p>

      <div className="dashboard-grid">
        heloo
>>>>>>> c3ccde0c2c7243fbc8c62ee56f5490382ea3f223
      </div>
    </div>
  );
};

export default Dashboard;