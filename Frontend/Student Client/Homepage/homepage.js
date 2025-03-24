document.addEventListener("DOMContentLoaded", () => {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', (e) => {
        alert('Redirecting to Dashboard...');
    });
});