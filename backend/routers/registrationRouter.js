import express from "express";
import {
  createRegistration,
  getRegistrationsByChild,
  deleteRegistration,
  updateRegistration
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getRegistrationsByChild);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

export default router;
