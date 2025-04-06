document.addEventListener("DOMContentLoaded", async () => {
    const notificationsList = document.querySelector(".notifications-list");

    try {
        const response = await fetch("http://localhost:5000/api/notifications");
        const notifications = await response.json();

        notifications.forEach(notification => {
            const notificationCard = document.createElement("div");
            notificationCard.classList.add("notification-card");
            notificationCard.innerHTML = `
                <p><strong>${notification.message}</strong></p>
                <span class="timestamp">${notification.timestamp}</span>
            `;
            notificationsList.appendChild(notificationCard);
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
});
