const express = require('express');
const admin = require('firebase-admin');

const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const JWT_SECRET = '';

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    const token = jwt.sign({ userId: userRecord.uid }, JWT_SECRET);
    res.json({ message: 'User registered successfully.', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);
    // Try to login 
    await admin.auth().signInWithEmailAndPassword(email, password);
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = jwt.sign({ userId: userRecord.uid }, JWT_SECRET);
    res.json({ message: 'Login successful.', token });
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: 'Invalid email or password.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
