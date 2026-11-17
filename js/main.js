/*=============== MOBILE MENU: OPEN / CLOSE ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

// Guards keep the script from throwing if an optional element is missing
if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}

if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

// =============== CLOSE MENU ON LINK CLICK (MOBILE) ===============
const navLink = document.querySelectorAll('.nav__link');
const linkAction = () => navMenu.classList.remove('show-menu');
navLink.forEach(n => n.addEventListener('click', linkAction));

// =============== RESUME: VIEW + DOWNLOAD ON A SINGLE CLICK ===============
const resumeBtn = document.getElementById('resume-btn');

if (resumeBtn) {
    const resumePreviewUrl = 'https://drive.google.com/file/d/1cjVJ08UHQQA9qx5L7nbBMlFuIM8kA1_P/preview';
    const resumeDownloadUrl = 'https://drive.google.com/uc?export=download&id=1cjVJ08UHQQA9qx5L7nbBMlFuIM8kA1_P';

    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 1) Open the resume preview in a new browser tab
        window.open(resumePreviewUrl, '_blank', 'noopener,noreferrer');

        // 2) Trigger the download (Drive serves it with Content-Disposition: attachment)
        const downloadLink = document.createElement('a');
        downloadLink.href = resumeDownloadUrl;
        downloadLink.setAttribute('download', '');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
}

// =============== SHADOW HEADER ===============
// Add a subtle shadow to the fixed header once the page is scrolled
const shadowHeader = () => {
    const header = document.getElementById('header');
    window.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
}
window.addEventListener('scroll', shadowHeader);

// =============== EMAIL JS ===============
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();
    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_t9rzqhh', 'template_p3vutdm', '#contact-form', 'G3krna5eWFQay2n-u')
        .then(() => {
            // Show success message, then clear it after a few seconds
            contactMessage.textContent = 'Message sent successfully ✅';
            // Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
            // Clear input fields
            contactForm.reset();

        }, () => {
            // Show error message
            contactMessage.textContent = 'Message not sent (service error) ❌';
        });
}
contactForm.addEventListener('submit', sendEmail);

// =============== SHOW SCROLL UP ===============
// Reveal the scroll-to-top button after scrolling down the page
const scrollUp = () => {
    const scrollUpBtn = document.getElementById('scroll-up');
    window.scrollY >= 350 ? scrollUpBtn.classList.add('show-scroll') : scrollUpBtn.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        // Some sections (e.g. Education) have no matching nav link
        if (!sectionsClass) return;

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }

    });
}
window.addEventListener('scroll', scrollActive);

// =============== DARK LIGHT THEME ===============
const themeButton = document.getElementById('theme-button'),
    darkTheme = 'dark-theme',
    iconTheme = 'ri-sun-line';

// Theme the visitor chose on a previous visit, if any
const selectedTheme = localStorage.getItem('selected-theme'),
    selectedIcon = localStorage.getItem('selected-icon');

// Read the current theme/icon from the DOM so it can be persisted on toggle
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Restore the saved theme on load
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// =============== SCROLL REVEAL ANIMATION ===============
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 800,
    delay: 150
});
sr.reveal(`.home__perfil, .about__image, .contact__mail`, { origin: 'right' });
sr.reveal(`.home__name, .home__info, .about__container .section__title-1, .about__info, .contact__social, .contact__data`, { origin: 'left' });
sr.reveal(`.skills__content, .projects__card, .experience__card, .education__card`, { interval: 100 });