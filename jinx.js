const password = "samihan1002";  // Set your password here

document.addEventListener('DOMContentLoaded', (event) => {
    // Load counts and last click times from localStorage
    if (localStorage.getItem('samihaCount')) {
        document.getElementById('samiha-count').textContent = localStorage.getItem('samihaCount');
    }
    if (localStorage.getItem('rihanCount')) {
        document.getElementById('rihan-count').textContent = localStorage.getItem('rihanCount');
    }
    if (localStorage.getItem('samihaLastClick')) {
        document.getElementById('samiha-last-click').textContent = localStorage.getItem('samihaLastClick');
    }
    if (localStorage.getItem('rihanLastClick')) {
        document.getElementById('rihan-last-click').textContent = localStorage.getItem('rihanLastClick');
    }
});

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
    
    let currentCount = parseInt(countElement.textContent, 10) || 0;
    currentCount++;
    
    countElement.textContent = currentCount;
    localStorage.setItem(`${name}Count`, currentCount);
    
    const now = new Date().toLocaleString();
    lastClickElement.textContent = now;
    localStorage.setItem(`${name}LastClick`, now);
}
