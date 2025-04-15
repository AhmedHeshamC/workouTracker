const express = require('express');
const { getProgressReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all report routes
router.use(protect);

router.get('/progress', getProgressReport);

module.exports = router;
