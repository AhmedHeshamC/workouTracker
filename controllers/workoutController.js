const pool = require('../config/db');

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
  const userId = req.user.id; // From auth middleware
  const { name, description, scheduledAt, exercises } = req.body;

  // Basic validation
  if (!name || !exercises || !Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({ message: 'Missing required fields (name, exercises array)' });
  }

  // TODO: Add validation for exercise structure within the array

  const connection = await pool.getConnection(); // Use transaction
  try {
    await connection.beginTransaction();

    // TODO: Insert into Workouts table
    // const [workoutResult] = await connection.query(
    //   'INSERT INTO workouts (user_id, name, description, scheduled_at) VALUES (?, ?, ?, ?)',
    //   [userId, name, description, scheduledAt || null]
    // );
    // const workoutId = workoutResult.insertId;

    // TODO: Insert into WorkoutExercises table for each exercise
    // for (const ex of exercises) {
    //   await connection.query(
    //     'INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, weight, notes) VALUES (?, ?, ?, ?, ?, ?)',
    //     [workoutId, ex.exerciseId, ex.sets, ex.reps, ex.weight || null, ex.notes || null]
    //   );
    // }

    await connection.commit();

    // TODO: Fetch the created workout with its exercises to return
    // const createdWorkout = await fetchWorkoutDetails(workoutId, connection); // Helper function needed
    // res.status(201).json(createdWorkout);

    res.status(201).json({ message: 'Workout created (DB logic pending)', workoutData: req.body }); // Placeholder

  } catch (error) {
    await connection.rollback();
    console.error('Create workout error:', error);
    // TODO: Handle specific errors like invalid exerciseId (FK constraint)
    res.status(500).json({ message: 'Server error creating workout' });
  } finally {
    connection.release();
  }
};

// @desc    Get all workouts for the logged-in user
// @route   GET /api/workouts
// @access  Private
const getAllWorkouts = async (req, res) => {
  const userId = req.user.id;
  const { sortBy, order, startDate, endDate, status } = req.query; // Add filtering/sorting logic

  try {
    // TODO: Implement DB query with filtering/sorting for the user
    // const [workouts] = await pool.query(
    //   'SELECT id, name, scheduled_at, created_at FROM workouts WHERE user_id = ? ORDER BY created_at DESC', // Example query
    //   [userId]
    // );
    // res.status(200).json(workouts);

    res.status(200).json({ message: `Get all workouts for user ${userId} (DB logic pending)`, filters: req.query }); // Placeholder
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ message: 'Server error fetching workouts' });
  }
};

// @desc    Get a specific workout by ID
// @route   GET /api/workouts/:workoutId
// @access  Private
const getWorkoutById = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;

  try {
    // TODO: Implement DB query to get workout and its exercises, ensuring it belongs to the user
    // const workoutDetails = await fetchWorkoutDetails(workoutId, pool, userId); // Helper function needed
    // if (!workoutDetails) {
    //   return res.status(404).json({ message: 'Workout not found or not authorized' });
    // }
    // res.status(200).json(workoutDetails);

    res.status(200).json({ message: `Get workout ${workoutId} for user ${userId} (DB logic pending)` }); // Placeholder
  } catch (error) {
    console.error('Get workout by ID error:', error);
    res.status(500).json({ message: 'Server error fetching workout details' });
  }
};

// @desc    Update a workout
// @route   PUT /api/workouts/:workoutId
// @access  Private
const updateWorkout = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;
  const { name, description, scheduledAt, comment, exercises } = req.body; // Note: comment isn't in schema yet

  // TODO: Add validation

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // TODO: Verify workout exists and belongs to user
    // const [existing] = await connection.query('SELECT id FROM workouts WHERE id = ? AND user_id = ?', [workoutId, userId]);
    // if (existing.length === 0) {
    //    await connection.rollback();
    //    return res.status(404).json({ message: 'Workout not found or not authorized' });
    // }

    // TODO: Update Workouts table (only provided fields)
    // Build update query dynamically based on provided fields (name, description, scheduledAt)

    // TODO: Handle Exercise Updates (complex logic: add new, update existing, remove old)
    // This might involve deleting existing WorkoutExercises for this workoutId and inserting the new set,
    // or more granular updates based on provided `id` in the exercise objects.

    await connection.commit();

    // TODO: Fetch the updated workout details
    // const updatedWorkout = await fetchWorkoutDetails(workoutId, connection);
    // res.status(200).json(updatedWorkout);

    res.status(200).json({ message: `Update workout ${workoutId} (DB logic pending)`, updateData: req.body }); // Placeholder

  } catch (error) {
    await connection.rollback();
    console.error('Update workout error:', error);
    res.status(500).json({ message: 'Server error updating workout' });
  } finally {
    connection.release();
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:workoutId
// @access  Private
const deleteWorkout = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // TODO: Verify workout exists and belongs to user (important!)
    // const [existing] = await connection.query('SELECT id FROM workouts WHERE id = ? AND user_id = ?', [workoutId, userId]);
    // if (existing.length === 0) {
    //    await connection.rollback();
    //    return res.status(404).json({ message: 'Workout not found or not authorized' });
    // }

    // TODO: Delete from WorkoutExercises first (due to FK constraints)
    // await connection.query('DELETE FROM workout_exercises WHERE workout_id = ?', [workoutId]);

    // TODO: Delete from Workouts
    // await connection.query('DELETE FROM workouts WHERE id = ?', [workoutId]);

    await connection.commit();
    res.status(204).send(); // No content on successful delete

  } catch (error) {
    await connection.rollback();
    console.error('Delete workout error:', error);
    res.status(500).json({ message: 'Server error deleting workout' });
  } finally {
    connection.release();
  }
};

// --- Helper function placeholder ---
// async function fetchWorkoutDetails(workoutId, dbConnection, userId = null) {
//   // Query to get workout details and join with workout_exercises and exercises tables
//   // If userId is provided, add 'AND w.user_id = ?' to the WHERE clause
//   // Structure the result according to the API spec
//   return null; // Placeholder
// }


module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};
