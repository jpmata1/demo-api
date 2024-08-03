const express = require('express');
const { rateLimit } = require('express-rate-limit');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

// Rate Limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs` (here, per 5 minutes)
  message: 'Too many requests from this IP, please try again after 5 minutes'
})

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple health route
app.get('/health', (req, res) => {
  res.send({message: 'UP'});
});

/**
 * 
 * Example Using No DB
 * 
 */

// In-memory storage for users
let users = [];
let nextId = 1;

// CREATE: Add a new user
app.post('v1/users', (req, res) => {
  const newUser = { id: nextId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ: Get all users
app.get('/v1/users', (req, res) => {
  res.json(users);
});

// READ: Get a user by ID
app.get('/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// UPDATE: Update a user by ID
app.put('/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    const updatedUser = { id: userId, ...req.body };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE: Delete a user by ID
app.delete('/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * 
 * Examples Using DB Connection
 * 
 */

// // Connect to MongoDB
// const dBConnString = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/demo";

// mongoose.connect(dBConnString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB', err);
// });

// // Define a User schema
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   age: Number
// });

// // Create a User model
// const User = mongoose.model('User', userSchema);

// // CREATE: Add a new user
// app.post('/v1/users', async (req, res) => {
//   const newUser = new User(req.body);
//   try {
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // READ: Get all users
// app.get('/v1/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // READ: Get a user by ID
// app.get('/v1/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // UPDATE: Update a user by ID
// app.put('/v1/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // DELETE: Delete a user by ID
// app.delete('/v1/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (user) {
//       res.status(204).send();
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Catch All for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" })
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});