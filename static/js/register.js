// ==========================================
// EDU SATHI REGISTRATION
// ==========================================


// Elements
const registerForm =
    document.getElementById("registerForm");

const roles =
    document.querySelectorAll(".role");

const selectedRole =
    document.getElementById("selectedRole");

const buttonText =
    document.getElementById("buttonText");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const passwordError =
    document.getElementById("passwordError");

const strengthText =
    document.getElementById("strengthText");

const strengthBar =
    document.querySelector(".strength-bar span");


// ==========================================
// ROLE SELECTION
// ==========================================

roles.forEach(role => {

    role.addEventListener("click", () => {

        // Remove active state
        roles.forEach(item => {
            item.classList.remove("active");
        });

        // Add active state
        role.classList.add("active");

        // Get selected role
        const roleValue =
            role.dataset.role;

        // Store selected role
        selectedRole.value = roleValue;

        // Update button text

        const roleNames = {
            ST: "Student",
            FC: "Faculty",
            IN: "Institution",
            ID: "Industry"
        };

        buttonText.textContent =
            `Create ${roleNames[roleValue]} Account`;
    });

});


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "Hide";

    } else {

        password.type = "password";

        togglePassword.textContent = "Show";
    }

});


// ==========================================
// PASSWORD STRENGTH
// ==========================================

password.addEventListener("input", () => {

    const value = password.value;

    let strength = 0;

    if (value.length >= 8) {
        strength++;
    }

    if (/[A-Z]/.test(value)) {
        strength++;
    }

    if (/[0-9]/.test(value)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(value)) {
        strength++;
    }


    if (value.length === 0) {

        strengthText.textContent =
            "Use at least 8 characters";

        strengthBar.style.width = "0%";

    }

    else if (strength === 1) {

        strengthText.textContent =
            "Weak password";

        strengthBar.style.width = "25%";

    }

    else if (strength === 2) {

        strengthText.textContent =
            "Fair password";

        strengthBar.style.width = "50%";

    }

    else if (strength === 3) {

        strengthText.textContent =
            "Good password";

        strengthBar.style.width = "75%";

    }

    else {

        strengthText.textContent =
            "Strong password";

        strengthBar.style.width = "100%";
    }

});


// ==========================================
// CONFIRM PASSWORD
// ==========================================

confirmPassword.addEventListener("input", () => {

    if (confirmPassword.value !== password.value) {

        passwordError.textContent =
            "Passwords do not match.";

    } else {

        passwordError.textContent = "";
    }

});


// ==========================================
// FORM SUBMISSION
// ==========================================

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    // Check password

    if (password.value !== confirmPassword.value) {

        passwordError.textContent =
            "Passwords do not match.";

        return;
    }


    // Check password length

    if (password.value.length < 8) {

        passwordError.textContent =
            "Password must contain at least 8 characters.";

        return;
    }


    // Disable button

    const submitButton =
        registerForm.querySelector(".register-button");

    submitButton.disabled = true;

    buttonText.textContent =
        "Creating account...";


    // Get form data

    const formData =
        new FormData(registerForm);


    try {

        const response =
            await fetch("/auth", {
                method: "POST",
                body: formData
            });


        const data =
            await response.json();


        // ==================================
        // SUCCESS
        // ==================================

        if (response.ok && data.success) {

            buttonText.textContent =
                "Account created ✓";


            // Redirect to login

            setTimeout(() => {

                window.location.href =
                    "/login";

            }, 1000);


            return;
        }


        // ==================================
        // ERROR
        // ==================================

        alert(data.message || "Registration failed.");

        submitButton.disabled = false;

        buttonText.textContent =
            "Create Account";


    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong. Please try again."
        );

        submitButton.disabled = false;

        buttonText.textContent =
            "Create Account";
    }

});