// ============
// Global Variables
// ============
let currentUser = null;

// ============
// Notepad / Task Editor Screen Elements
// ============
const notepadContainer = document.createElement("div");

// Log Out Button
const logOutButton = document.createElement("button");
logOutButton.id = "logOut";
logOutButton.innerText = "Logout";
logOutButton.style.position = "absolute";
logOutButton.style.top = "10px";
logOutButton.style.left = "10px";
logOutButton.style.width = "100px";
logOutButton.style.height = "40px";
logOutButton.style.fontSize = "16px";
logOutButton.style.border = "none";
logOutButton.style.borderRadius = "5px";
logOutButton.style.backgroundColor = "#dc3545";
logOutButton.style.color = "white";
logOutButton.style.cursor = "pointer";
logOutButton.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
logOutButton.style.transition = "0.3s";
logOutButton.addEventListener("mouseover", () => { logOutButton.style.opacity = "0.8"; });
logOutButton.addEventListener("mouseout", () => { logOutButton.style.opacity = "1"; });
logOutButton.addEventListener("click", () => { logout(); });

// Create the contenteditable div (instead of a textarea)
const notepadArea = document.createElement("div");
notepadArea.id = "notepadArea";
notepadArea.contentEditable = "true";
notepadArea.style.width = "600px";
notepadArea.style.minHeight = "400px";
notepadArea.style.fontFamily = "Arial, sans-serif";
notepadArea.style.fontSize = "16px";
notepadArea.style.padding = "12px";
notepadArea.style.border = "2px solid #ccc";
notepadArea.style.borderRadius = "8px";
notepadArea.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.1)";
notepadArea.style.outline = "none";
notepadArea.style.backgroundColor = "#f9f9f9";
notepadArea.style.color = "#333";
notepadArea.innerHTML = localStorage.getItem("savedNotes") || "";

// When focused, change border color
notepadArea.addEventListener("focus", () => { notepadArea.style.border = "2px solid #007bff"; });
notepadArea.addEventListener("blur", () => { notepadArea.style.border = "2px solid #ccc"; });

// Save Button for notes
const saveButton = document.createElement("button");
saveButton.innerText = "Save";
saveButton.style.marginTop = "10px";
saveButton.style.position = "absolute";
saveButton.style.right = "25px";
saveButton.style.top = "10px";
saveButton.style.width = "100px";
saveButton.style.height = "40px";
saveButton.style.fontSize = "16px";
saveButton.style.border = "none";
saveButton.style.borderRadius = "5px";
saveButton.style.backgroundColor = "#007bff";
saveButton.style.color = "white";
saveButton.style.cursor = "pointer";
saveButton.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
saveButton.style.transition = "0.3s";
saveButton.addEventListener("mouseover", () => { saveButton.style.opacity = "0.8"; });
saveButton.addEventListener("mouseout", () => { saveButton.style.opacity = "1"; });
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

// -----------------
// Task Insertion Toolbar
// -----------------
const toolbar = document.createElement("div");
toolbar.style.marginTop = "10px";

// Button to insert a new task into the contenteditable area
const addTaskButton = document.createElement("button");
addTaskButton.innerText = "Insert Task";
addTaskButton.style.padding = "8px 12px";
addTaskButton.style.fontSize = "14px";
addTaskButton.style.border = "none";
addTaskButton.style.borderRadius = "5px";
addTaskButton.style.backgroundColor = "#28a745";
addTaskButton.style.color = "white";
addTaskButton.style.cursor = "pointer";

// When clicked, this function inserts a task element at the current caret position.
addTaskButton.addEventListener("click", () => {
    insertTask();
});

// Function to create and insert a task element
function insertTask() {
    // Create a container for the task (you can adjust the tag as needed, e.g., <div> or <p>)
    const taskContainer = document.createElement("div");
    taskContainer.style.display = "flex";
    taskContainer.style.alignItems = "center";
    taskContainer.style.margin = "5px 0";

    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "8px";

    // Create the text span that is editable within the task container
    const taskText = document.createElement("span");
    taskText.contentEditable = "true";
    taskText.style.flexGrow = "1";
    taskText.style.outline = "none";
    taskText.innerText = "New Task";

    // Listen for checkbox changes to apply a strikethrough style
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = "line-through";
            // Optionally, you could also move the task element to the bottom.
            // For instance, remove and reinsert the taskContainer at the end of the notepadArea:
            notepadArea.appendChild(taskContainer);
        } else {
            taskText.style.textDecoration = "none";
        }
    });

    // Append the checkbox and text to the container
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskText);

    // Insert the new task container at the current caret position in the contenteditable area.
    // For simplicity, here we append it to the end.
    notepadArea.appendChild(taskContainer);
}

// Append toolbar button to toolbar
toolbar.appendChild(addTaskButton);

// Append elements to the notepad container
notepadContainer.appendChild(logOutButton);
notepadContainer.appendChild(notepadArea);
notepadContainer.appendChild(toolbar);
notepadContainer.appendChild(saveButton);

