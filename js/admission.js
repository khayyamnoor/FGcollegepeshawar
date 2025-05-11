// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Form tab navigation
  const formTabButtons = document.querySelectorAll(".form-tab-btn")
  const formTabContents = document.querySelectorAll(".form-tab-content")
  const nextButtons = document.querySelectorAll(".next-btn")
  const prevButtons = document.querySelectorAll(".prev-btn")

  // Tab button click handler
  formTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      formTabButtons.forEach((btn) => btn.classList.remove("active"))
      formTabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show corresponding content
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Next button click handler
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const nextTabId = this.getAttribute("data-next")

      // Activate next tab
      formTabButtons.forEach((btn) => {
        if (btn.getAttribute("data-tab") === nextTabId) {
          btn.click()
        }
      })

      // Scroll to top of form
      const formContainer = document.querySelector(".form-container")
      if (formContainer) {
        window.scrollTo({
          top: formContainer.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Previous button click handler
  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const prevTabId = this.getAttribute("data-prev")

      // Activate previous tab
      formTabButtons.forEach((btn) => {
        if (btn.getAttribute("data-tab") === prevTabId) {
          btn.click()
        }
      })

      // Scroll to top of form
      const formContainer = document.querySelector(".form-container")
      if (formContainer) {
        window.scrollTo({
          top: formContainer.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Program level change handler
  const programLevel = document.getElementById("programLevel")
  const programChoice = document.getElementById("programChoice")

  if (programLevel && programChoice) {
    programLevel.addEventListener("change", function () {
      const level = this.value

      // Clear existing options
      programChoice.innerHTML = '<option value="">Select a program</option>'

      // Add options based on selected level
      if (level === "intermediate") {
        const intermediatePrograms = ["Pre-Medical", "Pre-Engineering", "Computer Science", "Arts", "Arts State"]

        intermediatePrograms.forEach((program) => {
          const option = document.createElement("option")
          option.value = program.toLowerCase().replace(/\s+/g, "-")
          option.textContent = program
          programChoice.appendChild(option)
        })
      } else if (level === "bs") {
        const bsPrograms = ["Computer Science and IT", "Political Science", "Economics", "BBA (Hons)"]

        bsPrograms.forEach((program) => {
          const option = document.createElement("option")
          option.value = program.toLowerCase().replace(/\s+/g, "-")
          option.textContent = program
          programChoice.appendChild(option)
        })
      }
    })
  }

  // Percentage calculation for Matric
  const matricTotal = document.getElementById("matricTotal")
  const matricObtained = document.getElementById("matricObtained")
  const matricPercentage = document.getElementById("matricPercentage")

  if (matricTotal && matricObtained && matricPercentage) {
    function calculateMatricPercentage() {
      const total = Number.parseFloat(matricTotal.value)
      const obtained = Number.parseFloat(matricObtained.value)

      if (!isNaN(total) && !isNaN(obtained) && total > 0) {
        const percentage = (obtained / total) * 100
        matricPercentage.value = percentage.toFixed(2) + "%"
      } else {
        matricPercentage.value = ""
      }
    }

    matricTotal.addEventListener("input", calculateMatricPercentage)
    matricObtained.addEventListener("input", calculateMatricPercentage)
  }

  // Percentage calculation for Intermediate
  const interTotal = document.getElementById("interTotal")
  const interObtained = document.getElementById("interObtained")
  const interPercentage = document.getElementById("interPercentage")

  if (interTotal && interObtained && interPercentage) {
    function calculateInterPercentage() {
      const total = Number.parseFloat(interTotal.value)
      const obtained = Number.parseFloat(interObtained.value)

      if (!isNaN(total) && !isNaN(obtained) && total > 0) {
        const percentage = (obtained / total) * 100
        interPercentage.value = percentage.toFixed(2) + "%"
      } else {
        interPercentage.value = ""
      }
    }

    interTotal.addEventListener("input", calculateInterPercentage)
    interObtained.addEventListener("input", calculateInterPercentage)
  }

  // Form submission
  const admissionForm = document.getElementById("admissionForm")

  if (admissionForm) {
    admissionForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitBtn = this.querySelector(".submit-btn")
      submitBtn.innerHTML = "Submitting..."
      submitBtn.disabled = true

      setTimeout(() => {
        // Show success message
        const formContainer = document.querySelector(".form-container")

        if (formContainer) {
          // Create success message
          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.innerHTML = `
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Application Submitted Successfully!</h3>
            <p>Thank you for your application. Your application has been submitted successfully. You will receive a confirmation email shortly.</p>
            <p>Your application reference number: <strong>APP-${Math.floor(Math.random() * 1000000)}</strong></p>
            <a href="index.html" class="cta-button">Return to Homepage</a>
          `

          // Style success message
          successMessage.style.backgroundColor = "#f8f9fa"
          successMessage.style.padding = "40px"
          successMessage.style.borderRadius = "8px"
          successMessage.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)"
          successMessage.style.textAlign = "center"

          // Replace form with success message
          formContainer.innerHTML = ""
          formContainer.appendChild(successMessage)

          // Scroll to top of success message
          window.scrollTo({
            top: formContainer.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }, 2000)
    })
  }

  // Programs tab functionality
  const programsTabButtons = document.querySelectorAll(".programs-section .tab-btn")
  const programsTabContents = document.querySelectorAll(".programs-section .tab-content")

  programsTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      programsTabButtons.forEach((btn) => btn.classList.remove("active"))
      programsTabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show corresponding content
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })
})
