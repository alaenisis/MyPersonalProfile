document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for scroll animations
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.fade-up');

    const appearOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Example API request using fetch
    async function getGitHubRepos() {
        const response = await fetch('https://api.github.com/users/alaenisis/repos');
        const repos = await response.json();
        const repoSection = document.querySelector('#projects');

        repos.slice(0, 3).forEach(repo => {
            const project = document.createElement('div');
            project.classList.add('project-card');
            project.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available.'}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            `;
            project.classList.add('fade-in');
            repoSection.appendChild(project);
        });
    }

    getGitHubRepos();
});

function toggleReadMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readMoreBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read More";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read Less";
        moreText.style.display = "inline";
    } 
}
let currentIndex = 0;

function showImage(index) {
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;
    if (index >= totalImages) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalImages - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100; // Move carousel by 100% of the container width
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

function nextImage() {
    showImage(currentIndex + 1);
}

function prevImage() {
    showImage(currentIndex - 1);
}

// Initialize the carousel
showImage(currentIndex);

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.querySelector('input[name="name"]');
    let email = document.querySelector('input[name="email"]');
    let message = document.getElementById("msg");
    let password = document.querySelector('input[name="password"]');
    let confirmPassword = document.querySelector('input[name="confirm-password"]');

    let isValid = true;

    clearErrors();
    if (name && name.value.trim() === "") {
        showError(name, "Name is required.");
        isValid = false;
    }

    if (email && email.value.trim() === "") {
        showError(email, "Email is required.");
        isValid = false;
    } else if (email && !validateEmail(email.value)) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    if (message && message.value.trim() === "") {
        showError(message, "Message is required.");
        isValid = false;
    }
    if (password && password.value.trim() === "") {
        showError(password, "Password is required.");
        isValid = false;
    }

    if (confirmPassword && confirmPassword.value.trim() === "") {
        showError(confirmPassword, "Please confirm your password.");
        isValid = false;
    } else if (confirmPassword && password && confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match.");
        isValid = false;
    }

    if (isValid) {
        this.submit();
    }
});

function clearErrors() {
    let errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(error => error.textContent = "");
}

function showError(element, message) {
    let errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error')) {
        errorElement.textContent = message;
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

