const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Class = require('../models/Class');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('classId'); // Populate class details
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const { user, classId, schedule } = req.body;

  try {
    const classObj = await Class.findById(classId);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const newBooking = new Booking({
      user,
      classId,
      schedule,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});

module.exports = router;
