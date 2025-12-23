let startTime = null;
let elapsed = 0;
let timer = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const statusText = document.getElementById("status");
const sound = document.getElementById("clickSound");

function playClick() {
    sound.currentTime = 0;
    sound.play();
}

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(value) {
    return value.toString().padStart(2, "0");
}

function updateDisplay() {
    elapsed = Date.now() - startTime;
    display.textContent = formatTime(elapsed);
}

document.getElementById("startBtn").addEventListener("click", () => {
    playClick();
    if (!timer) {
        startTime = Date.now() - elapsed;
        timer = setInterval(updateDisplay, 10);
        statusText.textContent = "Running";
    }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    playClick();
    clearInterval(timer);
    timer = null;
    statusText.textContent = "Paused";
});

document.getElementById("resetBtn").addEventListener("click", () => {
    playClick();
    clearInterval(timer);
    timer = null;
    elapsed = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
    statusText.textContent = "Ready";
});

document.getElementById("lapBtn").addEventListener("click", () => {
    playClick();
    if (elapsed > 0) {
        const li = document.createElement("li");
        li.textContent = formatTime(elapsed);
        laps.appendChild(li);
    }
});

document.getElementById("clearLaps").addEventListener("click", () => {
    playClick();
    laps.innerHTML = "";
});

document.getElementById("themeToggle").addEventListener("click", () => {
    playClick();
    document.body.classList.toggle("light");
});
