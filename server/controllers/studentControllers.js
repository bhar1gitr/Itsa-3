const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const expirationTime = 7 * 24 * 60 * 60; // Set the token expiration time in seconds
    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: expirationTime, // Set the expiration time as needed
    });

  
    // const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: expirationTime });

    // Send the token as a response and store it as a cookie
    res.cookie('student_token', token, {
      maxAge: expirationTime * 1000, // Convert to milliseconds
    });

    // Respond with the token and user ID
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie('student_token');
    return res.status(200).json({ message: 'Success', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = { Login, Register,Logout };
