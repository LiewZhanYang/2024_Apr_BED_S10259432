const User = require("../models/user");

// ... existing controller functions ...
async function createUser(req, res) {
  const userData = req.body;

  try {
    const newUser = await User.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

// Controller function to retrieve all users
async function getAllUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
}

// Controller function to retrieve a user by ID
async function getUserById(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
}

// Controller function to update a user
async function updateUser(req, res) {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedUser = await User.updateUser(userId, updatedData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
}

// Controller function to delete a user
async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const deleted = await User.deleteUser(userId);
    if (deleted) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
}

async function searchUsers(req, res) {
  const searchTerm = req.query.searchTerm; // Extract search term from query params

  try {
    const userController = new User();
    const users = await userController.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching users" });
  }
}
