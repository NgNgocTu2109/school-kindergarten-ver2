import express from "express";
import { getAllClasses, createClass, deleteClass, updateClassStatistics, getClassById } from "../controllers/classController.js";

const router = express.Router();

router.get('/getall', getAllClasses);
router.post('/', createClass);
router.delete('/:id', deleteClass); // Thêm dòng này
router.put('/:id/statistics', updateClassStatistics); // Thêm dòng này
router.get('/:id', getClassById); // ✅ thêm dòng này



export default router;
