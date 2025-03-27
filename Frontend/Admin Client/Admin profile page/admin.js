document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('adminProfileForm');

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Basic form validation
        const requiredFields = profileForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#cbd5e1';
            }
        });

        // Password validation
        const currentPassword = document.getElementById('currentPassword');
        const newPassword = document.getElementById('newPassword');
        const confirmPassword = document.getElementById('confirmPassword');

        if (newPassword.value && newPassword.value !== confirmPassword.value) {
            isValid = false;
            newPassword.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
        }

        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = 'red';
        }

        if (isValid) {
            // Collect form data
            const formData = new FormData(profileForm);
            const profileData = Object.fromEntries(formData.entries());

            console.log('Profile Update Data:', profileData);
            alert('Profile updated successfully!');
        } else {
            alert('Please correct the highlighted fields.');
        }
    });
});