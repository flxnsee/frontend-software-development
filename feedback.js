const details = document.getElementById("details");
const tooltip = document.getElementById("tooltip");

details.onmouseover = function () {
    details.style.backgroundColor = "#f9eef0";
    details.style.border = "2px solid #722f37";
    details.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.3)";
    tooltip.hidden = false;
};

details.onmouseout = function () {
    details.style.backgroundColor = "";
    details.style.border = "";
    details.style.boxShadow = "";
    tooltip.hidden = true;
};
