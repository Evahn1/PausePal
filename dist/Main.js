// ============
// Global Variables
// ============
let currentUser = null;

// ============
// References to Login / Registration Elements
// ============
const loginContainer = document.getElementById("loginContainer");
const registerContainer = document.getElementById("registerContainer");
const notepadContainer = document.getElementById("notepadContainer");

const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const goToRegisterBtn = document.getElementById("goToRegisterBtn");

const registerEmailInput = document.getElementById("registerEmail");
const registerPasswordInput = document.getElementById("registerPassword");
const registerBtn = document.getElementById("registerBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");

// ============
// References to Notepad / Task Editor Elements
// ============
const logoutButton = document.getElementById("logoutButton");
const saveButton = document.getElementById("saveButton");
const insertTaskButton = document.getElementById("insertTaskButton");
const notepadArea = document.getElementById("notepadArea");

// ============
// Event Listeners for Login / Registration
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
// Event Listeners for Notepad / Task Editor
// ============
logoutButton.addEventListener("click", () => {
    logout();
});

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

insertTaskButton.addEventListener("click", () => {
    insertTask();
});

// ============
// Functions for Task Creation
// ============
function createTaskLine() {
    const taskLine = document.createElement("div");
    taskLine.className = "task-line";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // When the checkbox is toggled, apply or remove a strikethrough on the text.
    checkbox.addEventListener("change", () => {
        taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.contentEditable = "true";
    taskText.innerText = "New Task";

    // When the user presses Enter while editing the task text,
    // prevent the default behavior and create a new task line below.
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
    // Hide the login and registration screens; show the notepad screen.
    loginContainer.style.display = "none";
    registerContainer.style.display = "none";
    notepadContainer.style.display = "flex";  // or "block" as desired

    // If the notepad area is empty, insert one task line by default.
    if (!notepadArea.innerHTML.trim()) {
        insertTask();
    }
}

function logout() {
    // Clear the notepad and reset input fields.
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
            // After registration, switch to the login screen.
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
