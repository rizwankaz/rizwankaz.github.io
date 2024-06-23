document.addEventListener('DOMContentLoaded', async (event) => {
    document.getElementById('counter').style.display = 'none';
});

async function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    try {
        const response = await fetch('http://2607:fb91:3215:5ae9:55da:628e:af47:a61f:3000/verify-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: inputPassword })
        });
        const data = await response.json();
        if (data.success) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('counter').style.display = 'flex';
            loadCounters();
        } else {
            alert("Incorrect password!");
        }
    } catch (error) {
        console.error("Error verifying password:", error);
        alert("Error verifying password. Please try again later.");
    }
}

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

        loadCounters();
    } catch (error) {
        console.error("Error updating counter:", error);
    }
}
