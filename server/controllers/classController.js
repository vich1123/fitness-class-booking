import Class from '../models/Class.js';
import mongoose from 'mongoose';

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer', 'name specialization');
    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: 'No classes available' });
    }
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch classes', error: error.message });
  }
};

// Get class by ID
export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Class ID" });
    }

    const classDetails = await Class.findById(id).populate("trainer");
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(classDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching class details" });
  }
};

// Create a new class
export const createClass = async (req, res) => {
  try {
    const { name, trainer, schedule, capacity, price, category } = req.body;
    if (!name || !trainer || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newClass = new Class({ name, trainer, schedule, capacity, price, category });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create class', error: error.message });
  }
};

// Update class details
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid class ID format' });
    }

    const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update class', error: error.message });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid class ID format' });
    }

    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete class', error: error.message });
  }
};

// Fetch personalized class recommendations
export const getRecommendedClasses = async (req, res) => {
  try {
    const { interests } = req.body;
    if (!interests || interests.length === 0) {
      return res.status(400).json({ message: "User interests are required" });
    }

    const recommendedClasses = await Class.find({ category: { $in: interests } });

    res.status(200).json(recommendedClasses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations", error: error.message });
  }
};
