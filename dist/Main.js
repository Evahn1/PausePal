// ============
// Global Variables
// ============
let currentUser = null;

// ============
// Task Manager / Notepad Screen
// ============
const notepadContainer = document.createElement("div");

// Label for the notepad (optional)
const label = document.createElement("label");
label.htmlFor = "notepad";

// Create the text area
const textArea = document.createElement("textarea");
textArea.id = "notepad";
textArea.placeholder = "Start Typing Here...";
textArea.style.width = "600px"; // Slightly wider for better usability
textArea.style.height = "400px"; // Balanced height
textArea.style.fontFamily = "Arial, sans-serif";
textArea.style.fontSize = "16px";
textArea.style.padding = "12px";
textArea.style.border = "2px solid #ccc"; // Subtle border
textArea.style.borderRadius = "8px"; // Rounded corners
textArea.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.1)"; // Soft shadow
textArea.style.resize = "none"; // Prevents manual resizing
textArea.style.outline = "none"; // Removes default focus outline
textArea.style.backgroundColor = "#f9f9f9"; // Light background for readability
textArea.style.color = "#333"; // Dark text for contrast

// Add focus effect
textArea.addEventListener("focus", () => {
    textArea.style.border = "2px solid #007bff"; // Highlight when active
});
textArea.addEventListener("blur", () => {
    textArea.style.border = "2px solid #ccc"; // Revert when not active
});

// Load saved notes from localStorage (if desired)
textArea.value = localStorage.getItem("savedNotes") || "";

// Log Out Button
const logOutButton = document.createElement("button");
logOutButton.id = "logOut";
logOutButton.innerText = "Logout";
logOutButton.style.position = "absolute";
logOutButton.style.top = "10px";
logOutButton.style.left = "10px";
logOutButton.style.width = "100px"; // Match Save button's width
logOutButton.style.height = "40px"; // Match Save button's height
logOutButton.style.fontSize = "16px";
logOutButton.style.border = "none";
logOutButton.style.borderRadius = "5px"; // Rounded edges
logOutButton.style.backgroundColor = "#dc3545"; // Red color for logout
logOutButton.style.color = "white"; // White text
logOutButton.style.cursor = "pointer";
logOutButton.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)"; // Subtle shadow
logOutButton.style.transition = "0.3s"; // Smooth transition effect

// Hover effect for Logout button
logOutButton.addEventListener("mouseover", () => {
    logOutButton.style.opacity = "0.8";
});
logOutButton.addEventListener("mouseout", () => {
    logOutButton.style.opacity = "1";
});

// Click event to log out
logOutButton.addEventListener("click", () => {
    logout(); // Call the logout function
});

// Save Button
const saveButton = document.createElement("button");
saveButton.innerText = "Save";
saveButton.style.marginTop = "10px";
saveButton.style.position = "absolute";
saveButton.style.right = "25px";
saveButton.style.top = "10px";
saveButton.style.width = "100px"; // Set a uniform width
saveButton.style.height = "40px"; // Set a uniform height
saveButton.style.fontSize = "16px";
saveButton.style.border = "none";
saveButton.style.borderRadius = "5px";
saveButton.style.backgroundColor = "#007bff"; // Nice blue color
saveButton.style.color = "white";
saveButton.style.cursor = "pointer";
saveButton.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
saveButton.style.transition = "0.3s";

// Hover effect for Save button
saveButton.addEventListener("mouseover", () => {
    saveButton.style.opacity = "0.8";
});
saveButton.addEventListener("mouseout", () => {
    saveButton.style.opacity = "1";
});

// Save notes on click
saveButton.addEventListener("click", () => {
    const notes = textArea.value;

    fetch('https://pausepal.onrender.com/saveNotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser, notes }) // Send username + notes
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(err => {
            console.error("Failed to save notes:", err);
            alert("Failed to save notes.");
        });
});

// Append elements to the notepad container
notepadContainer.append(logOutButton);
notepadContainer.appendChild(textArea);
notepadContainer.appendChild(label);
notepadContainer.appendChild(saveButton);

// ============
// Login Screen Container
// ============
const loginContainer = document.createElement("div");
loginContainer.style.width = "300px";
loginContainer.style.margin = "100px auto"; // Center the container
loginContainer.style.padding = "20px";
loginContainer.style.border = "1px solid #ccc";
loginContainer.style.borderRadius = "10px";
loginContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
loginContainer.style.display = "flex";
loginContainer.style.flexDirection = "column";
loginContainer.style.gap = "10px";

// Username Input for Login
const usernameInput = document.createElement("input");
usernameInput.type = "text";
usernameInput.placeholder = "Enter username";
usernameInput.style.fontSize = "16px";
usernameInput.style.padding = "10px";
usernameInput.style.border = "1px solid #ccc";
usernameInput.style.borderRadius = "5px";
usernameInput.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

// Password Input for Login
const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "Enter password";
passwordInput.style.fontSize = "16px";
passwordInput.style.padding = "10px";
passwordInput.style.border = "1px solid #ccc";
passwordInput.style.borderRadius = "5px";
passwordInput.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

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
loginContainer.appendChild(usernameInput);
loginContainer.appendChild(passwordInput);
loginContainer.appendChild(loginBtn);
loginContainer.appendChild(goToRegisterButton);

// ============
// Registration Screen Container
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
// Hide registration screen by default
registerContainer.style.display = "none";

// Email Input for Registration
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "Enter email address";
emailInput.style.fontSize = "16px";
emailInput.style.padding = "10px";
emailInput.style.border = "1px solid #ccc";
emailInput.style.borderRadius = "5px";

// Username Input for Registration
const regUsernameInput = document.createElement("input");
regUsernameInput.type = "text";
regUsernameInput.placeholder = "Enter username";
regUsernameInput.style.fontSize = "16px";
regUsernameInput.style.padding = "10px";
regUsernameInput.style.border = "1px solid #ccc";
regUsernameInput.style.borderRadius = "5px";

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
registerContainer.appendChild(regUsernameInput);
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
    const username = usernameInput.value;
    const password = passwordInput.value;

    const isLoggedIn = await login(username, password);
    if (isLoggedIn) {
        currentUser = username; // Store username globally

        // Load user's saved notes from backend
        fetch('https://pausepal.onrender.com/loadNotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        })
            .then(response => response.text())
            .then(notes => {
                textArea.value = notes; // Set notes in the text area
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
    const username = regUsernameInput.value;
    const password = regPasswordInput.value;

    // Optional: Validate fields here

    register(username, password, email);

});

// ----- Back to Login from Registration Screen -----
backToLoginButton.addEventListener("click", () => {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

// ----- Load Task Manager Screen -----
function loadTaskManager() {
    document.body.innerHTML = ""; // Clear the body
    document.body.appendChild(notepadContainer);
}

// ----- Logout Function -----
function logout() {
    document.body.innerHTML = "";
    // Reset fields if needed
    usernameInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";
    regUsernameInput.value = "";
    regPasswordInput.value = "";
    document.body.appendChild(loginContainer);
    // Optionally, clear currentUser
    currentUser = null;
}

// ----- Registration Function -----
function register(username, password, email) {
    // Send both username and email to the backend for registration
    fetch('https://pausepal.onrender.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => {
            console.error('Registration failed:', error);
            alert('Registration failed. Check console for details.');
        });
}

// ----- Login Function -----
function login(username, password) {
    return fetch('https://pausepal.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.text())
        .then(data => {
            if (data === "Login successful!") {
                // Clear input fields
                usernameInput.value = "";
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
