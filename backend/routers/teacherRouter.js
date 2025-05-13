import express from "express";
import { getAllTeachers, createTeacher, deleteTeacher, updateTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.get('/', getAllTeachers);         // GET /api/v1/teachers
router.post('/', createTeacher);         // POST /api/v1/teachers
router.delete('/:id', deleteTeacher);
router.put('/:id', updateTeacher);


export default router;
