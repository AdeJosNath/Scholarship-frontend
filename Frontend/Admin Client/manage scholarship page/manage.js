document.addEventListener("DOMContentLoaded", () => {
    const addScholarshipBtn = document.getElementById("add-scholarship-btn");
    const searchInput = document.getElementById("search-scholarships");
    const tableBody = document.getElementById("scholarship-table-body");

    // Function to fetch scholarships
    async function fetchScholarships() {
        try {
            const token = localStorage.getItem('authToken'); // Store token after login
            const response = await fetch('http://localhost:3000/api/scholarships', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const scholarships = await response.json();
            
            // Clear existing rows
            tableBody.innerHTML = '';
            
            // Populate table
            scholarships.forEach(scholarship => {
                const row = `
                    <tr data-id="${scholarship.id}">
                        <td>${scholarship.id}</td>
                        <td>${scholarship.title}</td>
                        <td>${scholarship.deadline}</td>
                        <td>${scholarship.status}</td>
                        <td>
                            <button class="btn-secondary edit-btn">Edit</button>
                            <button class="btn-danger delete-btn">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        }
    }

    // Add Scholarship
    addScholarshipBtn.addEventListener("click", async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:3000/api/scholarships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: 'New Scholarship',
                    deadline: '2025-12-31',
                    status: 'Active'
                })
            });
            
            if (response.ok) {
                fetchScholarships(); // Refresh the list
            }
        } catch (error) {
            console.error('Error adding scholarship:', error);
        }
    });

    // Delete Scholarship
    tableBody.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const row = e.target.closest('tr');
            const scholarshipId = row.dataset.id;
            
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:3000/api/scholarships/${scholarshipId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    row.remove();
                }
            } catch (error) {
                console.error('Error deleting scholarship:', error);
            }
        }
    });

    // Initial fetch of scholarships
    fetchScholarships();
});
