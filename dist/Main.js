// ==========================
// Global Variables
// ==========================
let currentUser = null;

// ==========================
// Create Login Page (Always Visible on Startup)
// ==========================
const loginContainer = document.createElement("div");
loginContainer.id = "loginContainer";
loginContainer.style.width = "300px";
loginContainer.style.margin = "100px auto";
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

// Append to Login Container
loginContainer.appendChild(loginEmailInput);
loginContainer.appendChild(loginPasswordInput);
loginContainer.appendChild(loginBtn);
loginContainer.appendChild(goToRegisterBtn);

// ==========================
// Create Register Page (Initially Hidden)
// ==========================
const registerContainer = document.createElement("div");
registerContainer.id = "registerContainer";
registerContainer.style.width = "300px";
registerContainer.style.margin = "100px auto";
registerContainer.style.padding = "20px";
registerContainer.style.border = "1px solid #ccc";
registerContainer.style.borderRadius = "10px";
registerContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
registerContainer.style.display = "none";
registerContainer.style.flexDirection = "column";
registerContainer.style.gap = "10px";

// Register Inputs
const registerEmailInput = document.createElement("input");
registerEmailInput.type = "email";
registerEmailInput.placeholder = "Enter email";
registerEmailInput.style.padding = "10px";

const registerPasswordInput = document.createElement("input");
registerPasswordInput.type = "password";
registerPasswordInput.placeholder = "Enter password";
registerPasswordInput.style.padding = "10px";

// Register Buttons
const registerBtn = document.createElement("button");
registerBtn.innerText = "Register";
registerBtn.style.padding = "10px";
registerBtn.style.backgroundColor = "#28a745";
registerBtn.style.color = "white";

const backToLoginBtn = document.createElement("button");
backToLoginBtn.innerText = "Back to Sign In";
backToLoginBtn.style.padding = "10px";
backToLoginBtn.style.backgroundColor = "#6c757d";
backToLoginBtn.style.color = "white";

// Append to Register Container
registerContainer.appendChild(registerEmailInput);
registerContainer.appendChild(registerPasswordInput);
registerContainer.appendChild(registerBtn);
registerContainer.appendChild(backToLoginBtn);

// ==========================
// Create Task Manager (Initially Hidden)
// ==========================
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

// Toolbar (Logout & Save)
const toolbar = document.createElement("div");
toolbar.style.display = "flex";
toolbar.style.justifyContent = "space-between";

// Logout Button
const logOutButton = document.createElement("button");
logOutButton.innerText = "Logout";
logOutButton.style.padding = "10px";
logOutButton.style.backgroundColor = "#dc3545";
logOutButton.style.color = "white";
logOutButton.style.borderRadius = "5px";
logOutButton.addEventListener("click", logout);

// Save Button (Fixed!)
const saveButton = document.createElement("button");
saveButton.innerText = "Save";
saveButton.style.padding = "10px";
saveButton.style.backgroundColor = "#007bff";
saveButton.style.color = "white";
saveButton.style.borderRadius = "5px";
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

// Append to Toolbar
toolbar.appendChild(logOutButton);
toolbar.appendChild(saveButton);

// Task Input
const taskInput = document.createElement("input");
taskInput.type = "text";
taskInput.placeholder = "Enter a new task and press Enter";
taskInput.style.width = "100%";
taskInput.style.padding = "10px";
taskInput.style.border = "1px solid #ccc";
taskInput.style.borderRadius = "5px";

// Task Area
const notepadArea = document.createElement("div");
notepadArea.style.width = "100%";
notepadArea.style.minHeight = "300px";
notepadArea.style.border = "1px solid #ccc";
notepadArea.style.borderRadius = "5px";
notepadArea.style.padding = "10px";
notepadArea.style.backgroundColor = "#fff";

// Append Elements
notepadContainer.appendChild(toolbar);
notepadContainer.appendChild(taskInput);
notepadContainer.appendChild(notepadArea);

// Append Everything to Body
document.body.appendChild(loginContainer);
document.body.appendChild(registerContainer);
document.body.appendChild(notepadContainer);

// ==========================
// Event Listeners
// ==========================
loginBtn.addEventListener("click", async () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
        currentUser = email;
        loadTaskEditor();
    }
});

goToRegisterBtn.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registerContainer.style.display = "flex";
});

registerBtn.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

backToLoginBtn.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

// Logout Function
function logout() {
    currentUser = null;
    loginContainer.style.display = "flex";
    notepadContainer.style.display = "none";
}

// Login Function
function login(email, password) {
    return fetch('https://pausepal.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.text())
        .then(data => data === "Login successful!")
        .catch(() => false);
}

// Load Task Editor
function loadTaskEditor() {
    loginContainer.style.display = "none";
    notepadContainer.style.display = "flex";
}
