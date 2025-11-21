document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptCookiesBtn = document.getElementById("accept-cookies");

    const cookiesAccepted = localStorage.getItem("cookiesAccepted");

    if (!cookiesAccepted) {
        cookieBanner.style.display = "block";
    }

    acceptCookiesBtn.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.style.display = "none";
    });
});