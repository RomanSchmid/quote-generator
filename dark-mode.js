let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
})
