async function checkHealth() {
    const el = document.getElementById('db_health_text');

    try {
        const res = await fetch('/api/health');
        const data = await res.json();

        el.innerText = data.dbhealth;

        el.style.color = data.dbhealth ? 'green' : 'red';
    } catch(err) {
        el.innerText = 'error fetching db health: ' + err;
        el.style.color = 'red';
    }
}

document.addEventListener('DOMContentLoaded', checkHealth);

setInterval(checkHealth, 10000);
