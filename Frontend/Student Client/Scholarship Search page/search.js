document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filter-form");
    const resultsList = document.querySelector(".results-list");

    // Sample scholarships data (this would be replaced by an API call)
    const scholarships = [
        {
            title: "Engineering Excellence Scholarship",
            category: "engineering",
            deadline: "2025-01-31",
            description: "A scholarship for outstanding engineering students."
        },
        {
            title: "Science Innovators Award",
            category: "science",
            deadline: "2025-02-15",
            description: "Award for exceptional contributions to science."
        },
        {
            title: "Creative Arts Scholarship",
            category: "arts",
            deadline: "2025-03-01",
            description: "For students excelling in the arts."
        }
    ];

    // Filter and display scholarships
    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const keyword = document.getElementById("keyword").value.toLowerCase();
        const category = document.getElementById("category").value;
        const deadline = document.getElementById("deadline").value;

        const filteredScholarships = scholarships.filter((scholarship) => {
            const matchesKeyword = !keyword || scholarship.title.toLowerCase().includes(keyword);
            const matchesCategory = !category || scholarship.category === category;
            const matchesDeadline = !deadline || scholarship.deadline <= deadline;

            return matchesKeyword && matchesCategory && matchesDeadline;
        });

        displayScholarships(filteredScholarships);
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
});
