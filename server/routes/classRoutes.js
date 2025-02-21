import express from "express";
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getRecommendedClasses,
} from "../controllers/classController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await getAllClasses(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await getClassById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    await createClass(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await updateClass(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteClass(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/recommendations/:id", async (req, res) => {
  try {
    await getRecommendedClasses(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
