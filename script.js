const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => observer.observe(item));

const printButton = document.getElementById('printCv');
if (printButton) {
  printButton.addEventListener('click', () => {
    window.print();
  });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill out all fields before sending your message.';
      formStatus.style.color = '#fbbf24';
      return;
    }

    formStatus.textContent = `Thank you, ${name}! Your message has been drafted successfully.`;
    formStatus.style.color = '#f5c76b';
    contactForm.reset();
  });
}

const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'javeria-theme';

function applyTheme(isLightTheme) {
  document.body.classList.toggle('light-theme', isLightTheme);

  if (themeToggle) {
    themeToggle.textContent = isLightTheme ? '🌙' : '☀';
    themeToggle.setAttribute(
      'aria-label',
      isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'
    );
    themeToggle.setAttribute(
      'title',
      isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'
    );
  }
}

function getStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme === 'light' ? 'light' : 'dark';
  } catch (error) {
    return 'dark';
  }
}

const initialTheme = getStoredTheme();
applyTheme(initialTheme === 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = !document.body.classList.contains('light-theme') ? 'light' : 'dark';
    applyTheme(nextTheme === 'light');

    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch (error) {
      // Ignore storage errors and keep the theme in memory for the session only.
    }
  });
}

