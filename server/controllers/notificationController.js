import Notification from "../models/Notification.js";
import mongoose from "mongoose";

// Get all notifications for a user
export const getNotifications = async (userId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID format");
      }
  
      const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
      return notifications;
    } catch (error) {
      throw new Error(error.message);
    }
  };

// Create a new notification
export const createNotification = async (req, res) => {
    try {
      const { user, message, type } = req.body;
  
      if (!user || !message || !type) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
      const notification = new Notification({ user, message, type });
      await notification.save();
  
      res.status(201).json(notification);
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification", error: error.message });
    }
  };

// Delete a notification by ID
export const deleteNotification = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid notification ID format" });
      }
  
      const deletedNotification = await Notification.findByIdAndDelete(id);
  
      if (!deletedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
  
      res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification", error: error.message });
    }
  };
