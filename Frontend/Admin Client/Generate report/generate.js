document.addEventListener("DOMContentLoaded", () => {
    const broadcastForm = document.getElementById("broadcast-form");

    broadcastForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const recipients = document.getElementById("recipients").value;
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (subject === "" || message === "") {
            alert("Please fill in all fields before sending.");
            return;
        }

        // Simulate sending email (Replace with actual API call)
        alert(`Broadcast message sent to: ${recipients}`);

        // Reset form
        broadcastForm.reset();
    });
});
