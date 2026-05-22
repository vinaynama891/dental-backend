import express from "express";
import { createBill, getBills, deleteBill } from "../controllers/billController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.post("/", requireRole("receptionist"), createBill);
router.get("/", requireRole("receptionist", "doctor"), getBills);
router.delete("/:id", requireRole("receptionist"), deleteBill);

export default router;
