const photos = document.querySelectorAll(".directions img");
const slide = document.getElementById("slide");
let current = 0;

function showSlide(step) {
    current = (current + step + photos.length) % photos.length;
    slide.src = photos[current].src;
    slide.alt = photos[current].alt;
}

document.getElementById("prev").onclick = () => showSlide(-1);
document.getElementById("next").onclick = () => showSlide(1);

document.getElementById("search-button").onclick = function () {
    const text = document.getElementById("search").value.trim().toLowerCase();

    document.querySelectorAll(".directions li").forEach(item => {
        item.hidden = !item.querySelector("h2").textContent.toLowerCase().includes(text);
    });
};
