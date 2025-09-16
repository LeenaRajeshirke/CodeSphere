document.addEventListener("DOMContentLoaded", () => {
  const indicator = document.getElementById("scrollIndicator");
  const target = document.getElementById("target");
  const cards = document.querySelectorAll(".card");

  function scrollToTarget() {
    const top = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  indicator.addEventListener("click", scrollToTarget);
  indicator.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTarget();
    }
  });

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, idx) => {
            setTimeout(() => card.classList.add("visible"), idx * 120);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.18 });

    obs.observe(document.getElementById("cards"));
  } else {
    cards.forEach(c => c.classList.add("visible"));
  }
});

