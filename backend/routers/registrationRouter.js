import express from "express";
import {
  createRegistration,
  getRegistrationsByChild,
  deleteRegistration,
  updateRegistration,
  getRegisteredEventIdsByChild,
  cancelEventRegistration
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getRegistrationsByChild);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

router.get("/event", getRegisteredEventIdsByChild);         // GET danh sách eventId học sinh đã tham gia
router.post("/event/cancel", cancelEventRegistration);      // POST huỷ đăng ký event (theo eventId + childId)

export default router;
