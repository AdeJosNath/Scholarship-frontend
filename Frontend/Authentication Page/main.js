    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Form switcher links
    document.querySelectorAll('.form-switcher').forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const target = switcher.getAttribute('data-target');
            
            // Update tabs
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === target) {
                    tab.classList.add('active');
                }
            });
            
            // Update forms
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${target}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Role selection
    const roles = document.querySelectorAll('.role');
    
    roles.forEach(role => {
        role.addEventListener('click', () => {
            // Find parent role-selector
            const parent = role.parentElement;
            // Remove selected class from all roles in this selector
            parent.querySelectorAll('.role').forEach(r => r.classList.remove('selected'));
            // Add selected class to clicked role
            role.classList.add('selected');
        });
    });
    
    // Login functionality
    document.getElementById('login-button').addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.querySelector('#login-form .role.selected').getAttribute('data-role');
        
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Show loading
        document.getElementById('login-loading').style.display = 'block';
        document.getElementById('login-button').disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            document.getElementById('login-loading').style.display = 'none';
            document.getElementById('login-button').disabled = false;
            
            // Demo credentials for testing
            if ((email === 'admin@example.com' && password === 'admin123' && role === 'admin') || 
                (email === 'student@example.com' && password === 'student123' && role === 'student')) {
                showNotification(`Successfully logged in as ${role}`, 'success');
                // Redirect based on role (would normally go to different dashboards)
                if (role === 'admin') {
                    // Admin dashboard redirect
                    console.log('Redirecting to admin dashboard...');
                } else {
                    // Student dashboard redirect
                    console.log('Redirecting to student dashboard...');
                }
            } else {
                showNotification('Invalid email or password', 'error');
            }
        }, 1500);
    });
    
    // Register functionality
    document.getElementById('register-button').addEventListener('click', () => {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        const role = document.querySelector('#register-form .role.selected').getAttribute('data-role');
        
        if (!name || !email || !password || !confirm) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirm) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Password strength validation
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return;
        }
        
        // Show loading
        document.getElementById('register-loading').style.display = 'block';
        document.getElementById('register-button').disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            document.getElementById('register-loading').style.display = 'none';
            document.getElementById('register-button').disabled = false;
            
            showNotification(`Account created successfully as ${role}`, 'success');
            
            // Clear form
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-confirm').value = '';
            
            // Switch to login form after successful registration
            setTimeout(() => {
                document.querySelector('.form-switcher[data-target="login"]').click();
            }, 1500);
        }, 1500);
    });
    
    // Notification function
    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification';
        notification.classList.add(type);
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Create background particles
    function createParticles() {
        const particles = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Animation
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            
            particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
            
            // Add keyframe animation dynamically
            const keyframes = `
                @keyframes float {
                    0% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            particles.appendChild(particle);
        }
    }
    
    // Initialize particles on load
    window.addEventListener('load', createParticles);