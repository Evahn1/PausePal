import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 10000; // Set port to 10000

// Supabase credentials from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Initialize Google Gemini AI
const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
        const { error: notesError } = await supabase
            .from('notes')
            .upsert([{ user_id: userId, notes }], { onConflict: 'user_id' });

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

        if (notesError || !notesData) {
            return res.status(404).send("");
        }

        return res.send(notesData.notes);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error while loading notes.");
    }
});

app.post('/process-tasks', async (req, res) => {
    console.log("AI request received...");

    const { tasks } = req.body;
    if (!tasks || !Array.isArray(tasks)) {
        return res.status(400).send("Tasks are required and should be an array.");
    }

    try {
        const prompt = `
You are a schedule management assistant. Your task is to generate a structured daily schedule based on the provided tasks.

### **Schedule Guidelines:**
- Each task must have a clear start and end time.
- For every 45 minutes of work, insert a 5-minute break.
- Divide the schedule into Morning, Afternoon, and Evening sections.
- Use structured bullet points for clarity.
- Clearly mark break times with "Break Time".
- Output only the schedule, no extra explanations.

---

## **Today's Schedule**

### **Morning**
- **9:00 AM - 9:15 AM:** Clean Room
  - Task: Quickly tidy up the room.

- **9:15 AM - 9:35 AM:** Dance Party
  - Task: Enjoy 20 minutes of dancing.

### **Work Sessions**
- **9:35 AM - 10:20 AM:** Work Session 1 - Taxes
  - Task: Gather tax documents.
- **10:20 AM - 10:25 AM:** Break Time

- **10:25 AM - 11:10 AM:** Work Session 2 - Taxes
  - Task: Enter financial data.
- **11:10 AM - 11:15 AM:** Break Time

- **11:15 AM - 12:00 PM:** Work Session 3 - Taxes
  - Task: Review and double-check entries.
- **12:00 PM - 12:05 PM:** Break Time

- **12:05 PM - 12:35 PM:** Work Session 4 - Taxes
  - Task: Final review and submission.

---

Here are the tasks for today:
${tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

Please generate a schedule following the exact format above.
        `;

        const response = await model.generateContent(prompt);

        // Debugging: Log raw AI response
        console.log("AI Raw Response:", response);

        // Ensure AI response is properly parsed
        const text = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (text) {
            res.json({ suggestions: text });
        } else {
            console.error("Error: Gemini AI returned an empty or invalid response");
            res.status(500).send("Error generating break plan. Please try again.");
        }
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).send("Error processing tasks with Gemini AI.");
    }
});

// Simple test endpoint
app.get("/", (req, res) => {
    res.send("Server is running!");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
