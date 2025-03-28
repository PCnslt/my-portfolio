
// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Form submission handling
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    to: 'mushfiqrhmn1@gmail.com'
  };

  // You would need to set up a server endpoint to handle this
  fetch('/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    alert('Message sent successfully!');
    form.reset();
  })
  .catch(error => {
    alert('Error sending message. Please try again.');
  });
});

// Scroll-based navigation highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href').slice(1) === section.id ? '#3498db' : 'white';
      });
    }
  });
});

// Back to Top button functionality
const backToTopButton = document.querySelector('.back-to-top');

const toggleBackToTop = () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
};

window.addEventListener('scroll', toggleBackToTop);

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
