const password = "samihan1002";  // Set your password here
let samihaCount = 0;
let rihanCount = 0;

function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    if (inputPassword === password) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('counter').style.display = 'flex';
    } else {
        alert("Incorrect password!");
    }
}

function incrementCounter(name) {
    const countElement = document.getElementById(`${name}-count`);
    const lastClickElement = document.getElementById(`${name}-last-click`);
    
    let currentCount;
    if (name === 'samiha') {
        currentCount = ++samihaCount;
    } else {
        currentCount = ++rihanCount;
    }
    
    countElement.textContent = currentCount;
    const now = new Date().toLocaleString();
    lastClickElement.textContent = now;
}
