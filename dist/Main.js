// ==========================
// Global Variables
// ==========================
let currentUser = null;

import { marked } from 'marked';
// ==========================
// Create Containers
// ==========================

// ----- Login Container -----
const loginContainer = document.createElement("div");
loginContainer.id = "loginContainer";
loginContainer.style.width = "300px";
loginContainer.style.position = "absolute";
loginContainer.style.top = "50%";
loginContainer.style.left = "50%";
loginContainer.style.transform = "translate(-50%, -50%)";
loginContainer.style.margin = "0"; // Remove margin so centering works correctly
loginContainer.style.padding = "20px";
loginContainer.style.border = "1px solid #ccc";
loginContainer.style.borderRadius = "10px";
loginContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
loginContainer.style.display = "flex";
loginContainer.style.flexDirection = "column";
loginContainer.style.gap = "10px";

// Login Inputs
const loginEmailInput = document.createElement("input");
loginEmailInput.type = "email";
loginEmailInput.placeholder = "Enter email";
loginEmailInput.style.padding = "10px";

const loginPasswordInput = document.createElement("input");
loginPasswordInput.type = "password";
loginPasswordInput.placeholder = "Enter password";
loginPasswordInput.style.padding = "10px";

// Login Buttons
const loginBtn = document.createElement("button");
loginBtn.innerText = "Login";
loginBtn.style.padding = "10px";
loginBtn.style.backgroundColor = "#007bff";
loginBtn.style.color = "white";

const goToRegisterBtn = document.createElement("button");
goToRegisterBtn.innerText = "Register";
goToRegisterBtn.style.padding = "10px";
goToRegisterBtn.style.backgroundColor = "#28a745";
goToRegisterBtn.style.color = "white";

// Create the login image
const loginImage = document.createElement("img");
loginImage.src = "Screenshot 2025-03-01 at 1.44.07 PM.png"; // Replace with actual URL or file path
loginImage.alt = "Login Image";
loginImage.style.width = "100%"; // Adjust width as needed
loginImage.style.maxWidth = "150px"; // Controls max size
loginImage.style.margin = "0 auto 10px"; // Centers and adds spacing
loginImage.style.display = "block"; // Ensures it centers properly
loginImage.style.borderRadius = "10px"; // Optional: rounded corners

// Insert the image at the top of loginContainer
loginContainer.appendChild(loginImage); // This adds the image at the bottom
loginContainer.insertBefore(loginImage, loginContainer.firstChild); // Moves it to the top


// Append to Login Container
loginContainer.appendChild(loginEmailInput);
loginContainer.appendChild(loginPasswordInput);
loginContainer.appendChild(loginBtn);
loginContainer.appendChild(goToRegisterBtn);

// ----- Notepad / Task Editor Container -----
const notepadContainer = document.createElement("div");
notepadContainer.id = "notepadContainer";
notepadContainer.style.width = "90%";
notepadContainer.style.maxWidth = "600px";
notepadContainer.style.minHeight = "80vh";
notepadContainer.style.borderRadius = "8px";
notepadContainer.style.padding = "20px";
notepadContainer.style.display = "none";
notepadContainer.style.flexDirection = "column";
notepadContainer.style.alignItems = "center";
notepadContainer.style.display = "flex";
notepadContainer.style.flexDirection = "column";
notepadContainer.style.display = "none";


// ----- AI Output Box -----
const aiOutputBox = document.createElement("div");
aiOutputBox.id = "aiOutputBox";
aiOutputBox.style.width = "100%";
aiOutputBox.style.minHeight = "400px";
aiOutputBox.style.border = "2px solid #ccc";
aiOutputBox.style.borderRadius = "8px";
aiOutputBox.style.padding = "12px";
aiOutputBox.style.backgroundColor = "#f9f9f9";
aiOutputBox.style.overflowY = "auto";
aiOutputBox.style.color = "#333";
aiOutputBox.style.backgroundColor = "#fff";
aiOutputBox.style.pointerEvents = "none"; // Makes it read-only
aiOutputBox.textContent = "AI-generated task plan will appear here...";
aiOutputBox.style.display = "none"; // Hide it initially



const registerContainer = document.createElement("div");
registerContainer.style.width = "300px";
registerContainer.style.margin = "100px auto";
registerContainer.style.padding = "20px";
registerContainer.style.border = "1px solid #ccc";
registerContainer.style.borderRadius = "10px";
registerContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
registerContainer.style.display = "flex";
registerContainer.style.flexDirection = "column";
registerContainer.style.gap = "10px";
registerContainer.style.display = "none";



// ----- Toolbar (Logout & Save Buttons) -----
const toolbar = document.createElement("div");
toolbar.style.display = "flex";
toolbar.style.justifyContent = "space-between";
toolbar.style.width = "100%";
toolbar.style.paddingBottom = "10px";

