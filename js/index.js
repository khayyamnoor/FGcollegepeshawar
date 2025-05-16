// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Program tabs functionality
  const tabButtons = document.querySelectorAll(".programs-tabs .tab-btn")
  const tabContents = document.querySelectorAll(".programs-tabs .tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show corresponding content
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Testimonial slider functionality
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".dot")
  let currentSlide = 0
  let testimonialInterval

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all dots
    testimonialDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected slide
    testimonialSlides[index].classList.add("active")
    testimonialDots[index].classList.add("active")
    currentSlide = index
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  }

  // Initialize testimonial slider
  if (testimonialSlides.length > 0) {
    // Start automatic slideshow
    testimonialInterval = setInterval(nextSlide, 5000)

    // Add click event to dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(testimonialInterval)
        showSlide(index)
        testimonialInterval = setInterval(nextSlide, 5000)
      })
    })

    // Pause slideshow on hover
    const testimonialSlider = document.querySelector(".testimonials-slider")
    if (testimonialSlider) {
      testimonialSlider.addEventListener("mouseenter", () => {
        clearInterval(testimonialInterval)
      })

      testimonialSlider.addEventListener("mouseleave", () => {
        testimonialInterval = setInterval(nextSlide, 5000)
      })
    }
  }

  // Gallery navigation
  const galleryItems = document.querySelectorAll(".gallery-item")
  const galleryPrev = document.querySelector(".gallery-prev")
  const galleryNext = document.querySelector(".gallery-next")
  let visibleItems = 3 // Default for desktop
  let currentIndex = 0

  function updateVisibleItems() {
    if (window.innerWidth < 768) {
      visibleItems = 1
    } else if (window.innerWidth < 992) {
      visibleItems = 2
    } else {
      visibleItems = 3
    }
  }

  function updateGallery() {
    galleryItems.forEach((item, index) => {
      if (index >= currentIndex && index < currentIndex + visibleItems) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })
  }

  if (galleryItems.length > 0) {
    updateVisibleItems()
    updateGallery()

    window.addEventListener("resize", () => {
      updateVisibleItems()
      updateGallery()
    })

    if (galleryPrev) {
      galleryPrev.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--
          updateGallery()
        }
      })
    }

    if (galleryNext) {
      galleryNext.addEventListener("click", () => {
        if (currentIndex < galleryItems.length - visibleItems) {
          currentIndex++
          updateGallery()
        }
      })
    }
  }

  // Stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number")
  let countersStarted = false

  function startCounting() {
    if (countersStarted) return

    countersStarted = true

    statNumbers.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-count"))
      const duration = 2000 // 2 seconds
      const step = target / (duration / 16) // 60fps
      let current = 0

      const updateCounter = () => {
        current += step
        if (current < target) {
          counter.textContent = Math.floor(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Check if stats section is in viewport
  function checkStatsVisibility() {
    const statsSection = document.querySelector(".stats-counter")
    if (!statsSection) return

    const rect = statsSection.getBoundingClientRect()
    const isVisible = rect.top <= window.innerHeight * 0.8

    if (isVisible) {
      startCounting()
      window.removeEventListener("scroll", checkStatsVisibility)
    }
  }

  window.addEventListener("scroll", checkStatsVisibility)
  checkStatsVisibility() // Check on page load

  // Parallax effect for admission section
  const parallaxContainer = document.querySelector(".parallax-container")

  if (parallaxContainer) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset
      const containerTop = parallaxContainer.offsetTop
      const containerHeight = parallaxContainer.offsetHeight

      if (scrollPosition > containerTop - window.innerHeight && scrollPosition < containerTop + containerHeight) {
        const yPos = -(scrollPosition - containerTop) * 0.2
        parallaxContainer.style.backgroundPosition = `center ${yPos}px`
      }
    })
  }

  // Video fallback
  const heroVideo = document.getElementById("hero-video")

  if (heroVideo) {
    // We're now using the background image by default, so we don't need to handle video errors
    heroVideo.style.display = "none"

    // If you want to enable video on certain conditions, you can uncomment this:
    /*
    heroVideo.addEventListener("canplaythrough", () => {
      // If video can play, show it instead of the image
      heroVideo.style.display = "block"
    })
    
    heroVideo.addEventListener("error", () => {
      // If video fails, ensure it's hidden (image will show)
      heroVideo.style.display = "none"
    })
    */
  }
})
