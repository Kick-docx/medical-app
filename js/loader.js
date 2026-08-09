async function loadComponent(id, file) {
    const response = await fetch(file);

    if (!response.ok) {
        console.error(`${file} の読み込みに失敗しました`);
        return;
    }

    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {

    // 共通部品を読み込む
    await loadComponent("header", "components/header.html");
    await loadComponent("menu", "components/menu.html");
    await loadComponent("search", "components/search.html");
    await loadComponent("footer", "components/footer.html");

    // メニューがあるページだけ動作
    const menu = document.getElementById("sideMenu");

    if (menu) {
        const button = document.getElementById("menuButton");
        const overlay = document.getElementById("overlay");

        button.addEventListener("click", () => {
        menu.classList.toggle("open");
        overlay.classList.toggle("show");
    });


overlay.addEventListener("click", () => {
    menu.classList.remove("open");
    overlay.classList.remove("show");
});

    const searchButton = document.getElementById("searchButton");
    const searchBox = document.getElementById("searchBox");
    if (searchButton && searchBox) {
    searchButton.addEventListener("click", () => {
        searchBox.classList.toggle("show");
    });
}    
    }



});