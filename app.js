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
  const slides = document.querySelectorAll(".carousel-slide");
  const prevArrow = document.getElementById("prev-arrow");
  const nextArrow = document.getElementById("next-arrow");
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100; // Slide offset
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${offset}%)`;
    });
  }

  prevArrow.addEventListener("click", () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
  });

  nextArrow.addEventListener("click", () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Optional: Auto-play functionality
  setInterval(() => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  }, 5000); // Change slide every 5 seconds
});