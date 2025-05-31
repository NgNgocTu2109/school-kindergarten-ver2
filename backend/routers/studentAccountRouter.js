// routes/studentAccountRouter.js
import express from "express";
import { studentLogin, getAllStudentAccounts } from "../controllers/studentAccountController.js";

const router = express.Router();

// [POST] /api/v1/studentaccount/login
router.post("/login", studentLogin);
router.get("/all", getAllStudentAccounts); // [GET] /api/v1/studentaccount/all

export default router;
