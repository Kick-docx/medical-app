if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('登録成功:', reg))
    .catch(err => console.log('登録失敗:', err));
}

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

function calcGamma() {
    const drugMg = parseFloat(document.getElementById("drugMg").value);
    const totalMl = parseFloat(document.getElementById("totalMl").value);
    const weight = parseFloat(document.getElementById("weightGamma").value);
    const gamma = parseFloat(document.getElementById("gamma").value);
    if (
        isNaN(drugMg) ||
        isNaN(totalMl) ||
        isNaN(weight) ||
        isNaN(gamma) ||
        drugMg <= 0 ||
        totalMl <= 0 ||
        weight <= 0
    ) {
        document.getElementById("gammaResult").innerHTML =
            "すべて入力してください";
        return;
    }
    // 濃度（μg/mL）
    const concentration = drugMg * 1000 / totalMl;
    // 入力γでの速度
    const rate = gamma * weight * 60 / concentration;
    // よく使うγ
    const gammaList = [0.05, 0.1, 0.2, 0.3, 0.5, 1.0];
    let table = `
        <table border="1" cellpadding="6">
        <tr>
            <th>γ</th>
            <th>mL/hr</th>
        </tr>
    `;
    gammaList.forEach(g => {
        const mlhr = g * weight * 60 / concentration;
        table += `
            <tr>
                <td>${g}</td>
                <td>${mlhr.toFixed(2)}</td>
            </tr>
        `;
    });
    table += "</table>";
    document.getElementById("gammaResult").innerHTML = `
        <p><b>濃度：</b>${concentration.toFixed(1)} μg/mL</p>
        <p><b>${gamma} γ の投与速度：</b>${rate.toFixed(2)} mL/hr</p>
        <br>
        ${table}
    `;
}