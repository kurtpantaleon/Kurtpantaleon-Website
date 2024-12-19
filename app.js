const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting){
      entry.target.classList.add('show');
    }else{
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el))

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
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
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

