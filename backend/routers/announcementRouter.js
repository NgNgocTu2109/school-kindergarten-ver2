import express from "express";
import { getAllAnnouncements, createAnnouncement, deleteAnnouncement } from "../controllers/announcementController.js";

const router = express.Router();

router.get('/getall', getAllAnnouncements);
router.post('/', createAnnouncement);
router.delete('/:id', deleteAnnouncement); // 👈 Route xoá thông báo theo id


export default router;
