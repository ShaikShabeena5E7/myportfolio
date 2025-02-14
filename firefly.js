const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFD700"];
let dots = [];
let numDots = window.innerWidth < 768 ? 50 : 100; // Reduce dots on small screens
let maxDistance = window.innerWidth < 768 ? 60 : 120; // Shorter connections on small screens

function createDots() {
    dots = [];
    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * (window.innerWidth < 768 ? 1 : 2), // Slower on mobile
            vy: (Math.random() - 0.5) * (window.innerWidth < 768 ? 1 : 2),
            radius: window.innerWidth < 768 ? 2 : 4, // Smaller dots on mobile
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
    }

    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            let dx = dots[i].x - dots[j].x;
            let dy = dots[i].y - dots[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = "rgba(255, 192, 203, 0.5)"; // Transparent pink
                ctx.lineWidth = 0.7; // Thinner lines for subtle effect
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

createDots();
draw();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    numDots = window.innerWidth < 768 ? 50 : 100; // Adjust number of dots dynamically
    maxDistance = window.innerWidth < 768 ? 60 : 120;
    createDots(); // Reinitialize dots on resize
});
