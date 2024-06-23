document.addEventListener('DOMContentLoaded', async (event) => {
    document.getElementById('counter').style.display = 'none';
});

async function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:3000/verify-password', {
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
            loadCounters();  // Load the counters only after a successful login
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

        // Check for jinx condition after loading counters
        checkJinx(counters);
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

        // After incrementing, reload counters and check for jinx condition
        loadCounters();
    } catch (error) {
        console.error("Error updating counter:", error);
    }
}

function checkJinx(counters) {
    const samihaCount = parseInt(counters.find(counter => counter.name === 'Samiha').count, 10);
    const rihanCount = parseInt(counters.find(counter => counter.name === 'Rihan').count, 10);

    if (samihaCount === rihanCount && samihaCount > 0 && rihanCount > 0) {
        // Display "JINX" in bold
        const jinxElement = document.getElementById('jinx');
        jinxElement.style.fontWeight = 'bold';
        jinxElement.textContent = 'JINX';
    } else {
        // Reset style and content if not jinxed
        const jinxElement = document.getElementById('jinx');
        jinxElement.style.fontWeight = 'normal';
        jinxElement.textContent = '';
    }
}
