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

// ----- Notepad / Task Manager -----
const notepadContainer = document.createElement("div");
notepadContainer.id = "notepadContainer";
notepadContainer.style.width = "50%";
notepadContainer.style.minHeight = "80vh";
notepadContainer.style.borderRadius = "8px";
notepadContainer.style.padding = "20px";
notepadContainer.style.display = "none";
notepadContainer.style.flexDirection = "column";
notepadContainer.style.alignItems = "flex-start";

// Toolbar (Logout & Save)
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
logOutButton.addEventListener("click", logout);

// Save Button
const saveButton = document.createElement("button");
saveButton.innerText = "Save";
saveButton.style.padding = "10px";
saveButton.style.backgroundColor = "#007bff";
saveButton.style.color = "white";
saveButton.style.borderRadius = "5px";
saveButton.addEventListener("click", saveNotes);

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
notepadArea.id = "notepadArea";
notepadArea.style.width = "100%";
notepadArea.style.minHeight = "400px";
notepadArea.style.border = "2px solid #ccc";
notepadArea.style.borderRadius = "8px";
notepadArea.style.padding = "12px";
notepadArea.style.backgroundColor = "#fff";
notepadArea.style.color = "#333";
notepadArea.style.overflowY = "auto";

// Handle Task Creation
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

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.contentEditable = "true";
    taskSpan.style.flexGrow = "1";
    taskSpan.style.padding = "5px";

    taskSpan.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && taskSpan.innerText.trim() === "") {
            e.preventDefault();
            taskLine.remove();
        }
    });

    taskLine.appendChild(checkbox);
    taskLine.appendChild(taskSpan);
    notepadArea.appendChild(taskLine);
}

// Append Elements
notepadContainer.appendChild(toolbar);
notepadContainer.appendChild(taskInput);
notepadContainer.appendChild(notepadArea);

// AI Panel
const aiContainer = document.createElement("div");
aiContainer.style.width = "45%";
aiContainer.style.minHeight = "400px";
aiContainer.style.border = "2px solid #ccc";
aiContainer.style.borderRadius = "8px";
aiContainer.style.padding = "12px";
aiContainer.style.backgroundColor = "#f9f9f9";
aiContainer.style.color = "#333";
aiContainer.innerText = "AI will generate insights here...";

// AI Button
const aiButton = document.createElement("button");
aiButton.innerText = "Ask AI for Help";
aiButton.style.padding = "10px";
aiButton.style.borderRadius = "5px";
aiButton.style.backgroundColor = "#ff9800";
aiButton.style.color = "white";
aiButton.addEventListener("click", fetchAIResponse);

// Append Everything to Body
const mainContainer = document.createElement("div");
mainContainer.style.display = "flex";
mainContainer.style.justifyContent = "space-between";
mainContainer.style.width = "100%";
mainContainer.appendChild(notepadContainer);
mainContainer.appendChild(aiContainer);
document.body.appendChild(loginContainer);
document.body.appendChild(mainContainer);
document.body.appendChild(aiButton);

// AI Function
async function fetchAIResponse() {
    aiContainer.innerText = "Thinking...";

    let tasks = [...notepadArea.querySelectorAll("span")]
        .map(task => task.innerText.trim())
        .filter(task => task !== "")
        .join("\n");

    if (!tasks) {
        aiContainer.innerText = "No tasks found.";
        return;
    }

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "mistral",
                prompt: `Here are my tasks:\n\n${tasks}\n\nGive me insights.`,
                stream: false
            })
        });

        const data = await response.json();
        aiContainer.innerText = data.response || "AI did not return a response.";
    } catch (error) {
        aiContainer.innerText = "Error connecting to AI.";
    }
}

// Logout Function
function logout() {
    currentUser = null;
    loginContainer.style.display = "flex";
    notepadContainer.style.display = "none";
}
