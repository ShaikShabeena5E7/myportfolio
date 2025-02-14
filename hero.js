document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.querySelector(".bounce-text");
    const texts = JSON.parse(textElement.getAttribute("data-texts")); // Extract text variations
    let textIndex = 0;

    function showTextWithBounceEffect(text) {
        textElement.innerHTML = ""; // Clear previous text

        text.split("").forEach((letter, i) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.textContent = letter === " " ? "\u00A0" : letter; // Ensure spaces are visible
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(10px)"; // Less height for subtle effect
            span.style.transition = "opacity 0.2s ease-out, transform 0.2s ease-out";
            span.style.marginRight = "2px"; // Small margin between letters

            // Apply animation with a small delay for each letter
            setTimeout(() => {
                span.style.opacity = "1";
                span.style.transform = "translateY(0)";
            }, i * 75); // Slightly faster animation

            textElement.appendChild(span);
        });
    }

    function startTextAnimation() {
        showTextWithBounceEffect(texts[textIndex]);
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(startTextAnimation, 2500); // Faster switch time
    }

    startTextAnimation();
});
