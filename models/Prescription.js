import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    rxNo: { type: String, unique: true },
    patientName: { type: String, required: true },
    age: { type: String, default: "" },
    gender: { type: String, default: "Male" },
    phone: { type: String, default: "" },
    date: { type: String, required: true },
    diagnosis: { type: String, default: "" },
    advice: { type: String, default: "" },
    nextVisit: { type: String, default: "" },
    doctor: { type: String, default: "Dr. Admin" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Auto-generate rxNo before save
prescriptionSchema.pre("save", async function (next) {
  if (!this.rxNo) {
    const count = await mongoose.model("Prescription").countDocuments();
    this.rxNo = `RX-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model("Prescription", prescriptionSchema);
