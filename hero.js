document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.querySelector(".bounce-text");
    const texts = JSON.parse(textElement.getAttribute("data-texts")); // Extract text variations
    let textIndex = 0;

    function showTextWithBounceEffect(text) {
        textElement.innerHTML = ""; // Clear text
        text.split("").forEach((letter, i) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(20px)";
            span.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
            span.style.marginRight = "4px"; // Add space between letters

            setTimeout(() => {
                span.style.opacity = "1";
                span.style.transform = "translateY(0)";
            }, i * 100); // Delay each letter's animation

            textElement.appendChild(span);
        });
    }

    function startTextAnimation() {
        showTextWithBounceEffect(texts[textIndex]);
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(startTextAnimation, 3000); // Change text every 3 seconds
    }

    startTextAnimation();
});
