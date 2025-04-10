import express from "express";
import { getAllExtracurricularActivities, createExtracurricularActivity } from "../controllers/extracurricularController.js";

const router = express.Router();

router.get('/getall', getAllExtracurricularActivities);
router.post('/', createExtracurricularActivity);

export default router;