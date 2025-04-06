document.addEventListener("DOMContentLoaded", async () => {
    const filterForm = document.getElementById("filter-form");
    const resultsList = document.querySelector(".results-list");

    async function fetchScholarships(filters = {}) {
        let query = "http://localhost:5000/api/scholarships";
        const params = new URLSearchParams(filters).toString();
        if (params) query += `?${params}`;

        try {
            const response = await fetch(query);
            const scholarships = await response.json();
            displayScholarships(scholarships);
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        }
    }

    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = document.getElementById("keyword").value;
        const category = document.getElementById("category").value;
        const deadline = document.getElementById("deadline").value;

        fetchScholarships({ keyword, category, deadline });
    });

    function displayScholarships(scholarships) {
        resultsList.innerHTML = "";
        if (scholarships.length === 0) {
            resultsList.innerHTML = "<p>No scholarships found matching your criteria.</p>";
            return;
        }

        scholarships.forEach((scholarship) => {
            const card = document.createElement("div");
            card.className = "result-card";
            card.innerHTML = `
                <h3>${scholarship.title}</h3>
                <p>${scholarship.description}</p>
                <p><strong>Deadline:</strong> ${scholarship.deadline}</p>
                <a href="#" class="apply-button">Apply Now</a>
            `;
            resultsList.appendChild(card);
        });
    }

    fetchScholarships(); // Fetch all scholarships on page load
});
