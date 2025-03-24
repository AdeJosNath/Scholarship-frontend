// JavaScript for managing notifications
document.addEventListener("DOMContentLoaded", () => {
    const markAllReadBtn = document.getElementById("mark-all-read");
    const notificationItems = document.querySelectorAll(".notification.unread");
    const markReadButtons = document.querySelectorAll(".mark-read");

    // Function to mark all notifications as read
    markAllReadBtn.addEventListener("click", () => {
        notificationItems.forEach(item => {
            item.classList.remove("unread");
            item.classList.add("read");
            item.style.background = "#f1f1f1";
            item.querySelector(".mark-read").remove();
        });
    });

    // Function to mark individual notifications as read
    markReadButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const notification = e.target.closest(".notification");
            notification.classList.remove("unread");
            notification.classList.add("read");
            notification.style.background = "#f1f1f1";
            e.target.remove();
        });
    });
});