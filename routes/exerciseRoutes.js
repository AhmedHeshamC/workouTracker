const express = require('express');
const { getAllExercises, getExerciseById } = require('../controllers/exerciseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all exercise routes
router.use(protect);

router.get('/', getAllExercises);
router.get('/:exerciseId', getExerciseById);

module.exports = router;
