function calculateHEART() {
    const history =
        document.getElementById("heart-history").value;
    const ecg =
        document.getElementById("heart-ecg").value;
    const age =
        parseInt(document.getElementById("heart-age").value, 10);
    const risk =
        document.getElementById("heart-risk").value;
    const troponin =
        document.getElementById("heart-troponin").value;
    const error =
        document.getElementById("heart-error");
    const result =
        document.getElementById("heart-result");
    // リセット
    error.textContent = "";
    result.style.display = "none";
    // -------------------------
    // 入力チェック
    // -------------------------
    if (
        history === "" ||
        ecg === "" ||
        isNaN(age) ||
        risk === "" ||
        troponin === ""
    ) {
        error.textContent = "すべて入力してください";
        return;
    }
    // -------------------------
    // 年齢スコア
    // -------------------------
    let ageScore;
    if (age < 45) {
        ageScore = 0;
    } else if (age <= 64) {
        ageScore = 1;
    } else {
        ageScore = 2;
    }
    // -------------------------
    // 各スコアを数値化
    // -------------------------
    const historyScore = Number(history);
    const ecgScore = Number(ecg);
    const riskScore = Number(risk);
    const troponinScore = Number(troponin);
    // -------------------------
    // 合計
    // -------------------------
    const total =
        historyScore +
        ecgScore +
        ageScore +
        riskScore +
        troponinScore;
    // -------------------------
    // リスク分類
    // -------------------------
    let riskLevel;
    if (total <= 3) {
        riskLevel = "低リスク";
    } else if (total <= 6) {
        riskLevel = "中間リスク";
    } else {
        riskLevel = "高リスク";
    }
    // -------------------------
    // 結果表示
    // -------------------------
    document.getElementById("heart-total").textContent = total;
    document.getElementById("heart-risk-level").textContent =
        riskLevel;
    result.style.display = "block";
}