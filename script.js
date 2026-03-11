function showMessage() {
    document.getElementById("response").innerHTML =
        "📧 Email us at contact@abctechnologies.com";
}

function showNavInfo(section) {
    var text = "";

    if (section === "home") text = "🏠 Home: Company overview.";
    if (section === "about") text = "ℹ️ About: Our mission and journey.";
    if (section === "services") text = "🛠 Services: What we offer.";
    if (section === "team") text = "👥 Team: Our professionals.";
    if (section === "contact") text = "📞 Contact: Reach us easily.";

    document.getElementById("nav-info").innerHTML = text;
}

function setActive(element) {
    var links = document.querySelectorAll("nav a");
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
    element.classList.add("active");
}

/* Scroll animation */
window.addEventListener("scroll", function () {
    var sections = document.querySelectorAll(".content");
    for (var i = 0; i < sections.length; i++) {
        var top = sections[i].getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sections[i].classList.add("show");
        }
    }
});
