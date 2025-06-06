import express from "express";
import {
  getStatisticsOverview,
 
} from "../controllers/statisticsController.js";

const router = express.Router();

// Tổng hợp dashboard thống kê
router.get("/overview", getStatisticsOverview);



export default router;
