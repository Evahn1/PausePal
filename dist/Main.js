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

// ----- Registration Container -----
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

// Registration Inputs
const registerEmailInput = document.createElement("input");
registerEmailInput.type = "email";
registerEmailInput.placeholder = "Enter email";
registerEmailInput.style.padding = "10px";

const registerPasswordInput = document.createElement("input");
registerPasswordInput.type = "password";
registerPasswordInput.placeholder = "Enter password";
registerPasswordInput.style.padding = "10px";

// Register Button (Fixed!)
const registerBtn = document.createElement("button");
registerBtn.innerText = "Register";
registerBtn.style.padding = "10px";
registerBtn.style.backgroundColor = "#28a745";
registerBtn.style.color = "white";

// Back to Login Button
const backToLoginBtn = document.createElement("button");
backToLoginBtn.innerText = "Back to Login";
backToLoginBtn.style.padding = "10px";
backToLoginBtn.style.backgroundColor = "#6c757d";
backToLoginBtn.style.color = "white";

// Append to Register Container
registerContainer.appendChild(registerEmailInput);
registerContainer.appendChild(registerPasswordInput);
registerContainer.appendChild(registerBtn);
registerContainer.appendChild(backToLoginBtn);

// ----- Notepad / Task Editor Container -----
const notepadContainer = document.createElement("div");
notepadContainer.id = "notepadContainer";
notepadContainer.style.width = "50%";
notepadContainer.style.minHeight = "80vh";
notepadContainer.style.borderRadius = "8px";
notepadContainer.style.padding = "20px";
notepadContainer.style.display = "none";
notepadContainer.style.flexDirection = "column";
notepadContainer.style.alignItems = "flex-start"; // Align left

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

// Append elements to Notepad Container
notepadContainer.appendChild(toolbar);

// ----- Append Containers to Body -----
document.body.appendChild(loginContainer);
document.body.appendChild(registerContainer);
document.body.appendChild(notepadContainer);

// ==========================
// Event Listeners for Login/Register
// ==========================
loginBtn.addEventListener("click", async () => {
    currentUser = loginEmailInput.value;
    loadTaskEditor();
});

goToRegisterBtn.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registerContainer.style.display = "flex";
});

registerBtn.addEventListener("click", () => {
    register(registerEmailInput.value, registerPasswordInput.value);
});

backToLoginBtn.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

// ==========================
// View Loading Functions
// ==========================
function loadTaskEditor() {
    loginContainer.style.display = "none";
    registerContainer.style.display = "none";
    notepadContainer.style.display = "flex";
}

function logout() {
    currentUser = null;
    loginContainer.style.display = "flex";
    registerContainer.style.display = "none";
    notepadContainer.style.display = "none";
}

// ==========================
// Register & Save Notes Functions
// ==========================
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
        .catch(() => alert("Registration failed."));
}

function saveNotes() {
    fetch('https://pausepal.onrender.com/saveNotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser, notes: notepadContainer.innerHTML })
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(() => alert("Failed to save notes."));
}
