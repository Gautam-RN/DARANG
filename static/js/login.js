document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // ELEMENTS
    // ============================

    const roles = document.querySelectorAll(".role");

    const selectedRole =
        document.getElementById("selectedRole");

    const loginButton =
        document.querySelector(".login-button");

    const buttonText =
        document.getElementById("buttonText");

    const password =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginForm =
        document.getElementById("loginForm");

    const email =
        document.getElementById("email");


    console.log("login.js loaded");


    // ============================
    // ROLE SELECTION
    // ============================

    roles.forEach(function (role) {

        role.addEventListener("click", function () {

            // Remove active from all roles
            roles.forEach(function (item) {
                item.classList.remove("active");
            });

            // Activate selected role
            role.classList.add("active");

            // Get selected role
            const roleName =
                role.dataset.role;

            selectedRole.value =
                roleName;

            // Update button text
            const names = {
                student: "Student",
                industry: "Industry",
                faculty: "Faculty",
                institution: "Institution"
            };

            buttonText.textContent =
                `Continue as ${names[roleName]}`;

            console.log("Selected role:", roleName);
        });

    });


    // ============================
    // SHOW / HIDE PASSWORD
    // ============================

    togglePassword.addEventListener("click", function () {

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
    // LOGIN
    // ============================

    loginForm.addEventListener("submit", async function (event) {

        // VERY IMPORTANT
        // Prevent normal form submission/reload
        event.preventDefault();

        console.log("LOGIN FORM SUBMITTED");


        const emailValue =
            email.value.trim();

        const passwordValue =
            password.value;


        // ============================
        // VALIDATION
        // ============================

        if (!emailValue || !passwordValue) {

            alert("Please enter your email and password.");

            return;
        }


        // ============================
        // DISABLE BUTTON
        // ============================

        loginButton.disabled = true;

        loginButton.style.opacity = "0.7";

        buttonText.textContent =
            "Signing in...";


        // ============================
        // SEND TO FLASK
        // ============================

        const formData = new FormData();

        formData.append(
            "email",
            emailValue
        );

        formData.append(
            "password",
            passwordValue
        );


        try {

            console.log("Sending login request...");


            const response =
                await fetch("/login", {
                    method: "POST",
                    body: formData
                });


            console.log(
                "HTTP status:",
                response.status
            );


            const data =
                await response.json();


            console.log(
                "Server response:",
                data
            );


            // ============================
            // SUCCESS
            // ============================

            if (data.success) {

                buttonText.textContent =
                    "Login successful ✓";


                console.log(
                    "Redirecting to:",
                    data.redirect
                );


                window.location.href =
                    data.redirect;

                return;
            }


            // ============================
            // LOGIN FAILED
            // ============================

            alert(
                data.message ||
                "Login failed."
            );


            loginButton.disabled =
                false;

            loginButton.style.opacity =
                "1";


            buttonText.textContent =
                "Continue";


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            alert(
                "Could not connect to the server."
            );


            loginButton.disabled =
                false;

            loginButton.style.opacity =
                "1";


            buttonText.textContent =
                "Continue";


        }

    });

});

