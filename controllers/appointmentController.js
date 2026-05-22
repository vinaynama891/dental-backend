import Appointment from "../models/Appointment.js";

// POST /api/appointments — patient books appointment
export async function createAppointment(req, res) {
  try {
    const { name, email, phone, date, time, treatment, message } = req.body;
    if (!name || !email || !date || !time || !treatment)
      return res.status(400).json({ message: "Name, email, date, time and treatment are required" });

    const appt = await Appointment.create({
      patientId: req.user._id,
      name,
      email,
      phone: phone || "",
      date,
      time,
      treatment,
      message: message || "",
    });
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/appointments — doctor sees all; patient sees own
export async function getAppointments(req, res) {
  try {
    let appts;
    if (req.user.role === "doctor" || req.user.role === "receptionist") {
      appts = await Appointment.find().sort({ createdAt: -1 });
    } else {
      appts = await Appointment.find({ patientId: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PATCH /api/appointments/:id/status — doctor: approve/reject/complete/reschedule
export async function updateStatus(req, res) {
  try {
    const { status, doctorNote, rescheduledDate, rescheduledTime } = req.body;
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    appt.status = status;
    if (doctorNote !== undefined) appt.doctorNote = doctorNote;
    if (status === "Rescheduled") {
      if (!rescheduledDate || !rescheduledTime)
        return res.status(400).json({ message: "Rescheduled date and time are required" });
      appt.rescheduledDate = rescheduledDate;
      appt.rescheduledTime = rescheduledTime;
    }
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /api/appointments/:id — patient cancels pending appointment
export async function deleteAppointment(req, res) {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Not found" });
    if (
      req.user.role === "patient" &&
      appt.patientId.toString() !== req.user._id.toString()
    )
      return res.status(403).json({ message: "Not your appointment" });
    await appt.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
