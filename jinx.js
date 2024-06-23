const password = "samihan1002";  // Set your password here

document.addEventListener('DOMContentLoaded', async (event) => {
    document.getElementById('counter').style.display = 'none';
});

async function loadCounters() {
    try {
        const response = await fetch('http://localhost:3000/counters');
        const counters = await response.json();
        counters.forEach(counter => {
            document.getElementById(`${counter.name}-count`).textContent = counter.count;
            document.getElementById(`${counter.name}-last-click`).textContent = counter.lastClick;
        });
    } catch (error) {
        console.error("Error loading counters:", error);
    }
}

function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    if (inputPassword === password) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('counter').style.display = 'flex';
        loadCounters();  // Load the counters only after a successful login
    } else {
        alert("Incorrect password!");
    }
}

async function incrementCounter(name) {
    const countElement = document.getElementById(`${name}-count`);
    const lastClickElement = document.getElementById(`${name}-last-click`);
    
    let currentCount = parseInt(countElement.textContent, 10) || 0;
    currentCount++;
    
    countElement.textContent = currentCount;
    
    const now = new Date().toLocaleString();
    lastClickElement.textContent = now;

    try {
        await fetch('http://localhost:3000/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, count: currentCount, lastClick: now })
        });
    } catch (error) {
        console.error("Error updating counter:", error);
    }
}
