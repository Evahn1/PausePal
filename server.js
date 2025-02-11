import fs from 'fs';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // CORS middleware must be used after app is initialized
app.use(express.json());

const USERS_FILE = 'users.txt';
const NOTES_FILE = 'notes.txt';
// Helper functions for encoding/decoding in base64
const encodeBase64 = (text) => Buffer.from(text, 'utf8').toString('base64');
const decodeBase64 = (text) => Buffer.from(text, 'base64').toString('utf8');

// Register a user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send("Username and password are required.");
    }

    // Ensure the users.txt file exists
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, "");
    }

    // Read existing users
    const users = fs.readFileSync(USERS_FILE, 'utf8').trim().split('\n').filter(line => line);

    // Encode credentials to base64
    const encodedUsername = encodeBase64(username);
    const encodedPassword = encodeBase64(password);

    // Check if username already exists
    for (let user of users) {
        const [existingUsername, existingPassword] = user.split(':');
        if (existingUsername === encodedUsername) {
            return res.send("Username already exists!");
        }
    }

    // Save the new user
    const newUser = `${encodedUsername}:${encodedPassword}\n`;
    fs.appendFileSync(USERS_FILE, newUser);
    res.send("User registered successfully!");
});

// Login a user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = fs.readFileSync(USERS_FILE, 'utf8').split('\n').filter(line => line);

    // Encode the input username and password to base64
    const encodedUsername = encodeBase64(username);
    const encodedPassword = encodeBase64(password);

    // Check if the credentials match
    for (let user of users) {
        const [storedUsername, storedPassword] = user.split(':');
        if (storedUsername === encodedUsername && storedPassword === encodedPassword) {
            return res.send("Login successful!");
        }
    }

    res.send("Invalid username or password.");
});

app.post('/saveNotes', (req, res) => {
    const { username, notes } = req.body;

    if (!username) {
        return res.send("User not found.");
    }

    // Ensure notes.txt file exists
    if (!fs.existsSync(NOTES_FILE)) {
        fs.writeFileSync(NOTES_FILE, "");
    }

    // Read existing notes, remove old note for the user
    let notesData = fs.readFileSync(NOTES_FILE, 'utf8')
        .split('\n')
        .filter(line => !line.startsWith(username + ":"));

    // Encode notes to base64 to handle multi-line content safely
    const encodedNotes = Buffer.from(notes, 'utf8').toString('base64');

    // Append the new note
    notesData.push(`${username}:${encodedNotes}`);

    // Write back to the file
    fs.writeFileSync(NOTES_FILE, notesData.join('\n'));

    res.send("Notes saved successfully!");
});

app.post('/loadNotes', (req, res) => {
    const { username } = req.body;

    if (!fs.existsSync(NOTES_FILE)) {
        return res.send("");
    }

    const notes = fs.readFileSync(NOTES_FILE, 'utf8')
        .split('\n')
        .find(line => line.startsWith(username + ":"));

    if (!notes) {
        return res.send("");
    }

    // Extract and decode base64 note content
    const encodedNotes = notes.split(':').slice(1).join(':'); // Handle colons safely
    const decodedNotes = Buffer.from(encodedNotes, 'base64').toString('utf8');

    res.send(decodedNotes);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
