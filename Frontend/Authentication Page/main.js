
// === Show Notification ===
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
        notification.className = 'notification';
    }, 3000);
}

// === Tab Switcher (Login <-> Register) ===
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-tab');

        document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
        document.getElementById(`${target}-form`).classList.add('active');
    });
});

// === Form Switcher (Inside form: link switch) ===
document.querySelectorAll('.form-switcher').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');

        document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
        document.getElementById(`${target}-form`).classList.add('active');

        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`.tab[data-tab="${target}"]`).classList.add('active');
    });
});

// === Role Selector for Login & Register Forms ===
document.querySelectorAll('.role-selector').forEach(selector => {
    selector.querySelectorAll('.role').forEach(roleBtn => {
        roleBtn.addEventListener('click', () => {
            selector.querySelectorAll('.role').forEach(r => r.classList.remove('selected'));
            roleBtn.classList.add('selected');
        });
    });
});

// === REGISTER ===
document.getElementById('register-button').addEventListener('click', async () => {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const role = document.querySelector('#register-form .role.selected')?.getAttribute('data-role');

    if (!name || !email || !password || !confirm || !role) {
        showNotification('Please fill all fields and select a role.', 'error');
        return;
    }

    if (password !== confirm) {
        showNotification('Passwords do not match.', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters.', 'error');
        return;
    }

        // === Enforce ".sdf" email rule for Admins ===
    if (role === 'admin' && !email.includes('.sdf')) {
        showNotification("Incorrect email", 'error');
        return;
    }


    document.getElementById('register-loading').innerText = 'Creating account...';
    document.getElementById('register-button').disabled = true;

    try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });

        if (signUpError) throw signUpError;

        const userId = signUpData.user.id;

        const { error: insertError } = await supabase.from('users').insert([
            { user_id: userId, name, email, role }
        ]);

        if (insertError) throw insertError;

        showNotification(`Account created successfully as ${role}`, 'success');

        // Clear form
        ['register-name', 'register-email', 'register-password', 'register-confirm'].forEach(id => {
            document.getElementById(id).value = '';
        });

        document.querySelectorAll('#register-form .role').forEach(r => r.classList.remove('selected'));

        // Redirect or switch form
        setTimeout(() => {
            document.querySelector('.form-switcher[data-target="login"]').click();
        }, 2000);

    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        document.getElementById('register-loading').innerText = '';
        document.getElementById('register-button').disabled = false;
    }
});

// === LOGIN ===
document.getElementById('login-button').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const role = document.querySelector('#login-form .role.selected')?.getAttribute('data-role');

    if (!email || !password || !role) {
        showNotification('Please fill in all login fields and select role.', 'error');
        return;
    }

        // === Enforce ".sdf" email rule for Admins ===
    if (role === 'admin' && !email.includes('.sdf')) {
        showNotification("Incorrect email", 'error');
        return;
    }

    document.getElementById('login-loading').innerText = 'Logging in...';
    document.getElementById('login-button').disabled = true;

    try {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (loginError) throw loginError;

        const userId = loginData.user.id;

        // Fetch user from 'users' table
        const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('user_id', userId)
            .single();

        if (profileError) throw profileError;

        if (userProfile.role !== role) {
            showNotification(`Incorrect role selected for this account.`, 'error');
            return;
        }

        // Redirect based on role
        if (role === 'admin') {
            window.location.href = '/Frontend/Admin/admin-dashboard.html';
        } else {
            window.location.href = '/Frontend/Student/student-dashboard.html';
        }

    } catch (error) {
        showNotification(error.message || 'Login failed', 'error');
    } finally {
        document.getElementById('login-loading').innerText = '';
        document.getElementById('login-button').disabled = false;
    }
});
