document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.querySelector(".profile-form");

    profileForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullName = document.querySelector("#full-name").value;
        const email = document.querySelector("#email").value;

        alert(`Profile Updated!\n\nName: ${fullName}\nEmail: ${email}`);
    });
});
