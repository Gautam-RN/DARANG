// DARANG homepage interactions

const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const cursorGlow = document.querySelector(".cursor-glow");

// Sticky glass navbar
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// Mobile menu
menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// Cursor glow on desktop
if (window.matchMedia("(pointer:fine)").matches && cursorGlow) {
    window.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}

// Reveal elements when they enter the viewport
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay =
                `${Math.min(index * 70, 280)}ms`;

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
});

// Animated percentage counters
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const duration = 1300;

        const start = performance.now();

        function tick(now) {

            const progress = Math.min(
                (now - start) / duration,
                1
            );

            // Ease-out animation
            const eased = 1 - Math.pow(1 - progress, 3);

            counter.textContent =
                Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);

        counterObserver.unobserve(counter);
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Animate career readiness score
const score = document.getElementById("score");

if (score) {

    let value = 0;
    const target = 78;

    const timer = setInterval(() => {

        value += 2;

        score.textContent =
            Math.min(value, target);

        if (value >= target) {
            clearInterval(timer);
        }

    }, 22);
}

// Subtle 3D movement for dashboard card
const dashboard = document.querySelector(".dashboard-card");

if (
    dashboard &&
    window.matchMedia("(pointer:fine)").matches
) {

    dashboard.addEventListener("mousemove", (e) => {

        const rect =
            dashboard.getBoundingClientRect();

        const x =
            (e.clientX - rect.left) /
            rect.width - 0.5;

        const y =
            (e.clientY - rect.top) /
            rect.height - 0.5;

        dashboard.style.transform =
            `perspective(1000px)
             rotateY(${x * 8 - 5}deg)
             rotateX(${y * -5 + 2}deg)`;
    });

    dashboard.addEventListener("mouseleave", () => {

        dashboard.style.transform =
            "perspective(1000px) rotateY(-5deg) rotateX(2deg)";
    });
}