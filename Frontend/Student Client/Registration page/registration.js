// registration.js

document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const passportInput = document.getElementById('passport');
    const fileChosen = document.getElementById('file-chosen');

    if (passportInput && fileChosen) {
        passportInput.addEventListener('change', function () {
            fileChosen.textContent = this.files && this.files.length > 0
                ? this.files[0].name
                : 'No file chosen';
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const isValid = validateForm(this);
            if (!isValid) {
                alert("Please fill all required fields correctly.");
                return;
            }

            const formData = new FormData(this);

            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Registration submitted successfully!');
                    this.reset();
                    if (fileChosen) fileChosen.textContent = 'No file chosen';
                } else {
                    alert('Submission failed: ' + (result.error || 'Unknown error'));
                }

            } catch (err) {
                console.error('Error submitting form:', err);
                alert('An error occurred. Check the console for details.');
            }
        });
    }

    // --- Validation logic ---
    const validators = {
        required: value => value.trim() !== '',
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: value => /^\d{10}$/.test(value.replace(/\D/g, ''))
    };

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            field.style.borderColor = '#ddd';
            if (!validators.required(field.value)) {
                field.style.borderColor = 'red';
                isValid = false;
            }
        });

        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !validators.email(field.value)) {
                field.style.borderColor = 'red';
                isValid = false;
            }
        });

        const phoneFields = form.querySelectorAll('input[data-type="phone"]');
        phoneFields.forEach(field => {
            if (field.value && !validators.phone(field.value)) {
                field.style.borderColor = 'red';
                isValid = false;
            }
        });

        return isValid;
    }
});
