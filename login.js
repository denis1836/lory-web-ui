document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('form-em_in');
    const pass1Input = document.getElementById('form-ps_in');
    const msgPar = document.getElementById('form-msg');

    document.getElementById('form-login_btn').addEventListener('click', async () => {
        msgPar.innerText = "";
        msgPar.style.color = "black";

        if (pass1Input.value == "" || emailInput.value == "") { 
            msgPar.style.color = "red";
            msgPar.innerText = "Fields cannot be empty";
            return;
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: pass1Input.value
                })
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data.error)
                msgPar.style.color = "red";
                msgPar.innerText = data.error || "Login error";
                return;
            }

            msgPar.style.color = "green";
            msgPar.innerText = data.message || "Logged in successfully";
        } catch (err) {
            console.error(err);
            msgPar.style.color = "red";
            msgPar.innerText = "Server connection error";
        }
    });
});