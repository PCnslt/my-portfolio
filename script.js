document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      // Check if the link is internal (#...)
      if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
               // Calculate position accounting for fixed header height
              const headerOffset = document.querySelector('header').offsetHeight;
              const elementPosition = targetSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });

              // Optionally close mobile menu if you add one later
          }
      }
      // Allow default behavior for external links
  });
});


// --- Form submission handling (REMOVED) ---
// The code related to 'form.addEventListener('submit', ...)' has been removed
// as the form element no longer exists in the HTML.


// Scroll-based navigation highlighting (Simple version)
// Note: This simple version highlights based on section visibility.
// A more robust solution might use Intersection Observer API.
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('main section[id]'); // Select only sections in main with an ID
  const navLinks = document.querySelectorAll('nav a');
  const headerHeight = document.querySelector('header').offsetHeight;
  let currentSectionId = '';

  sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 50; // Adjusted threshold
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
      }
  });

  navLinks.forEach(link => {
      link.classList.remove('active'); // Use class for styling active link
      // Check if the link's href matches the current section ID
      if (link.getAttribute('href') === '#' + currentSectionId) {
          link.classList.add('active');
      }
  });
});

// Back to Top button functionality
const backToTopButton = document.querySelector('.back-to-top');

const toggleBackToTop = () => {
  // Show button if scrolled down more than ~300px
  if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
  } else {
      backToTopButton.classList.remove('visible');
  }
};

// Listen for scroll events
window.addEventListener('scroll', toggleBackToTop);

// Smooth scroll to top when button is clicked
backToTopButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default button behavior
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});


// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,       // Animation duration in ms
  offset: 100,         // Offset (in px) from the original trigger point
  easing: 'ease-in-out', // Default easing for AOS animations
  once: true,          // Whether animation should happen only once - while scrolling down
  mirror: false,       // Whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
});