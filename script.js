(function () {
  const track = document.getElementById("services-track");
  if (!track) return;

  const step = 280;
  const buttons = document.querySelectorAll(".carousel-arrow");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const direction = this.getAttribute("data-direction");
      const offset = direction === "left" ? -step : step;
      track.scrollBy({ left: offset, behavior: "smooth" });
    });
  });

  track.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      track.scrollBy({ left: -step, behavior: "smooth" });
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  });
})();

(function () {
  const sqftInput = document.getElementById("sqftInput");
  const sqftLabel = document.getElementById("sqftLabel");
  const rooms = document.getElementById("rooms");
  const serviceType = document.getElementById("serviceType");
  const ecoFriendly = document.getElementById("ecoFriendly");
  const finalPriceDisplay = document.getElementById("finalPrice");

  if (!sqftInput || !sqftLabel || !rooms || !serviceType || !ecoFriendly || !finalPriceDisplay) {
    return;
  }

  function calculate() {
    const sqft = parseInt(sqftInput.value, 10);
    const roomCount = parseInt(rooms.value, 10);

    let total = 80;
    total += sqft * 0.05;
    total += roomCount * 15;

    if (serviceType.value === "deep") total *= 1.3;
    if (serviceType.value === "move") total *= 1.5;

    if (ecoFriendly.checked) total += 10;

    sqftLabel.textContent = String(sqft);
    finalPriceDisplay.textContent = total.toFixed(2);
  }

  [sqftInput, rooms, serviceType].forEach(function (el) {
    el.addEventListener("input", calculate);
  });
  ecoFriendly.addEventListener("change", calculate);

  calculate();
})();

(function () {
  const revealItems = document.querySelectorAll(".section-reveal");
  if (!revealItems.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

  const parallaxTarget = document.querySelector("[data-parallax]");
  if (parallaxTarget) {
    window.addEventListener(
      "scroll",
      () => {
        const speed = Number(parallaxTarget.getAttribute("data-parallax")) || 0.08;
        const offset = Math.min(window.scrollY * speed, 50);
        parallaxTarget.style.transform = `translateY(${offset}px)`;
      },
      { passive: true }
    );
  }
})();

(function () {
  const form = document.getElementById("reviewSubmissionForm");
  const stars = document.querySelectorAll(".review-star");
  const ratingInput = document.getElementById("reviewRating");
  const errorDisplay = document.getElementById("reviewFormError");

  if (!form || !stars.length || !ratingInput || !errorDisplay) return;

  function paintStars(value) {
    stars.forEach((star) => {
      const starValue = Number(star.dataset.value);
      star.classList.toggle("is-active", starValue <= value);
    });
  }

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = Number(star.dataset.value);
      ratingInput.value = String(value);
      paintStars(value);
      errorDisplay.textContent = "";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorDisplay.style.color = "#b91c1c";
    errorDisplay.textContent = "";

    const name = document.getElementById("reviewName");
    const email = document.getElementById("reviewEmail");
    const message = document.getElementById("reviewMessage");

    if (!name || !email || !message) return;

    const trimmedName = name.value.trim();
    const trimmedEmail = email.value.trim();
    const trimmedMessage = message.value.trim();
    const rating = Number(ratingInput.value);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedName || !emailValid || rating < 1 || rating > 5 || trimmedMessage.length < 15) {
      errorDisplay.textContent = "Please complete all fields, add a valid email, choose a rating, and write at least 15 characters.";
      return;
    }

    form.reset();
    ratingInput.value = "";
    paintStars(0);
    errorDisplay.style.color = "#047857";
    errorDisplay.textContent = "Thanks! Your review has been submitted successfully.";
  });
})();

(function () {
  const year = document.getElementById("footerYear");
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
})();

(function () {
  const form = document.getElementById("contactPageForm");
  const message = document.getElementById("contactFormMessage");
  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.style.color = "#b91c1c";
    message.textContent = "";

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const phone = document.getElementById("contactPhone");
    const subject = document.getElementById("contactSubject");
    const text = document.getElementById("contactMessage");

    if (!name || !email || !phone || !subject || !text) return;

    const values = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      subject: subject.value.trim(),
      text: text.value.trim(),
    };

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    const phoneValid = /^[0-9+()\-\s]{7,}$/.test(values.phone);

    if (!values.name || !emailValid || !phoneValid || !values.subject || values.text.length < 12) {
      message.textContent = "Please complete all fields with a valid email, phone number, and a detailed message.";
      return;
    }

    form.reset();
    message.style.color = "#047857";
    message.textContent = "Thank you. Your message has been sent successfully.";
  });
})();
