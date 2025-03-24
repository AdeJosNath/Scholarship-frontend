// JavaScript for managing scholarships page
document.addEventListener("DOMContentLoaded", () => {
    const addScholarshipBtn = document.getElementById("add-scholarship-btn");
    const searchInput = document.getElementById("search-scholarships");
    const tableBody = document.getElementById("scholarship-table-body");

    // Placeholder: Add a new scholarship (logic can be expanded with modal)
    addScholarshipBtn.addEventListener("click", () => {
        alert("Add New Scholarship feature coming soon!");
    });

    // Filter scholarships by search term
    searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach(row => {
            const titleCell = row.querySelector("td:nth-child(2)");
            if (titleCell.textContent.toLowerCase().includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    // Delete a scholarship (static placeholder, dynamic logic can be added later)
    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-danger")) {
            const row = e.target.closest("tr");
            row.remove();
            alert("Scholarship deleted!");
        }
    });
});
