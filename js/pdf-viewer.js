import * as pdfjsLib from "../pdfjs/pdf.mjs";

console.log("PDF.js:", pdfjsLib);
console.log("GlobalWorkerOptions:", pdfjsLib.GlobalWorkerOptions);

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL("../pdfjs/pdf.worker.mjs", import.meta.url).toString();

async function loadPDF() {
  const params = new URLSearchParams(window.location.search);
  const pdfUrl = params.get("file");

  const status = document.getElementById("pdfStatus");
  const canvas = document.getElementById("pdfCanvas");
  const context = canvas.getContext("2d");

  if (!pdfUrl) {
    status.textContent = "PDFファイルが指定されていません。";
    return;
  }

  try {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;

    status.textContent = "PDFを表示しました。";
  } catch (error) {
    console.error(error);
    status.textContent = "PDFの読み込みに失敗しました。";
  }
}

loadPDF();
