const testimonial_slider = document.querySelector(".testimonials-sliders");
var testimonial_slider_w = window.innerWidth;

const testimonialsSlides = document.querySelectorAll(
  `${
    testimonial_slider_w > 520
      ? ".testimonials-slide"
      : ".testimonials-slide-inner"
  } `
);
const testimonialsNextButton = document.getElementById("testimonials-next");
const testimonials_prevButton = document.getElementById("testimonials-prev");

let testimonialsSlideIndex = 0;
let testimonialsAutoSlideInterval;
let testimonialsIsAutoSliding = true; // Initially auto sliding is on

// Calculate slide width based on viewport
const testimonialsGetSlideWidth = () => testimonialsSlides[0].offsetWidth;

// Update slider transform
const testimonialsUpdateSlider = () => {
  testimonial_slider.style.transform = `translateX(-${
    testimonialsSlideIndex * testimonialsGetSlideWidth()
  }px)`;
};

// Move to next slide
const testimonialsNextSlide = () => {
  testimonialsSlideIndex =
    (testimonialsSlideIndex + 1) % testimonialsSlides.length;
  testimonialsUpdateSlider();
};

// Move to previous slide
const testimonialsPrevSlide = () => {
  testimonialsSlideIndex =
    (testimonialsSlideIndex - 1 + testimonialsSlides.length) %
    testimonialsSlides.length;
  testimonialsUpdateSlider();
};

// Auto slide
const testimonialsStartAutoSlide = () => {
  if (!testimonialsIsAutoSliding) return; // Only run if auto-sliding is enabled
  testimonialsAutoSlideInterval = setInterval(() => {
    if (testimonialsIsAutoSliding) testimonialsNextSlide();
  }, 3000);
};

// Stop auto slide
const testimonialsStopAutoSlide = () => {
  clearInterval(testimonialsAutoSlideInterval);
};

// Next/Prev button clicks
testimonialsNextButton.addEventListener("click", () => {
  testimonialsStopAutoSlide(); // Stop auto-slide when button is clicked
  testimonialsNextSlide();
  if (testimonialsIsAutoSliding) testimonialsStartAutoSlide(); // Re-enable auto-slide after button click
});
testimonials_prevButton.addEventListener("click", () => {
  testimonialsStopAutoSlide(); // Stop auto-slide when button is clicked
  testimonialsPrevSlide();
  if (testimonialsIsAutoSliding) testimonialsStartAutoSlide(); // Re-enable auto-slide after button click
});

// Hover effects (slider container)
testimonial_slider.addEventListener("mouseenter", () => {
  testimonialsIsAutoSliding = false; // Stop auto-slide when hovering over the slider
  testimonialsStopAutoSlide();
});

testimonial_slider.addEventListener("mouseleave", () => {
  testimonialsIsAutoSliding = true; // Re-enable auto-slide when mouse leaves the slider
  testimonialsStartAutoSlide();
});

// Hover effects (Next/Prev buttons)
testimonialsNextButton.addEventListener("mouseenter", () => {
  testimonialsIsAutoSliding = false; // Stop auto-slide when hovering over Next button
  testimonialsStopAutoSlide();
});

testimonials_prevButton.addEventListener("mouseenter", () => {
  testimonialsIsAutoSliding = false; // Stop auto-slide when hovering over Prev button
  testimonialsStopAutoSlide();
});

testimonialsNextButton.addEventListener("mouseleave", () => {
  if (testimonialsIsAutoSliding) testimonialsStartAutoSlide(); // Re-enable auto-slide when leaving Next button
});

testimonials_prevButton.addEventListener("mouseleave", () => {
  if (testimonialsIsAutoSliding) testimonialsStartAutoSlide(); // Re-enable auto-slide when leaving Prev button
});

// Responsive handling
const testimonialsHandleResize = () => {
  testimonialsUpdateSlider();
};

const allDesCription = document.querySelectorAll("testimonial-description p");
const spanBtn = document.getElementsByClassName("see_more_and_see_less_btn");

const allDescriptions = document.querySelectorAll(".testimonial-description p");
const spanBtns = document.getElementsByClassName("see_more_and_see_less_btn");

allDescriptions.forEach((description, index) => {
  const fullText = description.innerHTML.trim(); // Store full text
  const isLong = fullText.length > 400;

  if (isLong) {
    const truncatedText = fullText.substring(0, 400) + "..."; // Truncate text
    description.innerHTML = truncatedText; // Set initial truncated text

    // Get the corresponding span button
    const btn = spanBtns[index];

    // Set the button text
    btn.innerText = "Show More";
    btn.style.cursor = "pointer";

    // Add a click event listener to toggle the text
    btn.addEventListener("click", () => {
      if (btn.innerText === "Show More") {
        description.innerHTML = fullText; // Show full text
        btn.innerText = "Show Less";
      } else {
        description.innerHTML = truncatedText; // Show truncated text
        btn.innerText = "Show More";
      }
    });
  } else {
    const btn = spanBtns[index];
    btn.style.display = "none"; // Hide the button if the text is not long
  }
});

window.addEventListener("resize", testimonialsHandleResize);

// Initialize slider
testimonialsUpdateSlider();
testimonialsStartAutoSlide();

// video
// Select all videos and play buttons
const testimonials_videoContainers = document.querySelectorAll(".video-box");

testimonials_videoContainers.forEach((container) => {
  const video = container.querySelector(".video");
  const playButton = container.querySelector(".play-button");

  // Play or pause video when the play button is clicked
  playButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playButton.classList.add("hidden"); // Hide the play button
    } else {
      video.pause();
      playButton.classList.remove("hidden"); // Show the play button
    }
  });

  // Show play button when the video is paused
  video.addEventListener("pause", () => {
    playButton.classList.remove("hidden");
  });

  // Hide play button when the video starts playing
  video.addEventListener("play", () => {
    playButton.classList.add("hidden");
  });
});
