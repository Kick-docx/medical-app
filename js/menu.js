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

    // Home以外のみメニュー表示
    if (!location.pathname.includes("Home.html")) {
        await loadComponent("menu", "components/menu.html");
    }

    await loadComponent("search", "components/search.html");
    await loadComponent("footer", "components/footer.html");

    // メニューがあるページだけ動作
    const menu = document.getElementById("sideMenu");

    if (menu) {

        const button = document.getElementById("menuButton");
        const close = document.getElementById("closeMenu");
        const overlay = document.getElementById("overlay");

        button.addEventListener("click", () => {
            menu.classList.add("open");
            overlay.classList.add("show");
        });

        close.addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);

        function closeMenu() {
            menu.classList.remove("open");
            overlay.classList.remove("show");
        }

    }

});
