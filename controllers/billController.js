import Bill from "../models/Bill.js";

// POST /api/bills
export async function createBill(req, res) {
  try {
    const { patientName, phone, date, items, discount, taxPct, paymentMode, notes } = req.body;
    if (!patientName || !date || !items?.length)
      return res.status(400).json({ message: "Patient name, date and items are required" });

    const bill = await Bill.create({
      patientName,
      phone: phone || "",
      date,
      items,
      discount: discount || 0,
      taxPct: taxPct || 0,
      paymentMode: paymentMode || "Cash",
      notes: notes || "",
      createdBy: req.user._id,
    });
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/bills
export async function getBills(req, res) {
  try {
    const list = await Bill.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE /api/bills/:id
export async function deleteBill(req, res) {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
