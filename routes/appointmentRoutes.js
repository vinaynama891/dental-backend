import express from "express";
import {
  createAppointment,
  getAppointments,
  updateStatus,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", requireRole("patient"), createAppointment);
router.get("/", getAppointments);
router.patch("/:id/status", requireRole("doctor"), updateStatus);
router.delete("/:id", deleteAppointment);

export default router;
