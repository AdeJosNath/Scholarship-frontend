// JavaScript for reviewing applications page
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-applications");
    const tableBody = document.getElementById("applications-table-body");

    // Search applications dynamically
    searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach(row => {
            const applicantCell = row.querySelector("td:nth-child(1)");
            const scholarshipCell = row.querySelector("td:nth-child(2)");
            if (
                applicantCell.textContent.toLowerCase().includes(searchValue) ||
                scholarshipCell.textContent.toLowerCase().includes(searchValue)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    // Approve or Reject applications
    tableBody.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const statusCell = row.querySelector("td:nth-child(4)");

        if (e.target.classList.contains("btn-approve")) {
            statusCell.textContent = "Approved";
            statusCell.style.color = "green";
        } else if (e.target.classList.contains("btn-reject")) {
            statusCell.textContent = "Rejected";
            statusCell.style.color = "red";
        }
    });
});
