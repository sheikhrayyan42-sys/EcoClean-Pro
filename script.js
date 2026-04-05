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