// ============
// Login Screen Elements
// ============
const loginContainer = document.createElement("div");
loginContainer.style.width = "300px";
loginContainer.style.margin = "100px auto";
loginContainer.style.padding = "20px";
loginContainer.style.border = "1px solid #ccc";
loginContainer.style.borderRadius = "10px";
loginContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
loginContainer.style.display = "flex";
loginContainer.style.flexDirection = "column";
loginContainer.style.gap = "10px";

// Email Input for Login
const loginEmailInput = document.createElement("input");
loginEmailInput.type = "email";
loginEmailInput.placeholder = "Enter email address";
loginEmailInput.style.fontSize = "16px";
loginEmailInput.style.padding = "10px";
loginEmailInput.style.border = "1px solid #ccc";
loginEmailInput.style.borderRadius = "5px";

// Password Input for Login
const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "Enter password";
passwordInput.style.fontSize = "16px";
passwordInput.style.padding = "10px";
passwordInput.style.border = "1px solid #ccc";
passwordInput.style.borderRadius = "5px";

// Login Button
const loginBtn = document.createElement("button");
loginBtn.innerText = "Login";
loginBtn.style.padding = "10px";
loginBtn.style.fontSize = "16px";
loginBtn.style.border = "none";
loginBtn.style.borderRadius = "5px";
loginBtn.style.backgroundColor = "#007bff";
loginBtn.style.color = "white";
loginBtn.style.cursor = "pointer";

// Button to switch to Registration Screen
const goToRegisterButton = document.createElement("button");
goToRegisterButton.innerText = "Register";
goToRegisterButton.style.padding = "10px";
goToRegisterButton.style.fontSize = "16px";
goToRegisterButton.style.border = "none";
goToRegisterButton.style.borderRadius = "5px";
goToRegisterButton.style.backgroundColor = "#28a745";
goToRegisterButton.style.color = "white";
goToRegisterButton.style.cursor = "pointer";

// Append login elements to login container
loginContainer.appendChild(loginEmailInput);
loginContainer.appendChild(passwordInput);
loginContainer.appendChild(loginBtn);
loginContainer.appendChild(goToRegisterButton);

// ============
// Registration Screen Elements
// ============
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

// Email Input for Registration
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "Enter email address";
emailInput.style.fontSize = "16px";
emailInput.style.padding = "10px";
emailInput.style.border = "1px solid #ccc";
emailInput.style.borderRadius = "5px";

// Password Input for Registration
const regPasswordInput = document.createElement("input");
regPasswordInput.type = "password";
regPasswordInput.placeholder = "Enter password";
regPasswordInput.style.fontSize = "16px";
regPasswordInput.style.padding = "10px";
regPasswordInput.style.border = "1px solid #ccc";
regPasswordInput.style.borderRadius = "5px";

// Registration Button
const registerBtn = document.createElement("button");
registerBtn.innerText = "Register";
registerBtn.style.padding = "10px";
registerBtn.style.fontSize = "16px";
registerBtn.style.border = "none";
registerBtn.style.borderRadius = "5px";
registerBtn.style.backgroundColor = "#28a745";
registerBtn.style.color = "white";
registerBtn.style.cursor = "pointer";

// Back Button to return to Login Screen
const backToLoginButton = document.createElement("button");
backToLoginButton.innerText = "Back to Login";
backToLoginButton.style.padding = "10px";
backToLoginButton.style.fontSize = "16px";
backToLoginButton.style.border = "none";
backToLoginButton.style.borderRadius = "5px";
backToLoginButton.style.backgroundColor = "#6c757d";
backToLoginButton.style.color = "white";
backToLoginButton.style.cursor = "pointer";

// Append registration elements to registration container
registerContainer.appendChild(emailInput);
registerContainer.appendChild(regPasswordInput);
registerContainer.appendChild(registerBtn);
registerContainer.appendChild(backToLoginButton);

// ============
// Append Containers to Body
// ============
document.body.appendChild(loginContainer);
document.body.appendChild(registerContainer);

// ============
// Event Listeners and Functions
// ============

// ----- Login Event -----
loginBtn.addEventListener("click", async () => {
    const email = loginEmailInput.value;
    const password = passwordInput.value;

    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
        currentUser = email; // Store email globally

        // Load user's saved notes from backend
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

// ----- Switch to Registration Screen -----
goToRegisterButton.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registerContainer.style.display = "flex";
});

// ----- Registration Event -----
registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = regPasswordInput.value;
    register(email, password);
});

// ----- Back to Login from Registration Screen -----
backToLoginButton.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

// ----- Load Task Editor / Notepad Screen -----
function loadTaskEditor() {
    document.body.innerHTML = ""; // Clear the body
    document.body.appendChild(notepadContainer);
}

// ----- Logout Function -----
function logout() {
    document.body.innerHTML = "";
    // Reset input fields if needed
    loginEmailInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";
    regPasswordInput.value = "";
    document.body.appendChild(loginContainer);
    currentUser = null;
}

// ----- Registration Function -----
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

// ----- Login Function -----
function login(email, password) {
    return fetch('https://pausepal.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.text())
        .then(data => {
            if (data === "Login successful!") {
                loginEmailInput.value = "";
                passwordInput.value = "";
                return true;
            } else {
                alert(data);
                return false;
            }
        })
        .catch(err => {
            console.error("Login request failed:", err);
            return false;
        });
}
