/* // JavaScript for managing notifications
document.addEventListener("DOMContentLoaded", () => {
    const markAllReadBtn = document.getElementById("mark-all-read");
    const notificationsList = document.getElementById("notifications-list");
    
    // Function to fetch all notifications
    async function fetchNotifications() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:3000/api/notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            
            const notifications = await response.json();
            displayNotifications(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }
    
    // Function to display notifications
    function displayNotifications(notifications) {
        notificationsList.innerHTML = '';
        
        if (notifications.length === 0) {
            notificationsList.innerHTML = '<li class="no-notifications">No notifications available</li>';
            return;
        }
        
        notifications.forEach(notification => {
            const timeAgo = formatTimeAgo(new Date(notification.created_at));
            
            const li = document.createElement('li');
            li.className = notification.read ? 'notification read' : 'notification unread';
            li.dataset.id = notification.id;
            
            li.innerHTML = `
                <span class="notif-message">${notification.message}</span>
                <span class="notif-time">${timeAgo}</span>
                ${!notification.read ? '<button class="mark-read">Mark as Read</button>' : ''}
            `;
            
            notificationsList.appendChild(li);
        });
        
        // Add event listeners to the new mark read buttons
        document.querySelectorAll('.mark-read').forEach(button => {
            button.addEventListener('click', handleMarkAsRead);
        });
    }
    
    // Format time ago function
    function formatTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        }
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
        }
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        }
        
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    // Handle mark as read for individual notification
    async function handleMarkAsRead(e) {
        const notification = e.target.closest('.notification');
        const notificationId = notification.dataset.id;
        
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:3000/api/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }
            
            notification.classList.remove('unread');
            notification.classList.add('read');
            e.target.remove();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }
    
    // Function to mark all notifications as read
    async function markAllNotificationsAsRead() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:3000/api/notifications/read-all', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to mark all notifications as read');
            }
            
            // Refresh notifications after marking all as read
            fetchNotifications();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    }
    
    // Event listener for mark all as read button
    markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
    
    // Initial fetch of notifications
    fetchNotifications();
}); */

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
