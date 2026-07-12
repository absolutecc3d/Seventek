const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector(".form-message");

// Initialize EmailJS
emailjs.init({ publicKey: "wAZidcHvXkGKy6nOj" });

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);
revealItems.forEach((item) => revealObserver.observe(item));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector(".submit-button");
  const originalText = button.innerHTML;

  button.disabled = true;
  button.textContent = "Sending...";
  formMessage.textContent = "";

  emailjs.sendForm("service_yshqaxn", "template_prb0l0t", contactForm)
    .then(() => {
      button.textContent = "Request received";
      formMessage.textContent = "Thanks — your project request has been sent. We'll be in touch soon.";
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
        contactForm.reset();
      }, 2600);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      button.disabled = false;
      button.innerHTML = originalText;
      formMessage.textContent = "Something went wrong sending your request. Please try again or contact us directly.";
    });
});

document.querySelector("#year").textContent = new Date().getFullYear();