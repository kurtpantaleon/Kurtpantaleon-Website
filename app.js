const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//Carousel

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevArrow = carousel.querySelector(".left-arrow");
    const nextArrow = carousel.querySelector(".right-arrow");
    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * 100; // Slide offset
      slides.forEach((slide) => {
        slide.style.transform = `translateX(${offset}%)`;
      });
    }

    function resetCarousel() {
      currentIndex = 0;
      slides.forEach((slide) => {
        slide.style.transition = "none"; // Remove transition for immediate reset
        slide.style.transform = `translateX(0%)`; // Jump back to the first slide
      });

      // Re-enable transition for smooth sliding
      setTimeout(() => {
        slides.forEach((slide) => {
          slide.style.transition = "transform 0.5s ease-in-out";
        });
      }, 50); // Slight delay to avoid CSS rendering issues
    }

    prevArrow.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
    });

    nextArrow.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) {
        currentIndex += 1;
      } else {
        resetCarousel();
      }
      updateCarousel();
    });

    // Auto-play functionality
    setInterval(() => {
      if (currentIndex < slides.length - 1) {
        currentIndex += 1;
        updateCarousel();
      } else {
        resetCarousel();
      }
    }, 5000); // Change slide every 5 seconds
  });
});

// Projects Pagination
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll("#projects .card");
  const page1Btn = document.getElementById("page1-btn");
  const page2Btn = document.getElementById("page2-btn");
  const page3Btn = document.getElementById("page3-btn");
  function showPage(page) {
    projectCards.forEach((card, i) => {
      const parent = card.parentElement;
      if (page === 1) {
        parent.style.display = i < 6 ? "block" : "none";
      } else if (page === 2) {
        parent.style.display = i >= 6 && i < 12 ? "block" : "none";
      } else if (page === 3) {
        parent.style.display = i >= 12 ? "block" : "none";
      }
    });
    page1Btn.classList.toggle("active", page === 1);
    page2Btn.classList.toggle("active", page === 2);
    page3Btn.classList.toggle("active", page === 3);
  }
  if (page1Btn && page2Btn && page3Btn) {
    page1Btn.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(1);
    });
    page2Btn.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(2);
    });
    page3Btn.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(3);
    });
    showPage(1);
  }
});
