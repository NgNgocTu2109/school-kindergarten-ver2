import express from "express";
import { getAllAssignments, createAssignment } from "../controllers/assignmentController.js";

const router = express.Router();

router.get('/getall', getAllAssignments);
router.post('/', createAssignment);


export default router;
