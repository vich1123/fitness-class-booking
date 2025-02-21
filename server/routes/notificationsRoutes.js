import express from "express";
import { getNotifications, createNotification, deleteNotification } from "../controllers/notificationController.js";

const router = express.Router();

// Get notifications for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId || userId === "undefined") {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const notifications = await getNotifications(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new notification
router.post("/", createNotification);

// Delete a notification
router.delete("/:id", deleteNotification);

export default router;
