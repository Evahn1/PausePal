// ============
// Global Variables
// ============
let currentUser = null;

// ============
// Create Login, Registration, and Notepad Containers
// ============

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

// Create Login inputs and buttons
const loginEmailInput = document.createElement("input");
loginEmailInput.type = "email";
loginEmailInput.placeholder = "Enter email address";
loginEmailInput.style.fontSize = "16px";
loginEmailInput.style.padding = "10px";
loginEmailInput.style.border = "1px solid #ccc";
loginEmailInput.style.borderRadius = "5px";

const loginPasswordInput = document.createElement("input");
loginPasswordInput.type = "password";
loginPasswordInput.placeholder = "Enter password";
loginPasswordInput.style.fontSize = "16px";
loginPasswordInput.style.padding = "10px";
loginPasswordInput.style.border = "1px solid #ccc";
loginPasswordInput.style.borderRadius = "5px";

const loginBtn = document.createElement("button");
loginBtn.innerText = "Login";
loginBtn.style.padding = "10px";
loginBtn.style.fontSize = "16px";
loginBtn.style.border = "none";
loginBtn.style.borderRadius = "5px";
loginBtn.style.backgroundColor = "#007bff";
loginBtn.style.color = "white";
loginBtn.style.cursor = "pointer";

const goToRegisterBtn = document.createElement("button");
goToRegisterBtn.innerText = "Register";
goToRegisterBtn.style.padding = "10px";
goToRegisterBtn.style.fontSize = "16px";
goToRegisterBtn.style.border = "none";
goToRegisterBtn.style.borderRadius = "5px";
goToRegisterBtn.style.backgroundColor = "#28a745";
goToRegisterBtn.style.color = "white";
goToRegisterBtn.style.cursor = "pointer";

// Append elements to login container
loginContainer.appendChild(loginEmailInput);
loginContainer.appendChild(loginPasswordInput);
loginContainer.appendChild(loginBtn);
loginContainer.appendChild(goToRegisterBtn);

// ----- Registration Container -----
const registerContainer = document.createElement("div");
registerContainer.id = "registerContainer";
registerContainer.style.width = "300px";
registerContainer.style.margin = "100px auto";
registerContainer.style.padding = "20px";
registerContainer.style.border = "1px solid #ccc";
registerContainer.style.borderRadius = "10px";
registerContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
registerContainer.style.display = "none";  // hidden initially
registerContainer.style.flexDirection = "column";
registerContainer.style.gap = "10px";

const registerEmailInput = document.createElement("input");
registerEmailInput.type = "email";
registerEmailInput.placeholder = "Enter email address";
registerEmailInput.style.fontSize = "16px";
registerEmailInput.style.padding = "10px";
registerEmailInput.style.border = "1px solid #ccc";
registerEmailInput.style.borderRadius = "5px";

const registerPasswordInput = document.createElement("input");
registerPasswordInput.type = "password";
registerPasswordInput.placeholder = "Enter password";
registerPasswordInput.style.fontSize = "16px";
registerPasswordInput.style.padding = "10px";
registerPasswordInput.style.border = "1px solid #ccc";
registerPasswordInput.style.borderRadius = "5px";

const registerBtn = document.createElement("button");
registerBtn.innerText = "Register";
registerBtn.style.padding = "10px";
registerBtn.style.fontSize = "16px";
registerBtn.style.border = "none";
registerBtn.style.borderRadius = "5px";
registerBtn.style.backgroundColor = "#28a745";
registerBtn.style.color = "white";
registerBtn.style.cursor = "pointer";

const backToLoginBtn = document.createElement("button");
backToLoginBtn.innerText = "Back to Login";
backToLoginBtn.style.padding = "10px";
backToLoginBtn.style.fontSize = "16px";
backToLoginBtn.style.border = "none";
backToLoginBtn.style.borderRadius = "5px";
backToLoginBtn.style.backgroundColor = "#6c757d";
backToLoginBtn.style.color = "white";
backToLoginBtn.style.cursor = "pointer";

