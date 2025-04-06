document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const passportInput = document.getElementById('passport');
    const fileChosen = document.getElementById('file-chosen');

    // File upload name display
    passportInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileChosen.textContent = this.files[0].name;
        } else {
            fileChosen.textContent = 'No file chosen';
        }
    });

    // Form validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = 'red';
        }

        // Phone validation (basic)
        const phoneField = document.getElementById('phone');
        const phoneRegex = /^\d{10}$/; // Assumes 10-digit phone number
        if (!phoneRegex.test(phoneField.value.replace(/\D/g, ''))) {
            isValid = false;
            phoneField.style.borderColor = 'red';
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            fileChosen.textContent = 'No file chosen';
        } else {
            alert('Please fill all required fields correctly.');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('extendedRegistrationForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Comprehensive form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            // Reset previous error states
            field.style.borderColor = '#ddd';

            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            }
        });

        // Email validation
        const emailFields = ['primaryEmail', 'alternateEmail'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        emailFields.forEach(fieldId => {
            const emailField = document.getElementById(fieldId);
            if (emailField.value && !emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = 'red';
            }
        });

        // Phone number validation
        const phoneFields = ['primaryPhone', 'alternatePhone'];
        const phoneRegex = /^\d{10}$/; 

        phoneFields.forEach(fieldId => {
            const phoneField = document.getElementById(fieldId);
            if (phoneField.value && !phoneRegex.test(phoneField.value.replace(/\D/g, ''))) {
                isValid = false;
                phoneField.style.borderColor = 'red';
            }
        });

        if (isValid) {
            // Collect form data
            const formData = new FormData(form);
            const formDataObject = Object.fromEntries(formData.entries());

            console.log('Form Data:', formDataObject);
            alert('Registration submitted successfully!');
            form.reset();
        } else {
            alert('Please correct the highlighted fields.');
        }
    });
});

