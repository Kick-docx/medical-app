const images = [
    "images/liver/01.jpg",
    "images/liver/02.jpg",
    "images/liver/03.jpg",
    "images/liver/04.jpg",
    "images/liver/05.jpg",
    "images/liver/06.jpg",
];
let currentSlide = 0;
function showSlide() {
    document.getElementById("slideImage").src =
        images[currentSlide];
    document.getElementById("slideNumber").textContent =
        (currentSlide + 1) + " / " + images.length;
}
function nextSlide() {
    currentSlide++;
    if (currentSlide >= images.length) {
        currentSlide = 0;
    }
    showSlide();
}
function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    }
    showSlide();
}
/* スワイプ */
let touchStartX = 0;
let touchEndX = 0;
const slideContainer =
    document.getElementById("slideContainer");
slideContainer.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].screenX;
});
slideContainer.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;
    // 左へスワイプ
    if (distance < -50) {
        nextSlide();
    }
    // 右へスワイプ
    if (distance > 50) {
        prevSlide();
    }
});