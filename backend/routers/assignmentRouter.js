import express from "express";
import { getAllAssignments, createAssignment, deleteAssignment } from "../controllers/assignmentController.js";

const router = express.Router();

router.get('/getall', getAllAssignments);
router.post('/', createAssignment);
router.delete('/:id', deleteAssignment);


export default router;
