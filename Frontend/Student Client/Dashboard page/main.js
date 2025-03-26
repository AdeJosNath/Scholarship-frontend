document.addEventListener("DOMContentLoaded", () => {
    // Search Bar Placeholder Functionality
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("keyup", (e) => {
        console.log(`Searching for: ${e.target.value}`);
    });

    // Sidebar Navigation Functionality (Optional: Enhance Interactivity)
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    sidebarLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert(`Navigating to ${link.textContent}`);
        });
    });
});
