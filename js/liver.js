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

function calculateRValue() {
  const ALT = Number(document.getElementById("rALT").value);
  const ALT_ULN = Number(document.getElementById("rALTULN").value);
  const ALP = Number(document.getElementById("rALP").value);
  const ALP_ULN = Number(document.getElementById("rALPULN").value);
  const result = document.getElementById("rResult");
  const inputs = ["rALT", "rALTULN", "rALP", "rALPULN"];
  if (inputs.some(id => document.getElementById(id).value === "")) {
    result.textContent = "すべて入力してください。";
    return;
  }
  if (
    ![ALT, ALT_ULN, ALP, ALP_ULN].every(Number.isFinite) ||
    ALT < 0 || ALP < 0 ||
    ALT_ULN <= 0 || ALP_ULN <= 0
  ) {
    result.textContent = "正しい数値を入力してください。";
    return;
  }
  if (ALP === 0) {
    result.textContent = "ALP実測値が0のため、R値を計算できません。";
    return;
  }
  const R = (ALT / ALT_ULN) / (ALP / ALP_ULN);
  let pattern = "";
  if (R >= 5) {
    pattern = "肝細胞障害型";
  } else if (R > 2) {
    pattern = "混合型";
  } else {
    pattern = "胆汁うっ滞型";
  }
  result.innerHTML =
    "<p>R値：" + R.toFixed(2) + "，肝障害パターン：" + pattern + "</p>";
}

function calculateFIB4() {
  const age = Number(document.getElementById("fibAge").value);
  const AST = Number(document.getElementById("fibAST").value);
  const ALT = Number(document.getElementById("fibALT").value);
  const PLT = Number(document.getElementById("fibPLT").value);
  const result = document.getElementById("fibResult");
  const inputs = ["fibAge", "fibAST", "fibALT", "fibPLT"];
  if (inputs.some(id => document.getElementById(id).value === "")) {
    result.textContent = "すべて入力してください。";
    return;
  }
  if (
    ![age, AST, ALT, PLT].every(Number.isFinite) ||
    age <= 0 || AST < 0 || ALT <= 0 || PLT <= 0
  ) {
    result.textContent = "正しい数値を入力してください。";
    return;
  }
  // 血小板数を×10^9/Lに換算
  const platelet = PLT * 10;
  const fib4 = (age * AST) / (platelet * Math.sqrt(ALT));
  let risk = "";
  if (fib4 < 1.3) {
    risk = "低リスク";
  } else if (fib4 <= 2.67) {
    risk = "中間リスク";
  } else {
    risk = "高リスク";
  }
  result.innerHTML =
    "<p>FIB-4 index：" + fib4.toFixed(2) + "，肝線維化リスク：" + risk + "</p>";
}