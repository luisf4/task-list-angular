const express = require('express');
const fs = require('fs');
const path = require('path');

// Set express
const app = express();
// Set json as default 
app.use(express.json());

// Defines the path to the json file 
const tasksFile = path.join(__dirname, 'data/tasks.json');

// Function to read the tasks.json file
function readTasksFile() {
  const data = fs.readFileSync(tasksFile);
  return JSON.parse(data);
}

// Function to write to the tasks.json  file 
function writeTasksFile(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks));
}

app.get('/api/tasks', (req,res) => {
  return res.json(readTasksFile());
})

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  const tasks = readTasksFile();
  const newTask = { id: Date.now().toString(), name };
  tasks.push(newTask);
  writeTasksFile(tasks);

  res.json(newTask);
});

// Update an existing task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  const tasks = readTasksFile();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks[taskIndex].name = name;
  writeTasksFile(tasks);

  res.json(tasks[taskIndex]);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  const tasks = readTasksFile();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(taskIndex, 1);
  writeTasksFile(tasks);

  res.json({ message: 'Task deleted successfully.' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
