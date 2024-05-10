const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3020;

// Parse JSON bodies for POST requests
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Perform authentication logic here (e.g., check credentials against database)

    // Dummy authentication for demonstration purposes
    if (email === 'user@example.com' && password === 'password') {
        // Successful login
        return res.status(200).json({ message: "Login successful." });
    } else {
        // Failed login
        return res.status(401).json({ message: "Invalid email or password." });
    }
});

app.post('/signup', (req, res) => {
    const { email, firstName, lastName, phoneNo, password, confirmPassword } = req.body;

    // Check if all required fields are provided
    if (!email || !firstName || !lastName || !phoneNo || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    // Perform signup logic here (e.g., store user data in the database)

    // Dummy signup for demonstration purposes
    const newUser = {
        email,
        firstName,
        lastName,
        phoneNo,
        password
    };

    // Return successful signup response
    return res.status(200).json({ message: "Signup successful.", user: newUser });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
