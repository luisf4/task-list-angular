const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const admin = require('firebase-admin');

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Middleware to parse JSON body
app.use(bodyParser.json());

// In-memory data store for todos
const todos = [];

// Middleware to authenticate user
async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const [authType, token] = authHeader.split(' ');
  if (authType !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = { id: decodedToken.uid, email: decodedToken.email };
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
}

// User routes
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

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user } = await admin.auth().signInWithEmailAndPassword(email, password);
    const token = jwt.sign({ userId: user.uid }, JWT_SECRET);
    res.json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials.' });
  }
});

// Todo routes
app.get('/api/todos', authenticateUser, (req, res) => {
  const userId = req.user.id;

  // Fetch todos for the authenticated user
  const userTodos = todos.filter((todo) => todo.userId === userId);

  res.json(userTodos);
});

app.post('/api/todos', authenticateUser, (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  const todo = {
    id: todos.length + 1,
    title,
    completed: false,
    userId,
  };

  todos.push(todo);

  res.json({ message: 'Todo created successfully.' });
});


app.put('/api/todos/:id', authenticateUser, (req, res) => {
  const todoId = parseInt(req.params.id);
  const userId = req.user.id;
  const { title, completed } = req.body;

  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo || todo.userId !== userId) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  if (title !== undefined) {
    todo.title = title;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json({ message: 'Todo updated successfully.' });
});


app.delete('/api/todos/:id', authenticateUser, (req, res) => {
  const todoId = parseInt(req.params.id);
  const userId = req.user.id;

  const index = todos.findIndex((todo) => todo.id === todoId && todo.userId === userId);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  todos.splice(index, 1);

  res.json({ message: 'Todo deleted successfully.' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});