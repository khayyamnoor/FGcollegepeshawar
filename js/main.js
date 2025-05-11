// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden")
    }, 500)
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (navLinks && navLinks.classList.contains("active") && !event.target.closest(".nav-container")) {
      menuToggle.classList.remove("active")
      navLinks.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })

  // Back to Top Button
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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      e.preventDefault()

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains("active")) {
          menuToggle.classList.remove("active")
          navLinks.classList.remove("active")
          document.body.classList.remove("menu-open")
        }
      }
    })
  })

  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split("/").pop()

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href")

    if (currentPage === linkPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active")
    } else if (currentPage === "index.html" && linkPage === "index.html") {
      link.classList.add("active")
    }
  })
})
