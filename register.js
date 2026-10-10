document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('form-name_in');
    const emailInput = document.getElementById('form-em_in');
    const pass1Input = document.getElementById('form-ps1_in');
    const pass2Input = document.getElementById('form-ps2_in');
    const msgPar = document.getElementById('form-msg');

    document.getElementById('form-crt_acc_btn').addEventListener('click', async () => {
        msgPar.innerText = "";
        msgPar.style.color = "black";

        if (pass1Input.value !== pass2Input.value) { 
            msgPar.style.color = "red";
            msgPar.innerText = "Passwords do not match";
            return;
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput ? nameInput.value : "User",
                    email: emailInput.value,
                    password: pass1Input.value
                })
            });

            const data = await res.json();

            if (!res.ok) {
                msgPar.style.color = "red";
                msgPar.innerText = data.error || "Registration error";
                return;
            }

            msgPar.style.color = "green";
            msgPar.innerText = data.message || "Account created successfully!" + "You will be redirected to login.";

            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);

        } catch (err) {
            console.error(err);
            msgPar.style.color = "red";
            msgPar.innerText = "Server connection error";
        }
    });
});