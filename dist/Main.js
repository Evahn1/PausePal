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

// Create the login image
const loginImage = document.createElement("img");
loginImage.src = "your-image-url-here"; // Replace with actual URL or file path
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

    // **Detect if task is empty and remove on Backspace**
    taskSpan.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && taskSpan.innerText.trim() === "") {
            e.preventDefault(); // Prevents extra Backspace behavior
            taskLine.remove(); // Deletes the entire task row
        }
    });

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
registerBtn.innerText = "Register";
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