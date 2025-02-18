import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase credentials from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Create a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    // Create a new user in Supabase authentication
    const { data, error } = await supabase.auth.signUp({
        email: username, // Using email as username
        password: password,
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    // Optionally, create a profile for the user in another table (e.g., profiles table)
    await supabase.from('profiles').insert([{ user_id: data.user.id, username }]);

    res.send("User registered successfully!");
});

// Login a user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    // Sign in using Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // Using email as username
        password: password,
    });

    if (error) {
        return res.status(401).send("Invalid username or password.");
    }

    res.send("Login successful!");
});

// Save Notes for the logged-in user
app.post('/saveNotes', async (req, res) => {
    const { username, notes } = req.body;

    if (!username || !notes) {
        return res.status(400).send("Username and notes are required.");
    }

    // Fetch user ID from the username
    const { data: userData, error } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('username', username)
        .single();

    if (error || !userData) {
        return res.status(404).send("User not found.");
    }

    const userId = userData.user_id;

    // Save notes for the user in a 'notes' table
    await supabase
        .from('notes')
        .upsert([{ user_id: userId, notes }]);

    res.send("Notes saved successfully!");
});

// Load Notes for a user
app.post('/loadNotes', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send("Username is required.");
    }

    // Fetch user ID from the username
    const { data: userData, error } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('username', username)
        .single();

    if (error || !userData) {
        return res.status(404).send("User not found.");
    }

    const userId = userData.user_id;

    // Fetch notes for the user from the 'notes' table
    const { data: notesData, error: notesError } = await supabase
        .from('notes')
        .select('notes')
        .eq('user_id', userId)
        .single();

    if (notesError || !notesData) {
        return res.status(404).send("No notes found for this user.");
    }

    res.send(notesData.notes);
});

// Simple test endpoint
app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
