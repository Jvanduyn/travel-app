// api.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'duynastyracing@yahoo.com',
    password: 'Beagle150!',
    database: 'myappdb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(express.json());

// Create a new user
app.post('/users', (req, res) => {
    const { username, email, password } = req.body;

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    connection.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Failed to create user' });
            return;
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// Get all users
app.get('/users', (req, res) => {
    const query = `SELECT * FROM users`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Failed to fetch users' });
            return;
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
