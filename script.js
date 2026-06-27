// ==========================
// QUESTIONS & MESSAGES
// ==========================

const questions = [
    "Have you ever started a match confidently and died in the first minute?",
    "Are you secretly the biggest noob in the guild? 🤣",
    "Have you ever said 'rush' and then stayed behind?",
    "Have you ever stolen a teammate's kills?",
    "Have you ever stolen a teammate's loot?",
    "Have you ever used a teammate as bait?"
];

const noMessages = [
    "Are you sure? 🤨",
    "Think again 😂",
    "The guild knows the truth 😏",
    "Nice try 🤣",
    "Stop lying to yourself! 🤥",
    "We have replays! 🎥",
    "Just click YES already... 🙄"
];

// ==========================
// STATE VARIABLES
// ==========================

let currentQuestion = 0;
let noClicks = 0;
let yesScale = 1;
let noScale = 1;
let lotusTaps = 0;
let isMusicPlaying = false;

// ==========================
// DOM ELEMENTS
// ==========================

const questionText = document.getElementById("question-text");
const funnyText = document.getElementById("funny-text");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const qCard = document.getElementById("q-card");
const checkOverlay = document.getElementById("check-overlay");

// ==========================
// INITIALIZE
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    questionText.textContent = questions[0];
});

// ==========================
// MUSIC CONTROL
// ==========================

function toggleMusic() {
    const audio = document.getElementById("bg-music");
    const toggleBtn = document.getElementById("music-toggle");

    if (isMusicPlaying) {
        audio.pause();
        toggleBtn.textContent = "🔇";
    } else {
        audio.play().catch(() => {
            console.log("Autoplay blocked");
        });
        toggleBtn.textContent = "🔊";
    }

    isMusicPlaying = !isMusicPlaying;
}

// ==========================
// NO BUTTON
// ==========================

function handleNo() {
    noClicks++;

    qCard.classList.remove("shake");
    void qCard.offsetWidth;
    qCard.classList.add("shake");

    noScale *= 0.8;
    yesScale += 0.15;

    btnNo.style.transform = `scale(${noScale})`;
    btnYes.style.transform = `scale(${yesScale})`;

    funnyText.textContent =
        noMessages[Math.floor(Math.random() * noMessages.length)];

    if (noClicks >= 6) {
        btnNo.style.display = "none";
        funnyText.textContent = "No escape now! 😆";
    }
}

// ==========================
// YES BUTTON
// ==========================

function handleYes() {
    checkOverlay.classList.add("active");

    setTimeout(() => {
        checkOverlay.classList.remove("active");

        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadNextQuestion();
        } else {
            startCompletionSequence();
        }
    }, 800);
}

function loadNextQuestion() {
    questionText.textContent = questions[currentQuestion];

    noClicks = 0;
    yesScale = 1;
    noScale = 1;

    btnYes.style.transform = "scale(1)";
    btnNo.style.transform = "scale(1)";
    btnNo.style.display = "block";

    funnyText.textContent = "";
}

// ==========================
// SCREEN TRANSITION
// ==========================

function startCompletionSequence() {
    const questionScreen = document.getElementById("question-screen");
    const lotusScreen = document.getElementById("lotus-screen");

    questionScreen.classList.remove("active");

    setTimeout(() => {
        questionScreen.style.display = "none";
        lotusScreen.style.display = "flex";

        setTimeout(() => {
            lotusScreen.classList.add("active");
            createLotusPetals();
        }, 50);
    }, 1000);
}

// ==========================
// LOTUS CREATION
// ==========================

function createLotusPetals() {
    const lotus = document.getElementById("lotus");

    for (let i = 1; i <= 7; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = `petal-wrapper pw-${i}`;
        wrapper.id = `pw-${i}`;

        const petal = document.createElement("div");
        petal.className = "petal";

        wrapper.appendChild(petal);
        lotus.appendChild(wrapper);
    }
}

// ==========================
// LOTUS TAP
// ==========================

function tapLotus(event) {
    lotusTaps++;

    createSparkles(event);

    const pw1 = document.getElementById("pw-1");
    const pw2 = document.getElementById("pw-2");
    const pw3 = document.getElementById("pw-3");
    const pw4 = document.getElementById("pw-4");
    const pw5 = document.getElementById("pw-5");
    const pw6 = document.getElementById("pw-6");
    const pw7 = document.getElementById("pw-7");

    switch (lotusTaps) {

        case 1:
            pw2.style.transform = "rotate(-20deg) scale(0.6)";
            pw3.style.transform = "rotate(20deg) scale(0.6)";
            pw1.style.transform = "scale(0.7)";
            break;

        case 2:
            pw4.style.transform = "rotate(-40deg) scale(0.7)";
            pw5.style.transform = "rotate(40deg) scale(0.7)";
            break;

        case 3:
            pw6.style.transform = "rotate(-60deg) scale(0.7)";
            pw7.style.transform = "rotate(60deg) scale(0.7)";
            pw1.style.transform = "scale(0.9)";
            break;

        case 4:
            pw6.style.transform = "rotate(-75deg) scale(0.8)";
            pw7.style.transform = "rotate(75deg) scale(0.8)";
            break;

        case 5:
            pw6.style.transform = "rotate(-90deg) scale(0.9)";
            pw7.style.transform = "rotate(90deg) scale(0.9)";
            pw1.style.transform = "scale(1.1)";

            document.body.classList.add("magical-bg");

            document.getElementById("lotus-text").textContent =
                "✨ Magic Unlocked! ✨";

            setTimeout(revealFinalMessage, 1500);
            break;
    }
}

// ==========================
// SPARKLES
// ==========================

function createSparkles(event) {
    const lotus = document.getElementById("lotus");
    const rect = lotus.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < 5; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left =
            `${x + (Math.random() - 0.5) * 80}px`;

        sparkle.style.top =
            `${y + (Math.random() - 0.5) * 80}px`;

        lotus.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
}

// ==========================
// FINAL SCREEN
// ==========================

function revealFinalMessage() {

    const lotusScreen = document.getElementById("lotus-screen");
    const finalScreen = document.getElementById("final-screen");

    lotusScreen.classList.remove("active");

    setTimeout(() => {

        lotusScreen.style.display = "none";
        finalScreen.style.display = "flex";

        setTimeout(() => {

            finalScreen.classList.add("active");
            fireConfetti();
            startFloatingPetals();

        }, 10);

    }, 300);
}

// ==========================
// CONFETTI
// ==========================

function fireConfetti() {

    if (typeof confetti !== "function") return;

    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.3 }
    });
}

// ==========================
// FLOATING PETALS
// ==========================

function startFloatingPetals() {

    for (let i = 0; i < 8; i++) {

        const petal = document.createElement("div");

        petal.className = "floating-petal";

        petal.style.left = `${Math.random() * 90}%`;

        document.body.appendChild(petal);

        setTimeout(() => petal.remove(), 12000);
    }
      }
