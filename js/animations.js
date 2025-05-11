// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal animation
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom")

  function checkReveal() {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const delay = element.getAttribute("data-delay") || 0

      if (elementTop < windowHeight - revealPoint) {
        setTimeout(() => {
          element.classList.add("active")
        }, delay)
      }
    })
  }

  // Initial check
  checkReveal()

  // Check on scroll
  window.addEventListener("scroll", checkReveal)

  // Staggered animation for list items
  const staggerContainers = document.querySelectorAll(".stagger-container")

  staggerContainers.forEach((container) => {
    const items = container.querySelectorAll(".stagger-item")

    function checkStagger() {
      const containerTop = container.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (containerTop < windowHeight - 150) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("active")
          }, 100 * index)
        })
      }
    }

    // Initial check
    checkStagger()

    // Check on scroll
    window.addEventListener("scroll", checkStagger)
  })

  // Hero section parallax effect
  const heroSection = document.querySelector(".hero")

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset
      if (scrollPosition < window.innerHeight) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + "px"
      }
    })
  }

  // Animate numbers on scroll
  const numberElements = document.querySelectorAll(".animate-number")

  numberElements.forEach((element) => {
    const targetNumber = Number.parseInt(element.getAttribute("data-target"))
    const duration = Number.parseInt(element.getAttribute("data-duration")) || 2000
    let startTimestamp = null
    const startValue = 0

    function animateNumber(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentNumber = Math.floor(progress * (targetNumber - startValue) + startValue)

      element.textContent = currentNumber.toLocaleString()

      if (progress < 1) {
        window.requestAnimationFrame(animateNumber)
      } else {
        element.textContent = targetNumber.toLocaleString()
      }
    }

    function checkScroll() {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100 && !element.classList.contains("animated")) {
        element.classList.add("animated")
        window.requestAnimationFrame(animateNumber)
      }
    }

    // Initial check
    checkScroll()

    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  })

  // Image hover effect
  const hoverImages = document.querySelectorAll(".hover-image")

  hoverImages.forEach((image) => {
    image.addEventListener("mousemove", function (e) {
      const { left, top, width, height } = this.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      this.style.transform = `scale(1.05) perspective(1000px) rotateX(${(y - 0.5) * 10}deg) rotateY(${(x - 0.5) * -10}deg)`
    })

    image.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) perspective(1000px) rotateX(0) rotateY(0)"
    })
  })
})
