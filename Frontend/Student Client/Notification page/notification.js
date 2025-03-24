document.addEventListener("DOMContentLoaded", () => {
    // Example: Dynamically add notifications (can be replaced with API calls later)
    const notificationsList = document.querySelector(".notifications-list");

    // Mock data for notifications
    const notifications = [
        {
            message: "Your application for Library Information Studies has been rejected.",
            timestamp: "5 hours ago",
        },
        {
            message: "Reminder: Submit required documents for Theatre Arts Scholarship by January 15, 2025.",
            timestamp: "2 days ago",
        },
    ];

    // Add notifications dynamically
    notifications.forEach(notification => {
        const notificationCard = document.createElement("div");
        notificationCard.classList.add("notification-card");
        notificationCard.innerHTML = `
            <p><strong>${notification.message}</strong></p>
            <span class="timestamp">${notification.timestamp}</span>
        `;
        notificationsList.appendChild(notificationCard);
    });
});
