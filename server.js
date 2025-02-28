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
        loadNotes(email);
    }
});

goToRegisterBtn.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registerContainer.style.display = "flex";
});

registerBtn.addEventListener("click", async () => {
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    const success = await register(email, password);
    if (success) {
        registerContainer.style.display = "none";
        loginContainer.style.display = "flex";
    }
});

backToLoginBtn.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

// ============
// Event Listeners for Notepad / Task Editor
// ============
logoutButton.addEventListener("click", logout);

saveButton.addEventListener("click", () => {
    const notesContent = notepadArea.innerHTML;
    saveNotes(currentUser, notesContent);
});

insertTaskButton.addEventListener("click", insertTask);

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
async function register(email, password) {
    try {
        const response = await fetch('https://pausepal.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const text = await response.text();
        alert(text);
        return response.ok;
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed.');
        return false;
    }
}

async function login(email, password) {
    try {
        const response = await fetch('https://pausepal.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const text = await response.text();
        if (response.ok) {
            loginEmailInput.value = "";
            loginPasswordInput.value = "";
            return true;
        }
        alert(text);
        return false;
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed.");
        return false;
    }
}

async function saveNotes(email, notes) {
    try {
        const response = await fetch('https://pausepal.onrender.com/saveNotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, notes })
        });
        alert(await response.text());
    } catch (error) {
        console.error("Failed to save notes:", error);
        alert("Failed to save notes.");
    }
}

async function loadNotes(email) {
    try {
        const response = await fetch('https://pausepal.onrender.com/loadNotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (response.ok) {
            notepadArea.innerHTML = await response.text();
        }
        loadTaskEditor();
    } catch (error) {
        console.error("Failed to load notes:", error);
        loadTaskEditor();
    }
}
