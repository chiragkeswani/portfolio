document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a small delay based on index to create a stagger effect for elements appearing together
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 100);
        observer.unobserve(entry.target); // optional: stop observing once shown
      }
    });
  }, { threshold: 0.1 });

  const hiddenElements = document.querySelectorAll(
    ".section-title, .about p, .education, .experience-card, .skill-card, .achievement-card, .btn"
  );
  hiddenElements.forEach((el) => {
    el.classList.add("scroll-animate");
    // Add tilt class to cards for 3D effect
    if (el.classList.contains('experience-card') || el.classList.contains('skill-card') || el.classList.contains('achievement-card')) {
      el.classList.add('tilt-card');
    }
    observer.observe(el);
  });

  // 3D Tilt Effect
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // Typing Effect
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    const roles = ["BCA Student", "Full Stack Developer", "UI/UX Enthusiast", "Tech Explorer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 100 : 150);
      }
    }
    type();
  }

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      localStorage.setItem("theme", "dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  });
});

function connect() {
  const msg = document.getElementById("msg");
  msg.innerText = "Thanks for connecting! I'll get back to you soon 😊";
  msg.style.color = "#00f2ea";
  msg.style.marginTop = "15px";
}