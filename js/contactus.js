let messages = [];

export function contactUs() {
  const mainContent = document.getElementById("main-content");

  const contactForm = `
    <section id="contact-section" class="contact-section">
      <header class="contact-header">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Fill out the form below.</p>
      </header>
      <form id="contact-form" class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
      <p id="form-status" class="form-status"></p>
    </section>
  `;

  mainContent.innerHTML = contactForm;

  // Handle form submission
  const contactFormEl = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    messages.push({ name, email, message });

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    formStatus.textContent = "Message sent successfully!";
    formStatus.style.color = "green";

    contactFormEl.reset();
  });
}
export function getMessages() {
  return messages;
}
