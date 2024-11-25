const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Secrett'; 

module.exports = {
  register: async (req, res) => {
    const db = req.app.locals.db;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.collection('users').insertOne({ email, password: hashedPassword });

      res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Unable to register user' });
    }
  },

  login: async (req, res) => {
    const db = req.app.locals.db;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const user = await db.collection('users').findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Unable to log in' });
    }
  }
};