// Logout Button
const logOutButton = document.createElement("button");
logOutButton.innerText = "Logout";
logOutButton.style.padding = "10px";
logOutButton.style.backgroundColor = "#dc3545";
logOutButton.style.color = "white";
logOutButton.style.borderRadius = "5px";

// Save Button
const saveButton = document.createElement("button");
saveButton.innerText = "Save";
saveButton.style.padding = "10px";
saveButton.style.backgroundColor = "#007bff";
saveButton.style.color = "white";
saveButton.style.borderRadius = "5px";

// Append to Toolbar
toolbar.appendChild(logOutButton);
toolbar.appendChild(saveButton);

// ----- Task Input Field -----
const taskInput = document.createElement("input");
taskInput.type = "text";
taskInput.placeholder = "Enter a new task and press Enter";
taskInput.style.width = "55%"; // Shrink it slightly
taskInput.style.marginRight = "10px"; // Add spacing
taskInput.style.padding = "10px";
taskInput.style.marginBottom = "10px";
taskInput.style.border = "1px solid #ccc";
taskInput.style.borderRadius = "5px";

// ----- Create Task Button -----
const createTaskBtn = document.createElement("button");
createTaskBtn.innerText = "Create Task";
createTaskBtn.style.padding = "10px";
createTaskBtn.style.backgroundColor = "#007bff";
createTaskBtn.style.color = "white";
createTaskBtn.style.borderRadius = "5px";
createTaskBtn.style.marginBottom = "10px";
createTaskBtn.style.width = "100%";  // Makes the button fill its container

createTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        insertTask(taskInput.value);
        taskInput.value = "";
    }
});

// ----- Notepad Area -----
const notepadArea = document.createElement("div");
notepadArea.id = "notepadArea";
notepadArea.style.width = "100%";
notepadArea.style.minHeight = "400px";
notepadArea.style.border = "2px solid #ccc";
notepadArea.style.borderRadius = "8px";
notepadArea.style.padding = "12px";
notepadArea.style.backgroundColor = "#f9f9f9";
notepadArea.style.overflowY = "auto";
notepadArea.style.color = "#333"; // Ensures text is visible
notepadArea.style.backgroundColor = "#fff"; // Ensures a white background


// Handle Enter Key for Task Creation
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        insertTask(taskInput.value);
        taskInput.value = "";
    }
});

function insertTask(taskText) {
    if (!taskText.trim()) return; // Prevent empty tasks

    // Create task container
    const taskLine = document.createElement("div");
    taskLine.style.display = "flex";
    taskLine.style.alignItems = "center";
    taskLine.style.gap = "10px";
    taskLine.style.padding = "5px 0";

    // Create checkbox for task completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        taskSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    // Create editable task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.contentEditable = "true";
    taskSpan.style.flexGrow = "1";
    taskSpan.style.borderBottom = "1px solid transparent";
    taskSpan.style.padding = "5px";

    // Delete task when empty and Backspace is pressed
    taskSpan.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && taskSpan.innerText.trim() === "") {
            e.preventDefault();
            taskLine.remove();
        }
    });

    // Append elements to task container
    taskLine.appendChild(checkbox);
    taskLine.appendChild(taskSpan);

    // Append task container to the notepad area
    notepadArea.appendChild(taskLine);
}

// ----- Create Generate Breaks Button -----
const generateBreaksBtn = document.createElement("button");
generateBreaksBtn.innerText = "Generate Breaks";
generateBreaksBtn.style.padding = "10px";
generateBreaksBtn.style.backgroundColor = "#007bff";
generateBreaksBtn.style.color = "white";
generateBreaksBtn.style.borderRadius = "5px";
generateBreaksBtn.style.marginBottom = "10px";
generateBreaksBtn.style.display = "none";
generateBreaksBtn.style.width = "100%";

generateBreaksBtn.addEventListener("click", generateBreaks);

// Attach an event listener to call your break generation function
function generateBreaks() {
    // Extract tasks from the notepad area as text
    const tasksText = notepadArea.innerText.trim();
    if (!tasksText) {
        aiOutputBox.innerText = "No tasks found.";
        return;
    }

    // Immediately display a loading message
    aiOutputBox.innerText = "Loading tasks...";

    // Split tasks by newline (or use another delimiter as needed)
    const tasks = tasksText.split('\n').filter(task => task.trim() !== "");

    // Send the tasks array to the server's AI endpoint
    fetch('https://pausepal.onrender.com/process-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks })
    })
        .then(response => response.json())
        .then(data => {
            // Convert the markdown to HTML using marked
            const htmlContent = marked(data.suggestions);
            aiOutputBox.innerHTML = htmlContent;
        })

        .catch(err => {
            console.error("Error generating breaks:", err);

            // Display the actual error message in the UI
            aiOutputBox.innerText = `Error: ${err.message || "An unknown error occurred"}`;
        });
}




