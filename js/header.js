
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username") || "User";

    const loginBtn = document.querySelector(".nav-login");
    const registerBtn = document.querySelector(".nav-register");

    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = "none";
        if (registerBtn) registerBtn.style.display = "none";
    }

    const authContainer = document.createElement("div");
    authContainer.className = "nav-auth-container";

    if (isLoggedIn) {
        const welcomeText = document.createElement("span");
        welcomeText.classList.add("nav-welcome");
        welcomeText.textContent = `Welcome, ${username}`;

        const logoutBtn = document.createElement("button");
        logoutBtn.classList.add("nav-logout");
        logoutBtn.textContent = "Logout";
        logoutBtn.onclick = () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            location.reload();
        };

        authContainer.appendChild(welcomeText);
        authContainer.appendChild(logoutBtn);
    } else {
        if (loginBtn) authContainer.appendChild(loginBtn);
        if (registerBtn) authContainer.appendChild(registerBtn);
    }

    const nav = document.querySelector("nav");
    if (nav) {
        nav.appendChild(authContainer);
    }
});
