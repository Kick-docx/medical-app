const images = [
    "images/COPD/01.jpg",
    "images/COPD/02.jpg",
    "images/COPD/03.jpg",
    "images/COPD/04.jpg",
    "images/COPD/05.jpg",
    "images/COPD/06.jpg",
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