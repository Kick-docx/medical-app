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


function calculatePrescriptionDays() {
  const discharge = document.getElementById("dischargeDate").value;
  const outpatient = document.getElementById("outpatientDate").value;
  const remaining = Number(document.getElementById("remainingDays").value);
  const result = document.getElementById("prescriptionResult");
  if (!discharge || !outpatient) {
    result.textContent = "退院日と次回外来日を入力してください。";
    return;
  }
  if (document.getElementById("remainingDays").value === "" ||
      !Number.isInteger(remaining) || remaining < 0) {
    result.textContent = "残薬は0以上の整数で入力してください。";
    return;
  }
  const dischargeDate = new Date(discharge + "T00:00:00");
  const outpatientDate = new Date(outpatient + "T00:00:00");
  const diffDays = Math.round(
    (Date.UTC(
      outpatientDate.getFullYear(),
      outpatientDate.getMonth(),
      outpatientDate.getDate()
    ) - Date.UTC(
      dischargeDate.getFullYear(),
      dischargeDate.getMonth(),
      dischargeDate.getDate()
    )) / (1000 * 60 * 60 * 24)
  );
  if (diffDays < 0) {
    result.textContent = "次回外来日は退院日以降に設定してください。";
    return;
  }
  const requiredDays = Math.max(0, diffDays - remaining);
  result.textContent = "必要な処方日数：" + requiredDays + "日分";
}