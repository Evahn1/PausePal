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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    // Sign up the user using Supabase auth
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    // Insert the user profile using the email as identifier
    const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ user_id: data.user.id, email }]);

    if (profileError) {
        return res.status(400).send(profileError.message);
    }

    res.send("User registered successfully!");
});

// Login a user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    // Sign in using email and password
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        return res.status(401).send("Invalid email or password.");
    }

    res.send("Login successful!");
});

// Save Notes for the logged-in user
app.post('/saveNotes', async (req, res) => {
    try {
        const { email, notes } = req.body;
        if (!email || !notes) {
            return res.status(400).send("Email and notes are required.");
        }

        // 1. Fetch user_id
        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('user_id')
            .eq('email', email)
            .single();

        if (userError || !userData) {
            return res.status(404).send("User not found.");
        }

        const userId = userData.user_id;

        // 2. Upsert notes
        const { data: notesResult, error: notesError } = await supabase
            .from('notes')
            .upsert([{ user_id: userId, notes }], { onConflict: 'user_id' });

        // Log the result and error to see what's actually happening
        console.log("Upsert result:", notesResult);
        console.log("Upsert error:", notesError);

        if (notesError) {
            return res.status(400).send(notesError.message);
        }

        return res.send("Notes saved successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error while saving notes.");
    }
});

// Load Notes for a user
app.post('/loadNotes', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Email is required.");
        }

        // 1. Fetch user_id from the profiles table using email
        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('user_id')
            .eq('email', email)
            .single();

        if (userError || !userData) {
            return res.status(404).send("User not found.");
        }

        const userId = userData.user_id;

        // 2. Fetch notes for the user from the 'notes' table
        const { data: notesData, error: notesError } = await supabase
            .from('notes')
            .select('notes')
            .eq('user_id', userId)
            .single();

        return res.send(notesData.notes);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error while loading notes.");
    }
});

// Simple test endpoint
app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
