const roles = document.querySelectorAll(".role");

const selectedRole =
    document.getElementById("selectedRole");

const loginButton =
    document.querySelector(".login-button span");

const password =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const loginForm =
    document.getElementById("loginForm");


// ============================
// ROLE SELECTION
// ============================

roles.forEach(role => {

    role.addEventListener("click", () => {

        // Remove active state
        roles.forEach(item => {
            item.classList.remove("active");
        });

        // Activate selected role
        role.classList.add("active");

        // Get role
        const roleName =
            role.dataset.role;

        selectedRole.value =
            roleName;

        // Update button
        const names = {
            student: "Student",
            industry: "Industry",
            academician: "Academician",
            institution: "Institution"
        };

        loginButton.textContent =
            `Continue as ${names[roleName]}`;
    });

});


// ============================
// SHOW / HIDE PASSWORD
// ============================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent =
            "Hide";

    } else {

        password.type = "password";

        togglePassword.textContent =
            "Show";
    }

});


// ============================
// FORM SUBMISSION
// ============================

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const passwordValue =
        password.value;

    const role =
        selectedRole.value;


    if (!email || !passwordValue) {
        return;
    }


    /*
        TEMPORARY FRONTEND LOGIN

        Backend authentication will be
        connected later.

        For now we redirect users to
        the appropriate dashboard.
    */

    const dashboards = {

        student:
            "/student/dashboard",

        industry:
            "/industry/dashboard",

        academician:
            "/academician/dashboard",

        institution:
            "/institution/dashboard"
    };


    const button =
        document.querySelector(".login-button");

    button.style.opacity = "0.7";

    loginButton.textContent =
        "Signing in...";


    setTimeout(() => {

        window.location.href =
            dashboards[role];

    }, 700);

});