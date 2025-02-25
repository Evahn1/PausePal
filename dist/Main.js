// ============
// Global Variables
// ============
let currentUser = null;

// ============
// Task Manager / Notepad Screen Elements
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

// Create the text area for notes
const textArea = document.createElement("textarea");
textArea.id = "notepad";
textArea.placeholder = "Start Typing Here...";
textArea.style.width = "600px";
textArea.style.height = "400px";
textArea.style.fontFamily = "Arial, sans-serif";
textArea.style.fontSize = "16px";
textArea.style.padding = "12px";
textArea.style.border = "2px solid #ccc";
textArea.style.borderRadius = "8px";
textArea.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.1)";
textArea.style.resize = "none";
textArea.style.outline = "none";
textArea.style.backgroundColor = "#f9f9f9";
textArea.style.color = "#333";
textArea.addEventListener("focus", () => { textArea.style.border = "2px solid #007bff"; });
textArea.addEventListener("blur", () => { textArea.style.border = "2px solid #ccc"; });
textArea.value = localStorage.getItem("savedNotes") || "";

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
    const notes = textArea.value;
    fetch('https://pausepal.onrender.com/saveNotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser, notes })
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(err => {
            console.error("Failed to save notes:", err);
            alert("Failed to save notes.");
        });
});

// Append notepad elements to container
notepadContainer.append(logOutButton);
notepadContainer.appendChild(textArea);
notepadContainer.appendChild(saveButton);

// ============
// Task Manager Section
// ============
const taskManagerContainer = document.createElement("div");
taskManagerContainer.style.marginTop = "20px";

// Input for new tasks
const taskInput = document.createElement("input");
taskInput.type = "text";
taskInput.placeholder = "Enter new task";
taskInput.style.fontSize = "16px";
taskInput.style.padding = "10px";
taskInput.style.marginRight = "10px";
taskInput.style.width = "300px";

// Button to add a new task
const addTaskButton = document.createElement("button");
addTaskButton.innerText = "Add Task";
addTaskButton.style.padding = "10px";
addTaskButton.style.fontSize = "16px";
addTaskButton.style.border = "none";
addTaskButton.style.borderRadius = "5px";
addTaskButton.style.backgroundColor = "#28a745";
addTaskButton.style.color = "white";
addTaskButton.style.cursor = "pointer";

// Container for the list of tasks
const tasksList = document.createElement("ul");
tasksList.style.listStyleType = "none";
tasksList.style.padding = "0";
tasksList.style.marginTop = "20px";

// Function to add a new task
function addTask(taskText) {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.padding = "5px 0";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "10px";

    const span = document.createElement("span");
    span.innerText = taskText;
    span.style.flexGrow = "1";

    li.appendChild(checkbox);
    li.appendChild(span);
    tasksList.appendChild(li);

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            // Move the completed task to the bottom
            tasksList.appendChild(li);
        } else {
            span.style.textDecoration = "none";
            // Optionally, reposition if desired
        }
    });
}

// Event listener for adding tasks
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
    }
});

// Append task manager elements to its container
taskManagerContainer.appendChild(taskInput);
taskManagerContainer.appendChild(addTaskButton);
taskManagerContainer.appendChild(tasksList);

// Append the task manager container to the notepad container
notepadContainer.appendChild(taskManagerContainer);

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
                textArea.value = notes;
                loadTaskManager();
            })
            .catch(err => {
                console.error("Failed to load notes:", err);
                loadTaskManager();
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

// ----- Load Task Manager / Notepad Screen -----
function loadTaskManager() {
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
