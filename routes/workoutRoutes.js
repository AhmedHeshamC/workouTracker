const express = require('express');
const {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all workout routes
router.use(protect);

router.route('/')
  .post(createWorkout)
  .get(getAllWorkouts);

router.route('/:workoutId')
  .get(getWorkoutById)
  .put(updateWorkout)
  .delete(deleteWorkout);

module.exports = router;
