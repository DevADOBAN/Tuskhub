document.addEventListener("DOMContentLoaded", () => {

    const API_URL = "http://127.0.0.1:5000/";

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const errorMessage = document.getElementById("error-message");

    function displayError(message) {
        console.error("Erro:", message);
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
        }
    }

    // === LOGIN === ///
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                displayError("Preencha todos os campos.");
                return;
            }

            try {
                const response = await fetch(`${API_URL}auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                let data = {};
                try {
                    data = await response.json();
                } catch {
                    displayError("Resposta inválida do servidor.");
                    return;
                }

                console.log("Login Response:", data);

                if (response.ok) {
                    // SALVA TOKEN CORRETAMENTE
                    localStorage.setItem("token", data.access_token);

                    // REDIRECIONA PARA AS TAREFAS
                    window.location.href = "tasks.html";
                } else {
                    displayError(data.message || "Credenciais inválidas.");
                }

            } catch (error) {
                console.error(error);
                displayError("Erro ao conectar com o servidor.");
            }
        });
    }

    // === CADASTRO === //
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!name || !email || !password) {
                displayError("Preencha todos os campos.");
                return;
            }

            try {
                const response = await fetch(`${API_URL}auth/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });

                let data = {};
                try {
                    data = await response.json();
                } catch {
                    displayError("Resposta inválida do servidor.");
                    return;
                }

                console.log("Signup Response:", data);

                if (response.status === 201) {
                    alert("Usuário criado com sucesso! Faça login.");
                    window.location.href = "login.html";
                } else {
                    displayError(data.message || "Erro ao cadastrar.");
                }

            } catch (error) {
                console.error(error);
                displayError("Erro ao conectar com o servidor.");
            }
        });
    }
});

