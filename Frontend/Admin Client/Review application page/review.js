// JavaScript for reviewing applications page
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-applications");
    const tableBody = document.getElementById("applications-table-body");
    const API_URL = 'http://localhost:3000/api';

    // Function to fetch all applications
    async function fetchApplications() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/applications`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            
            const applications = await response.json();
            displayApplications(applications);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    }

    // Function to display applications in the table
    function displayApplications(applications) {
        tableBody.innerHTML = '';
        
        applications.forEach(app => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', app.id);
            
            // Format date for display
            const submittedDate = new Date(app.date_submitted).toISOString().split('T')[0];
            
            row.innerHTML = `
                <td>${app.applicant_name}</td>
                <td>${app.scholarship_title}</td>
                <td>${submittedDate}</td>
                <td class="status ${app.status.toLowerCase()}">${app.status}</td>
                <td>
                    <button class="btn-approve" ${app.status !== 'Pending' ? 'disabled' : ''}>Approve</button>
                    <button class="btn-reject" ${app.status !== 'Pending' ? 'disabled' : ''}>Reject</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    // Function to search applications
    async function searchApplications(query) {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/applications/search?query=${encodeURIComponent(query)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Search failed');
            }
            
            const applications = await response.json();
            displayApplications(applications);
        } catch (error) {
            console.error('Error searching applications:', error);
        }
    }

    // Function to update application status
    async function updateApplicationStatus(applicationId, status) {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_URL}/applications/${applicationId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to ${status.toLowerCase()} application`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error updating application status:`, error);
            throw error;
        }
    }

    // Event Listener: Search applications
    searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value.toLowerCase();
        
        if (searchValue.length >= 3) {
            // If 3 or more characters, make API call
            searchApplications(searchValue);
        } else if (searchValue.length === 0) {
            // If search is cleared, fetch all applications
            fetchApplications();
        } else {
            // For 1-2 characters, filter in the browser for better UX
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
        }
    });

    // Event Listener: Approve or Reject applications
    tableBody.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-approve") || e.target.classList.contains("btn-reject")) {
            const row = e.target.closest("tr");
            const applicationId = row.dataset.id;
            const statusCell = row.querySelector("td:nth-child(4)");
            const status = e.target.classList.contains("btn-approve") ? "Approved" : "Rejected";
            
            try {
                // Call API to update status
                await updateApplicationStatus(applicationId, status);
                
                // Update UI
                statusCell.textContent = status;
                statusCell.className = `status ${status.toLowerCase()}`;
                
                // Disable buttons
                row.querySelectorAll('button').forEach(btn => {
                    btn.disabled = true;
                });
                
                alert(`Application ${status.toLowerCase()}!`);
            } catch (error) {
                alert(`Failed to ${status.toLowerCase()} application. Please try again.`);
            }
        }
    });

    // Initial fetch of applications
    fetchApplications();
});