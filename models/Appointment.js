import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    treatment: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed", "Rescheduled"],
      default: "Pending",
    },
    rescheduledDate: { type: String, default: "" },
    rescheduledTime: { type: String, default: "" },
    doctorNote: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
