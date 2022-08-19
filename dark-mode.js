let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.getElementById("dark-mode-toggle");

const enableDarkMode = () => {
     // Add the class dark-mode to the body
     document.body.classList.add("dark-mode");
     // Update darkMode in the localStorage
     localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
    // Remove the class dark-mode to the body
    document.body.classList.remove("dark-mode");
    // Update darkMode in the LocalStorage
    localStorage.setItem("darkMode", "disabled");
}

if (darkMode === "enabled") {
    enableDarkMode();
}

/* Function that switch between dark mode and light mode */
darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})
