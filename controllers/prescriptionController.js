import Prescription from "../models/Prescription.js";

// POST /api/prescriptions
export async function createPrescription(req, res) {
  try {
    const { patientName, age, gender, phone, date, diagnosis, advice, nextVisit, doctor } = req.body;
    if (!patientName || !date)
      return res.status(400).json({ message: "Patient name and date are required" });

    const rx = await Prescription.create({
      patientName,
      age: age || "",
      gender: gender || "Male",
      phone: phone || "",
      date,
      diagnosis: diagnosis || "",
      advice: advice || "",
      nextVisit: nextVisit || "",
      doctor: doctor || "Dr. Admin",
      createdBy: req.user._id,
    });
    res.status(201).json(rx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/prescriptions
export async function getPrescriptions(req, res) {
  try {
    const list = await Prescription.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /api/prescriptions/:id
export async function deletePrescription(req, res) {
  try {
    const rx = await Prescription.findByIdAndDelete(req.params.id);
    if (!rx) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
