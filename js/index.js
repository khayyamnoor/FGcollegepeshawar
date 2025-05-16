// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  initAnimations()

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

  // Initialize testimonial slider
  initTestimonialSlider()

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

  // Initialize gallery navigation
  initGalleryNav()

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

  // Initialize stats counter
  initStatsCounter()

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

  // Fix parallax on mobile
  fixParallaxOnMobile()

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

  // Handle responsive navigation
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll("a")
    links.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  }

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top")
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
})

// Initialize animations
function initAnimations() {
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")

  const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight
      const elementTop = revealElements[i].getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add("active")
      }
    }
  }

  window.addEventListener("scroll", revealOnScroll)
  revealOnScroll() // Check on load
}

// Initialize tabs
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      const tabId = button.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Initialize testimonial slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  let currentSlide = 0

  // Set up dot click handlers
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = Number.parseInt(dot.getAttribute("data-slide"))
      showSlide(currentSlide)
    })
  })

  // Auto rotate slides
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }, 5000)

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    slides[index].classList.add("active")
    dots[index].classList.add("active")
  }
}

// Initialize gallery navigation
function initGalleryNav() {
  const galleryContainer = document.querySelector(".gallery-container")
  const prevButton = document.querySelector(".gallery-prev")
  const nextButton = document.querySelector(".gallery-next")

  if (!galleryContainer || !prevButton || !nextButton) return

  let scrollAmount = 0
  const scrollStep = 350 // Adjust based on your gallery item width + gap

  prevButton.addEventListener("click", () => {
    scrollAmount = Math.max(scrollAmount - scrollStep, 0)
    galleryContainer.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
  })

  nextButton.addEventListener("click", () => {
    scrollAmount = Math.min(scrollAmount + scrollStep, galleryContainer.scrollWidth - galleryContainer.clientWidth)
    galleryContainer.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
  })

  // Make gallery scrollable on mobile with touch
  makeGalleryScrollable()
}

// Make gallery scrollable on mobile
function makeGalleryScrollable() {
  const galleryContainer = document.querySelector(".gallery-container")
  if (!galleryContainer) return

  // Add horizontal scroll capability
  galleryContainer.style.overflowX = "auto"
  galleryContainer.style.scrollSnapType = "x mandatory"
  galleryContainer.style.display = "flex"
  galleryContainer.style.flexWrap = "nowrap"

  // Style gallery items for horizontal scrolling
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    item.style.flex = "0 0 auto"
    item.style.width = "85%"
    item.style.maxWidth = "300px"
    item.style.marginRight = "15px"
    item.style.scrollSnapAlign = "center"
  })

  // Show captions on mobile
  if (window.innerWidth <= 576) {
    galleryItems.forEach((item) => {
      const caption = item.querySelector(".gallery-caption")
      if (caption) {
        caption.style.opacity = "1"
        caption.style.transform = "translateY(0)"
      }
    })
  }
}

// Initialize stats counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")
  let counted = false

  const countStats = () => {
    if (counted) return

    const statsSection = document.querySelector(".stats-counter")
    if (!statsSection) return

    const sectionTop = statsSection.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (sectionTop < windowHeight - 100) {
      statNumbers.forEach((stat) => {
        const targetNumber = Number.parseInt(stat.getAttribute("data-count"))
        const duration = 2000 // 2 seconds
        const step = targetNumber / (duration / 16) // 60fps

        let current = 0
        const timer = setInterval(() => {
          current += step
          if (current > targetNumber) {
            stat.textContent = targetNumber
            clearInterval(timer)
          } else {
            stat.textContent = Math.floor(current)
          }
        }, 16)
      })

      counted = true
    }
  }

  window.addEventListener("scroll", countStats)
  countStats() // Check on load
}

// Fix parallax on mobile
function fixParallaxOnMobile() {
  const parallaxContainer = document.querySelector(".parallax-container")
  if (!parallaxContainer) return

  if (window.innerWidth <= 768) {
    parallaxContainer.style.backgroundAttachment = "scroll"
  }
}
