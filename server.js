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
You are a **schedule management assistant**. Your job is to take a list of tasks and create a **detailed daily schedule** that includes work sessions and breaks.  
For every **45 minutes of work, insert a 5-minute break**.  

### **Formatting Instructions (Follow exactly):**  
- Do **not** output raw JSON.  
- Format the schedule as **plain text** using **clear headings** and structured bullet points.  
- **Each task must include:**  
  - Start and end times.  
  - A brief description.  
- **Breaks must be clearly marked** (e.g., `🚀 Break Time!`).  
- **Divide the day into sections** (Morning, Afternoon, Evening).  

---

## **Today's Schedule**  

### **Morning Schedule**  
**9:00 AM - 9:15 AM:** **Clean Room**  
- **Task:** Quickly tidy up the room.  

 **9:15 AM - 9:35 AM:** **Dance Party**  
- **Task:** Enjoy 20 minutes of dancing and fun.  

### **Focused Work Sessions**  
**9:35 AM - 12:35 PM:** **Do Taxes**  
- **9:35 AM - 10:20 AM:** Work Session 1 - Focus on gathering tax documents.  
- **10:20 AM - 10:25 AM:** **Break Time!** Stretch, grab a drink.  
- **10:25 AM - 11:10 AM:** Work Session 2 - Continue entering data.  
- **11:10 AM - 11:15 AM:** **Break Time!** Walk, listen to music.  
- **11:15 AM - 12:00 PM:** Work Session 3 - Review and check for errors.  
- **12:00 PM - 12:05 AM:** **Break Time!** Stretch, step outside.  
- **12:05 PM - 12:35 PM:** Work Session 4 - Final review and submission.  

---

Here are the tasks for today:  
${tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

Please generate a schedule following the **exact** formatting above.
        `;

        const response = await model.generateContent(prompt);
        const text = response?.response?.text(); // Extract response text

        if (text) {
            res.json({ suggestions: text });
        } else {
            console.error("Error: Gemini AI returned an empty response");
            res.status(500).send("Failed to get a response from Gemini AI.");
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