registerContainer.appendChild(registerEmailInput);
registerContainer.appendChild(registerPasswordInput);
registerContainer.appendChild(registerBtn);
registerContainer.appendChild(backToLoginBtn);

// ----- Notepad / Task Editor Container -----
const notepadContainer = document.createElement("div");
notepadContainer.id = "notepadContainer";
notepadContainer.style.width = "90%";
notepadContainer.style.maxWidth = "600px";
notepadContainer.style.minHeight = "80vh";
notepadContainer.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
notepadContainer.style.borderRadius = "8px";
notepadContainer.style.padding = "20px";
notepadContainer.style.display = "none"; // hidden until login
notepadContainer.style.position = "relative";

// Log Out Button
const logOutButton = document.createElement("button");
logOutButton.id = "logoutButton";
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

// Notepad Area (Rich Text with tasks)
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
notepadArea.addEventListener("focus", () => { notepadArea.style.border = "2px solid #007bff"; });
notepadArea.addEventListener("blur", () => { notepadArea.style.border = "2px solid #ccc"; });

// Save Button
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

// Toolbar for Inserting Tasks
const toolbar = document.createElement("div");
toolbar.style.marginTop = "10px";
const insertTaskButton = document.createElement("button");
insertTaskButton.id = "insertTaskButton";
insertTaskButton.innerText = "Insert Task";
insertTaskButton.style.padding = "8px 12px";
insertTaskButton.style.fontSize = "14px";
insertTaskButton.style.border = "none";
insertTaskButton.style.borderRadius = "5px";
insertTaskButton.style.backgroundColor = "#28a745";
insertTaskButton.style.color = "white";
insertTaskButton.style.cursor = "pointer";
insertTaskButton.addEventListener("click", () => { insertTask(); });
toolbar.appendChild(insertTaskButton);

// Append notepad elements to notepadContainer
notepadContainer.appendChild(logOutButton);
notepadContainer.appendChild(notepadArea);
notepadContainer.appendChild(toolbar);
notepadContainer.appendChild(saveButton);

// ============
// Append Containers to Body
// ============
document.body.appendChild(loginContainer);
document.body.appendChild(registerContainer);
document.body.appendChild(notepadContainer);

// ============
// Event Listeners for Login / Registration (View Management)
// ============
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

// ============
// Functions for Task Creation
// ============
function createTaskLine() {
    const taskLine = document.createElement("div");
    taskLine.className = "task-line";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.contentEditable = "true";
    taskText.innerText = "New Task";
    taskText.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newTaskLine = createTaskLine();
            taskLine.parentNode.insertBefore(newTaskLine, taskLine.nextSibling);
            newTaskLine.querySelector(".task-text").focus();
        }
    });

    taskLine.appendChild(checkbox);
    taskLine.appendChild(taskText);
    return taskLine;
}

function insertTask() {
    const newTask = createTaskLine();
    notepadArea.appendChild(newTask);
}

// ============
// View Loading Functions
// ============
function loadTaskEditor() {
    loginContainer.style.display = "none";
    registerContainer.style.display = "none";
    notepadContainer.style.display = "flex";
    if (!notepadArea.innerHTML.trim()) {
        insertTask();
    }
}

function logout() {
    notepadArea.innerHTML = "";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
    registerEmailInput.value = "";
    registerPasswordInput.value = "";
    currentUser = null;
    notepadContainer.style.display = "none";
    loginContainer.style.display = "flex";
}

// ============
// Server Interaction Functions
// ============
function register(email, password) {
    fetch('https://pausepal.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            registerContainer.style.display = "none";
            loginContainer.style.display = "flex";
        })
        .catch(error => {
            console.error('Registration failed:', error);
            alert('Registration failed. Check console for details.');
        });
}

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
                loginPasswordInput.value = "";
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
