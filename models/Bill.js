import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema({
  description: String,
  qty: { type: Number, default: 1 },
  rate: { type: Number, default: 0 },
});

const billSchema = new mongoose.Schema(
  {
    invoiceNo: { type: String, unique: true },
    patientName: { type: String, required: true },
    phone: { type: String, default: "" },
    date: { type: String, required: true },
    items: [billItemSchema],
    discount: { type: Number, default: 0 },
    taxPct: { type: Number, default: 0 },
    paymentMode: { type: String, default: "Cash" },
    notes: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Auto-generate invoiceNo before save
billSchema.pre("save", async function (next) {
  if (!this.invoiceNo) {
    const count = await mongoose.model("Bill").countDocuments();
    this.invoiceNo = `INV-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model("Bill", billSchema);
