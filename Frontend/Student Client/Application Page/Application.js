document.addEventListener("DOMContentLoaded", () => {
    const withdrawButtons = document.querySelectorAll(".withdraw-button");

    // Handle withdrawal of applications
    withdrawButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const applicationCard = event.target.closest(".application-card");
            const scholarshipName = applicationCard.querySelector("h3").innerText;

            const confirmation = confirm(`Are you sure you want to withdraw your application for "${scholarshipName}"?`);
            if (confirmation) {
                applicationCard.style.display = "none"; // Remove application from view
                alert(`You have successfully withdrawn your application for "${scholarshipName}".`);
            }
        });
    });
});
