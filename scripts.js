// Intro sequence elements
const introOverlay = document.getElementById('introOverlay');
const videoContainer = document.getElementById('videoContainer');
const introVideo = document.getElementById('introVideo');
const skipMessage = document.getElementById('skipMessage');
const mainContent = document.querySelector('.container');

// Hide main content initially
mainContent.style.display = 'none';

// Function to start the intro sequence
function startIntroSequence() {
    introOverlay.style.display = 'none';
    videoContainer.style.display = 'block';
    introVideo.play();
    
    // Show skip message after 1.5 seconds
    setTimeout(() => {
        skipMessage.style.display = 'block';
    }, 1500);
}

// Function to end the intro sequence
function endIntroSequence() {
    videoContainer.style.display = 'none';
    skipMessage.style.display = 'none';
    mainContent.style.display = 'block';
    playAudio(); // Start playing background music
}

// Click event to start the intro
introOverlay.addEventListener('click', startIntroSequence);

// Listen for ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoContainer.style.display === 'block') {
        introVideo.pause();
        endIntroSequence();
    }
});

// When video ends naturally
introVideo.addEventListener('ended', endIntroSequence);

// Get the modals
var modal = document.getElementById('aboutModal');
var modal2 = document.getElementById('aboutModal2');

// Get the buttons that open the modals
var btn = document.getElementById("openModalBtn");
var btn2 = document.getElementById("openModalBtn2");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

btn2.onclick = function() {
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

// Plays the shitty nostalgic cs nexon, v6, v7, online, background audio function
function playAudio() {
    var audio = document.getElementById('backgroundMusic');
    audio.volume = 0.47;  // Set the fucking volume to 47%
    audio.loop = true;    // Enable the fucking looping
    audio.play();
}

// Plays the fucking download audio function
function playdownloadAudio() {
    var audio = document.getElementById('downloadMusic');
    audio.volume = 0.47;  // Set volume to 47%
    audio.play();
}


// JavaScript for the snowy effect
const canvas = document.getElementById('snowfall');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

const snowflakeCount = 250;
const snowflakes = [];

for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        density: Math.random() * snowflakeCount
    });
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
    }
    ctx.fill();
}

let angle = 0;
function updateSnowflakes() {
    angle += 0.01;
    for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        flake.y += Math.pow(flake.density, 2) / 10000 + 1;
        flake.x += Math.sin(angle + flake.density) * 0.5;

        if (flake.y > canvas.height) {
            snowflakes[i] = {
                x: Math.random() * canvas.width,
                y: 0,
                radius: flake.radius,
                density: flake.density
            };
        }
    }
}

function gameLoop() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(gameLoop);
}

gameLoop();