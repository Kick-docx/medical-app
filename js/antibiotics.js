function calcCCr(){
    const age = parseFloat(document.getElementById("age2").value);
    const weight = parseFloat(document.getElementById("weightCCr").value);
    const cr = parseFloat(document.getElementById("cr2").value);
    const sex = document.getElementById("sex2").value;
    let ccr = ((140-age)*weight)/(72*cr);
    if(sex==="female"){
        ccr *= 0.85;
    }
    document.getElementById("ccrResult").textContent =
        "CCr = " + ccr.toFixed(1) + " mL/min";
}

const images = [
    "images/antibiotics/01.png",
    "images/antibiotics/02.png",
    "images/antibiotics/03.png",
    "images/antibiotics/04.png",
    "images/antibiotics/05.png",
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