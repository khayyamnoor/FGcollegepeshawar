// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Contact form validation and submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const subject = document.getElementById("subject").value.trim()
      const message = document.getElementById("message").value.trim()

      // Simple validation
      if (name === "" || email === "" || subject === "" || message === "") {
        showAlert("Please fill in all required fields.", "error")
        return
      }

      // Email validation
      if (!isValidEmail(email)) {
        showAlert("Please enter a valid email address.", "error")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn")
      submitBtn.innerHTML = "Sending..."
      submitBtn.disabled = true

      setTimeout(() => {
        showAlert("Your message has been sent successfully!", "success")
        contactForm.reset()
        submitBtn.innerHTML = "Send Message"
        submitBtn.disabled = false
      }, 1500)
    })
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Helper function to show alert
  function showAlert(message, type) {
    // Check if alert container exists, if not create it
    let alertContainer = document.querySelector(".alert-container")

    if (!alertContainer) {
      alertContainer = document.createElement("div")
      alertContainer.className = "alert-container"
      document.body.appendChild(alertContainer)

      // Style the alert container
      alertContainer.style.position = "fixed"
      alertContainer.style.top = "20px"
      alertContainer.style.right = "20px"
      alertContainer.style.zIndex = "9999"
    }

    // Create alert element
    const alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.innerHTML = message

    // Style the alert
    alert.style.padding = "15px 20px"
    alert.style.marginBottom = "10px"
    alert.style.borderRadius = "5px"
    alert.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
    alert.style.opacity = "0"
    alert.style.transition = "opacity 0.3s ease"

    if (type === "success") {
      alert.style.backgroundColor = "#c9a55c"
      alert.style.color = "#0c1c2c"
    } else {
      alert.style.backgroundColor = "#e74c3c"
      alert.style.color = "#fff"
    }

    // Add alert to container
    alertContainer.appendChild(alert)

    // Fade in
    setTimeout(() => {
      alert.style.opacity = "1"
    }, 10)

    // Remove after 3 seconds
    setTimeout(() => {
      alert.style.opacity = "0"
      setTimeout(() => {
        alertContainer.removeChild(alert)
      }, 300)
    }, 3000)
  }

  // Map hover effect
  const mapContainer = document.querySelector(".map-container")

  if (mapContainer) {
    mapContainer.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)"
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)"
    })

    mapContainer.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
    })
  }
})
