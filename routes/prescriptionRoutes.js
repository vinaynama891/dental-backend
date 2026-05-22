import express from "express";
import {
  createPrescription,
  getPrescriptions,
  deletePrescription,
} from "../controllers/prescriptionController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(requireRole("receptionist"));

router.post("/", createPrescription);
router.get("/", getPrescriptions);
router.delete("/:id", deletePrescription);

export default router;