// ----- Create AI Output Container -----
const aiOutputContainer = document.createElement("div");
aiOutputContainer.style.width = "40%";
aiOutputContainer.style.display = "flex";
aiOutputContainer.style.flexDirection = "column";
aiOutputContainer.style.alignItems = "center";

// Append the button and output box to the AI container
aiOutputContainer.appendChild(generateBreaksBtn);
aiOutputContainer.appendChild(aiOutputBox);

// ----- Create Task Manager Wrapper -----
const taskManagerWrapper = document.createElement("div");
taskManagerWrapper.style.display = "flex";
taskManagerWrapper.style.width = "90%";
taskManagerWrapper.style.maxWidth = "900px"; // Adjust as needed
taskManagerWrapper.style.gap = "20px"; // Space between the two sections

// Set flex properties to determine space allocation
notepadContainer.style.flex = "2"; // Takes more space
aiOutputContainer.style.flex = "1"; // Takes less space

// Append both containers as siblings to the wrapper
taskManagerWrapper.appendChild(notepadContainer);
taskManagerWrapper.appendChild(aiOutputContainer);

// Append the task manager wrapper to the body
document.body.appendChild(taskManagerWrapper);

// Append elements to Notepad Container
notepadContainer.appendChild(toolbar);
notepadContainer.appendChild(createTaskBtn); // New button added here
notepadContainer.appendChild(taskInput);
notepadContainer.appendChild(notepadArea);

// ----- Append Containers to Body -----
document.body.appendChild(loginContainer);
document.body.appendChild(registerContainer);

// Define the missing register inputs and buttons
const registerEmailInput = document.createElement("input");
registerEmailInput.type = "email";
registerEmailInput.placeholder = "Enter email";
registerEmailInput.style.padding = "10px";

const registerPasswordInput = document.createElement("input");
registerPasswordInput.type = "password";
registerPasswordInput.placeholder = "Enter password";
registerPasswordInput.style.padding = "10px";

const registerBtn = document.createElement("button");
registerBtn.innerText = "Register New User";
registerBtn.style.padding = "10px";
registerBtn.style.backgroundColor = "#28a745";
registerBtn.style.color = "white";

const backToLoginBtn = document.createElement("button");
backToLoginBtn.innerText = "Back to Login";
backToLoginBtn.style.padding = "10px";
backToLoginBtn.style.backgroundColor = "#007bff";
backToLoginBtn.style.color = "white";

// Append elements to register container
registerContainer.appendChild(registerEmailInput);
registerContainer.appendChild(registerPasswordInput);
registerContainer.appendChild(registerBtn);
registerContainer.appendChild(backToLoginBtn);

// ==========================
// Event Listeners for Login
// ==========================
loginBtn.addEventListener("click", async () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
        currentUser = email;
        // Load saved notes from server
        fetch('https://pausepal.onrender.com/loadNotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
            .then(response => response.text())
            .then(notes => {
                notepadArea.innerHTML = notes;
                loadTaskEditor();
            })
            .catch(err => {
                console.error("Failed to load notes:", err);
                loadTaskEditor();
            });
    }
});

// =====================
// Registration Features
//======================
goToRegisterBtn.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registerContainer.style.display = "flex";
});

registerBtn.addEventListener("click", () => {
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    register(email, password);
});

backToLoginBtn.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

logOutButton.addEventListener("click", () => {
    logout();
});
// =================================
// Event listeners for Save feature
// =================================
saveButton.addEventListener("click", () => {
    const notesContent = notepadArea.innerHTML;
    fetch('https://pausepal.onrender.com/saveNotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser, notes: notesContent })
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(err => {
            console.error("Failed to save notes:", err);
            alert("Failed to save notes.");
        });
});

// ==========================
// View Loading Functions
// ==========================
function loadTaskEditor() {
    if (!currentUser) return; // Prevent accidental showing
    loginContainer.style.display = "none";
    registerContainer.style.display = "none";
    notepadContainer.style.display = "flex";
    aiOutputBox.style.display = "block";
    generateBreaksBtn.style.display = "block";  // Show the button when logged in
    taskInput.focus();
}

function logout() {
    notepadArea.innerHTML = "";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    currentUser = null;
    notepadContainer.style.display = "none";
    aiOutputBox.style.display = "none"; // Hide AI output box when logging out
    generateBreaksBtn.style.display = "none"; // Hide the Generate Breaks button on logout
    loginContainer.style.display = "flex";
}

// ==========================
// Server Interaction Functions
// ==========================
function login(email, password) {
    return fetch('https://pausepal.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.text())
        .then(data => {
            if (data === "Login successful!") {
                return true;
            } else {
                alert(data);
                return false;
            }
        })
        .catch(() => false);
}

function register(email, password) {
    fetch('https://pausepal.onrender.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => {
            console.error('Registration failed:', error);
            alert('Registration failed. Check console for details.');
        });
}