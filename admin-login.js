document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Simple hardcoded credentials for demonstration
    if (user === "admin" && pass === "admin123") {
        localStorage.setItem("admin_logged_in", "true");
        window.location.href = "admin.html";
    } else {
        errorMsg.style.display = "block";
    }
});

// If already logged in, redirect to admin panel
if (localStorage.getItem("admin_logged_in") === "true") {
    window.location.href = "admin.html";
}
