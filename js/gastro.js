function calculateChildPugh() {
    const bilirubin =
        parseFloat(document.getElementById("cp-bilirubin").value);
    const albumin =
        parseFloat(document.getElementById("cp-albumin").value);
    const inr =
        parseFloat(document.getElementById("cp-inr").value);
    const ascites =
        document.getElementById("cp-ascites").value;
    const encephalopathy =
        document.getElementById("cp-encephalopathy").value;
    const error =
        document.getElementById("cp-error");
    const result =
        document.getElementById("cp-result");
    // エラー表示をリセット
    error.textContent = "";
    result.style.display = "none";
    // 未入力チェック
    if (
        isNaN(bilirubin) ||
        isNaN(albumin) ||
        isNaN(inr) ||
        ascites === "" ||
        encephalopathy === ""
    ) {
        error.textContent = "すべて入力してください";
        return;
    }
    // -------------------------
    // 各項目のスコア
    // -------------------------
    let bilirubinScore;
    if (bilirubin < 2.0) {
        bilirubinScore = 1;
    } else if (bilirubin <= 3.0) {
        bilirubinScore = 2;
    } else {
        bilirubinScore = 3;
    }
    let albuminScore;
    if (albumin > 3.5) {
        albuminScore = 1;
    } else if (albumin >= 2.8) {
        albuminScore = 2;
    } else {
        albuminScore = 3;
    }
    let inrScore;
    if (inr < 1.7) {
        inrScore = 1;
    } else if (inr <= 2.3) {
        inrScore = 2;
    } else {
        inrScore = 3;
    }
    const ascitesScore = Number(ascites);
    const encephalopathyScore = Number(encephalopathy);
    // -------------------------
    // 合計
    // -------------------------
    const total =
        bilirubinScore +
        albuminScore +
        inrScore +
        ascitesScore +
        encephalopathyScore;
    // -------------------------
    // Child-Pugh Class
    // -------------------------
    let childClass;
    if (total <= 6) {
        childClass = "Child-Pugh A";
    } else if (total <= 9) {
        childClass = "Child-Pugh B";
    } else {
        childClass = "Child-Pugh C";
    }
    // -------------------------
    // 結果表示
    // -------------------------
    document.getElementById("cp-total").textContent = total;
    document.getElementById("cp-class").textContent = childClass;
    document.getElementById("cp-detail").innerHTML =
        `Bil ${bilirubinScore}点 ＋ ` +
        `Alb ${albuminScore}点 ＋ ` +
        `INR ${inrScore}点 ＋ ` +
        `腹水 ${ascitesScore}点 ＋ ` +
        `脳症 ${encephalopathyScore}点`;
    result.style.display = "block";
}

