import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  cancelBooking,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/user/:userId", getBookingsByUser);
router.delete("/:id", cancelBooking);
router.put("/:id", updateBookingStatus);

export default router;
