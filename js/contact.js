// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const name    = document.getElementById("name").value.trim()
      const email   = document.getElementById("email").value.trim()
      const subject = document.getElementById("subject").value.trim()
      const message = document.getElementById("message").value.trim()

      if (!name || !email || !subject || !message) {
        showAlert("Please fill in all required fields.", "error")
        return
      }

      if (!isValidEmail(email)) {
        showAlert("Please enter a valid email address.", "error")
        return
      }

      const submitBtn = contactForm.querySelector(".submit-btn")
      submitBtn.innerHTML = "Sending..."
      submitBtn.disabled  = true

      try {
        const { error } = await _supabase
          .from('contact_messages')
          .insert({ name, email, subject, message })

        if (error) throw new Error(error.message)

        showAlert("Your message has been sent successfully!", "success")
        contactForm.reset()
      } catch (err) {
        showAlert("Failed to send message. Please try again.", "error")
        console.error("Contact form error:", err)
      } finally {
        submitBtn.innerHTML = "Send Message"
        submitBtn.disabled  = false
      }
    })
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function showAlert(message, type) {
    let alertContainer = document.querySelector(".alert-container")

    if (!alertContainer) {
      alertContainer = document.createElement("div")
      alertContainer.className = "alert-container"
      document.body.appendChild(alertContainer)
      alertContainer.style.cssText = "position:fixed;top:20px;right:20px;z-index:9999;"
    }

    const alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.innerHTML = message
    alert.style.cssText = `
      padding:15px 20px;margin-bottom:10px;border-radius:5px;
      box-shadow:0 4px 8px rgba(0,0,0,.1);opacity:0;transition:opacity .3s ease;
      background-color:${type === "success" ? "#c9a55c" : "#e74c3c"};
      color:${type === "success" ? "#0c1c2c" : "#fff"};
    `

    alertContainer.appendChild(alert)
    setTimeout(() => { alert.style.opacity = "1" }, 10)
    setTimeout(() => {
      alert.style.opacity = "0"
      setTimeout(() => alert.remove(), 300)
    }, 3000)
  }

  // Map hover effect
  const mapContainer = document.querySelector(".map-container")
  if (mapContainer) {
    mapContainer.addEventListener("mouseenter", function () {
      this.style.transform  = "scale(1.02)"
      this.style.boxShadow  = "0 10px 30px rgba(0,0,0,.15)"
    })
    mapContainer.addEventListener("mouseleave", function () {
      this.style.transform  = "scale(1)"
      this.style.boxShadow  = "0 4px 8px rgba(0,0,0,.1)"
    })
  }
})
