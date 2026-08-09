function calcFENa() {
    const serumNa = parseFloat(document.getElementById("serumNa").value);
    const urineNa = parseFloat(document.getElementById("urineNa").value);
    const serumCr = parseFloat(document.getElementById("serumCr").value);
    const urineCr = parseFloat(document.getElementById("urineCr").value);
    if (
        isNaN(serumNa) ||
        isNaN(urineNa) ||
        isNaN(serumCr) ||
        isNaN(urineCr) ||
        serumNa === 0 ||
        urineCr === 0
    ) {
        document.getElementById("fenaResult").textContent = "値を入力してください";
        return;
    }
    const fena = (urineNa * serumCr) / (serumNa * urineCr) * 100;
    document.getElementById("fenaResult").textContent =
        `FENa：${fena.toFixed(2)} %`;
}