const submenu = document.getElementById("submenu");

document.getElementById("directions-button").onclick = function () {
    submenu.hidden = !submenu.hidden;
};

if (screen.width <= 768) {
    document.body.className = "mobile";
} else {
    document.body.className = "desktop";
}

document.body.style.paddingTop = document.querySelector("header").offsetHeight + 20 + "px";
