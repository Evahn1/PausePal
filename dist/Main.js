// ==========================
// Global Variables
// ==========================
let currentUser = null;

// ==========================
// Create Containers
// ==========================

// ----- Login Container -----
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
taskInput.style.width = "100%";
taskInput.style.padding = "10px";
taskInput.style.marginBottom = "10px";
taskInput.style.border = "1px solid #ccc";
taskInput.style.borderRadius = "5px";

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

// Handle Enter Key for Task Creation
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        insertTask(taskInput.value);
        taskInput.value = "";
    }
});

// Insert Task Function
function insertTask(taskText) {
    if (!taskText.trim()) return;

    const taskLine = document.createElement("div");
    taskLine.style.display = "flex";
    taskLine.style.alignItems = "center";
    taskLine.style.gap = "10px";
    taskLine.style.padding = "5px 0";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        taskSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.contentEditable = "true";
    taskSpan.style.flexGrow = "1";
    taskSpan.style.borderBottom = "1px solid transparent";
    taskSpan.style.padding = "5px";

    taskLine.appendChild(checkbox);
    taskLine.appendChild(taskSpan);
    notepadArea.appendChild(taskLine);
}

// Append elements to Notepad Container
notepadContainer.appendChild(toolbar);
notepadContainer.appendChild(taskInput);
notepadContainer.appendChild(notepadArea);

// ----- Append Containers to Body -----
document.body.appendChild(loginContainer);
document.body.appendChild(notepadContainer);

// ==========================
// Event Listeners for Login
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

logOutButton.addEventListener("click", logout);

// ==========================
// View Loading Functions
// ==========================
function loadTaskEditor() {
    loginContainer.style.display = "none";
    notepadContainer.style.display = "flex";
    taskInput.focus();
}

function logout() {
    notepadArea.innerHTML = "";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    currentUser = null;
    notepadContainer.style.display = "none";
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
