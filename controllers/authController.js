const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Assuming db connection pool is exported

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }

  try {
    // TODO: Check if user already exists (by email or username)
    // const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
    // if (existingUser.length > 0) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // TODO: Insert user into database
    // const [result] = await pool.query(
    //   'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    //   [username, email, passwordHash]
    // );
    // const userId = result.insertId; // Or however you get the ID

    // Respond with user info (excluding password)
    // res.status(201).json({ userId: userId, username, email });
    res.status(201).json({ message: 'Signup successful (DB logic pending)', username, email }); // Placeholder response

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // TODO: Find user by email
    // const [users] = await pool.query('SELECT id, password_hash FROM users WHERE email = ?', [email]);
    // if (users.length === 0) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }
    // const user = users[0];

    // TODO: Compare password
    // const isMatch = await bcrypt.compare(password, user.password_hash);
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // TODO: Generate JWT
    // const payload = { id: user.id }; // Add other relevant info if needed
    // const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Or your preferred expiry

    // res.status(200).json({ accessToken });
    res.status(200).json({ message: 'Login successful (DB/JWT logic pending)', accessToken: 'dummy_token' }); // Placeholder response

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  signup,
  login,
};
