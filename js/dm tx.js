function calcHOMABeta() {

    const fpg = parseFloat(document.getElementById("fpg").value);
    const iri = parseFloat(document.getElementById("iri").value);

    if (isNaN(fpg) || isNaN(iri)) {
        document.getElementById("result").textContent =
            "値を入力してください";
        return;
    }

    if (fpg <= 63) {
        document.getElementById("result").textContent =
            "血糖値は63 mg/dLより大きい値を入力してください";
        return;
    }

    const homaBeta = (360 * iri) / (fpg - 63);

    document.getElementById("result").textContent =
        "HOMA-β = " + homaBeta.toFixed(1);
}

function calcCPI() {

    const fpg = parseFloat(document.getElementById("fpg").value);
    const cpr = parseFloat(document.getElementById("cpr").value);

    if (isNaN(fpg) || isNaN(cpr)) {
        document.getElementById("result").textContent =
            "値を入力してください";
        return;
    }

    if (fpg <= 0) {
        document.getElementById("result").textContent =
            "血糖値は0より大きい値を入力してください";
        return;
    }

    const cpi = (100 * cpr) / fpg;

    document.getElementById("result").textContent =
        "CPI = " + cpi.toFixed(2);
}