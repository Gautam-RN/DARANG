// EduSathi registration interactions


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

const registerForm =
    document.getElementById("registerForm");

const strengthBar =
    document.querySelector(".strength-bar span");

const strengthText =
    document.getElementById("strengthText");

const passwordError =
    document.getElementById("passwordError");


// ============================
// ROLE SELECTION
// ============================

roles.forEach(role => {

    role.addEventListener("click", () => {

        roles.forEach(item => {
            item.classList.remove("active");
        });

        role.classList.add("active");

        const roleName =
            role.dataset.role;

        selectedRole.value =
            roleName;


        const names = {

            student:
                "Student",

            industry:
                "Industry",

            academician:
                "Academician",

            institution:
                "Institution"
        };


        buttonText.textContent =
            `Create ${names[roleName]} Account`;

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
// PASSWORD STRENGTH
// ============================

password.addEventListener("input", () => {

    const value =
        password.value;

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


    const widths = [
        "0%",
        "25%",
        "50%",
        "75%",
        "100%"
    ];


    const labels = [

        "Use at least 8 characters",

        "Weak password",

        "Fair password",

        "Good password",

        "Strong password"
    ];


    strengthBar.style.width =
        widths[strength];

    strengthText.textContent =
        labels[strength];

});


// ============================
// PASSWORD MATCH
// ============================

confirmPassword.addEventListener("input", () => {

    if (
        confirmPassword.value &&
        confirmPassword.value !== password.value
    ) {

        passwordError.textContent =
            "Passwords do not match.";

    } else {

        passwordError.textContent =
            "";

    }

});


// ============================
// FORM SUBMISSION
// ============================

registerForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const passwordValue =
        password.value;

    const confirmValue =
        confirmPassword.value;


    // Password validation

    if (passwordValue !== confirmValue) {

        passwordError.textContent =
            "Passwords do not match.";

        return;

    }


    if (passwordValue.length < 8) {

        passwordError.textContent =
            "Password must contain at least 8 characters.";

        return;

    }


    const button =
        document.querySelector(".register-button");


    button.style.opacity =
        "0.7";

    button.style.pointerEvents =
        "none";


    buttonText.textContent =
        "Creating account...";


    /*
        TEMPORARY FRONTEND REGISTRATION

        Backend/database integration will
        be added later.
    */

    setTimeout(() => {

        window.location.href =
            "/login";

    }, 900);

});