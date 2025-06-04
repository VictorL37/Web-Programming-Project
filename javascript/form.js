document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_olfopp8", "template_0dqa8h7", templateParams)
      .then(() => {
        alert("Thank you for your message! We’ll be happy to get back to you soon.");
        form.reset();
      })
      .catch(() => {
        alert("Oops! Something went wrong. Please try again later.");
      });
  });
});
