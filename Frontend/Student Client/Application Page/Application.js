document.addEventListener("DOMContentLoaded", () => {
    const withdrawButtons = document.querySelectorAll(".withdraw-button");

    withdrawButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const applicationCard = event.target.closest(".application-card");
            const scholarshipId = applicationCard.dataset.scholarshipId; // Ensure each card has a `data-scholarship-id` attribute

            const confirmation = confirm(`Are you sure you want to withdraw your application?`);
            if (!confirmation) return;

            try {
                const response = await fetch(`http://localhost:5000/api/applications/${scholarshipId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    applicationCard.style.display = "none";
                    alert("Application withdrawn successfully.");
                } else {
                    alert("Failed to withdraw application. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    });
});
