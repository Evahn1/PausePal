/*
// Create the button

const button = document.createElement('button');
button.innerText = 'Click me!';
button.id = 'mainButton';

// Add an event listener to the button
button.addEventListener('click', () => {
    alert('Good boy!');
});

// Append the button to the body
document.body.appendChild(button);


// Create the container to hold the textbox
const container = document.createElement("div");
container.id = "inputContainer";
document.body.appendChild(container);

// Create a textbox
const textBox = document.createElement("input");
textBox.type = "text";
textBox.id = "userInput";
textBox.placeholder = "Enter social security number";
//Event listener for enter key
textBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        alert(`Sending this to DeepSeek: ${textBox.value}`);
    }
})
textBox.style.width = "300px"; // Set the width
textBox.style.height = "40px"; // Set the height
textBox.style.fontSize = "20px"; // Increase the font size for better visibility




// Create a button to log the input
const logButton = document.createElement("button");
logButton.type = "button";
logButton.id = "submitButton";
logButton.innerText = "Submit";

//How button works
logButton.addEventListener("click", () => {
    const userInput = document.getElementById('userInput').value;
    console.log(`userInput: ${userInput}`);
    alert(`Sending to China: ${userInput}`);
})

container.appendChild(textBox);
//container.appendChild(logButton);

*/

// Create a container for the notepad
const notepadContainer = document.createElement("div");

// Create a label for the notepad
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


// Load saved notes from localStorage
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

// Hover effect
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

// Hover effect
saveButton.addEventListener("mouseover", () => {
    saveButton.style.opacity = "0.8";
});
saveButton.addEventListener("mouseout", () => {
    saveButton.style.opacity = "1";
});

saveButton.addEventListener("click", () => {
    const notes = textArea.value;

    fetch('http://localhost:3000/saveNotes', {
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



// Append elements to the container
notepadContainer.append(logOutButton);
notepadContainer.appendChild(textArea);
notepadContainer.appendChild(label);
notepadContainer.appendChild(saveButton);

// Container for login screen
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

// Username Input
const usernameInput = document.createElement("input");
usernameInput.type = "text";
usernameInput.placeholder = "Enter username";
usernameInput.style.fontSize = "16px";
usernameInput.style.padding = "10px";
usernameInput.style.border = "1px solid #ccc";
usernameInput.style.borderRadius = "5px";
usernameInput.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

// Password Input
const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "Enter password";
passwordInput.style.fontSize = "16px";
passwordInput.style.padding = "10px";
passwordInput.style.borderRadius = "5px";
passwordInput.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
passwordInput.style.border = "1px solid #ccc";

// Login button
const loginButton = document.createElement("button");
loginButton.innerText = "Login";
loginButton.style.padding = "10px";
loginButton.style.fontSize = "16px";
loginButton.style.border = "none";
loginButton.style.borderRadius = "5px";
loginButton.style.backgroundColor = "#007bff";
loginButton.style.color = "white";
loginButton.style.cursor = "pointer";

// Register button
const registerButton = document.createElement("button");
registerButton.innerText = "Register";
registerButton.style.padding = "10px";
registerButton.style.fontSize = "16px";
registerButton.style.border = "none";
registerButton.style.borderRadius = "5px";
registerButton.style.backgroundColor = "#28a745";
registerButton.style.color = "white";
registerButton.style.cursor = "pointer";

// Event listener for login button
loginButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const isLoggedIn = await login(username, password);
    if (isLoggedIn) {
        currentUser = username; // Store username globally

        // Load user's saved notes
        fetch('http://localhost:3000/loadNotes', {
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
    } else {
    }
});




// Event listener for register button
registerButton.addEventListener("click", () => {
    register(usernameInput.value, passwordInput.value);
});

// Append elements to the container
loginContainer.appendChild(usernameInput);
loginContainer.appendChild(passwordInput);
loginContainer.appendChild(loginButton);
loginContainer.appendChild(registerButton);

document.body.appendChild(loginContainer);


function loadTaskManager() {
    document.body.innerHTML = "";
    const heading = document.createElement("h1");
    heading.innerText = "Task Manager";
//Append notepad container to body
    document.body.appendChild(notepadContainer);

}

function logout(){
    document.body.innerHTML = "";
    document.body.appendChild(loginContainer);
}

function register(username, password) {
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => {
            console.error('Registration failed:', error);
            alert('Registration failed. Check console for details.');
        });
}




function login(username, password) {
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    })
        .then(response => response.text()) // Get the response text
        .then(data => {
            if (data === "Login successful!") {
                usernameInput.value = "";
                passwordInput.value = "";
                return true; // Resolve promise with true for successful login
            } else {
                alert(data); // Show error message
                return false; // Resolve promise with false for failed login
            }
        })
        .catch(err => {
            console.error("Login request failed:", err);
            return false; // Return false in case of error
        });
}










