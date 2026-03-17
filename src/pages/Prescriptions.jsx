// src/pages/AddPrescription.jsx
import React, { useState } from "react";
import { createPrescription } from "../services/DoctorServices";

function AddPrescription({ defaultAppointmentId = "" }) {
  const [appointmentId, setAppointmentId] = useState(defaultAppointmentId);
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle medicine field change
  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  // Add new medicine row
  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  // Remove medicine row
  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

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
      const res = await createPrescription({ medicines, notes }, appointmentId);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess("Prescription added successfully!");
        // Reset form
        setMedicines([{ name: "", dosage: "", duration: "" }]);
        setNotes("");
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Add Prescription</h2>

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

        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Medicines</label>
        {medicines.map((med, index) => (
          <div key={index} style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
            <input
              type="text"
              placeholder="Medicine Name"
              value={med.name}
              onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
              required
              style={{ width: "100%", marginBottom: "5px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 500mg)"
              value={med.dosage}
              onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
              required
              style={{ width: "48%", marginRight: "4%", marginBottom: "5px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Duration (e.g., 5 days)"
              value={med.duration}
              onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
              required
              style={{ width: "48%", marginBottom: "5px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            {medicines.length > 1 && (
              <button type="button" onClick={() => removeMedicine(index)} style={{ backgroundColor: "#dc3545", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addMedicine} style={{ marginBottom: "15px", backgroundColor: "#28a745", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          + Add Medicine
        </button>

        <textarea
          placeholder="Notes / Instructions"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: "100%", height: "100px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "15px" }}
        />

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Saving..." : "Save Prescription"}
        </button>
      </form>
    </div>
  );
}

export default AddPrescription;