const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simulate a database by using a JSON file
const USERS_DB = './users.json';

// Route to register a user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const users = JSON.parse(fs.readFileSync(USERS_DB));

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Username already taken.' });
    }

    users.push({ username, password });
    fs.writeFileSync(USERS_DB, JSON.stringify(users));

    res.status(201).json({ message: 'User registered successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
