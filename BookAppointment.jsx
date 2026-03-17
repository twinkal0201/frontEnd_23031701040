<<<<<<< HEAD
import React, { useState } from "react";
import { bookAppointments } from "../services/patientServices";
function BookAppointment() {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    timeSlot: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await bookAppointments(formData);

    if (res.error) {
      setMessage("❌ " + res.error);
    } else {
      setMessage("✅ Appointment booked successfully!");
      setFormData({ appointmentDate: "", timeSlot: "" });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Book Appointment</h2>

      {message && (
        <div style={{ marginBottom: "10px", color: "#333" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Date */}
        <div style={{ marginBottom: "15px" }}>
          <label>Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Time Slot */}
        <div style={{ marginBottom: "15px" }}>
          <label>Time Slot</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Time</option>
            <option value="10:00-10:15">10:00 - 10:15</option>
            <option value="10:15-10:30">10:15 - 10:30</option>
            <option value="10:30-10:45">10:30 - 10:45</option>
            <option value="10:45-11:00">10:45 - 11:00</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

=======
import React, { useState } from "react";
import { bookAppointments } from "../services/patientServices";
function BookAppointment() {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    timeSlot: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await bookAppointments(formData);

    if (res.error) {
      setMessage("❌ " + res.error);
    } else {
      setMessage("✅ Appointment booked successfully!");
      setFormData({ appointmentDate: "", timeSlot: "" });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Book Appointment</h2>

      {message && (
        <div style={{ marginBottom: "10px", color: "#333" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Date */}
        <div style={{ marginBottom: "15px" }}>
          <label>Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Time Slot */}
        <div style={{ marginBottom: "15px" }}>
          <label>Time Slot</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Time</option>
            <option value="10:00-10:15">10:00 - 10:15</option>
            <option value="10:15-10:30">10:15 - 10:30</option>
            <option value="10:30-10:45">10:30 - 10:45</option>
            <option value="10:45-11:00">10:45 - 11:00</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

>>>>>>> c3ccde0c2c7243fbc8c62ee56f5490382ea3f223
export default BookAppointment;