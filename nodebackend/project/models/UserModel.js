const fs = require("fs");
const { DATA_FILE } = require("../config/appConfig");

// Read users from JSON file
const getUsers = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

// Save users to JSON file
const saveUsers = (users) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

// Find user by email
const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

// Add a new user
const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

module.exports = {
  getUsers,
  findUserByEmail,
  addUser,
};
