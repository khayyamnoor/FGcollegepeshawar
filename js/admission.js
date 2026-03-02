// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Form validation and error handling
  class FormValidator {
    constructor() {
      this.errors = {}
      this.isValid = true
    }

    // Validate required fields
    validateRequired(field, value, fieldName) {
      if (!value || value.trim() === '') {
        this.errors[field] = `${fieldName} is required`
        this.isValid = false
        return false
      }
      return true
    }

    // Validate email format
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.errors.email = 'Please enter a valid email address'
        this.isValid = false
        return false
      }
      return true
    }

    // Validate phone number
    validatePhone(phone) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
      if (!phoneRegex.test(phone)) {
        this.errors.phone = 'Please enter a valid phone number'
        this.isValid = false
        return false
      }
      return true
    }

    // Validate CNIC format
    validateCNIC(cnic) {
      const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/
      if (!cnicRegex.test(cnic)) {
        this.errors.cnic = 'Please enter CNIC in format: 12345-1234567-1'
        this.isValid = false
        return false
      }
      return true
    }

    // Validate date (must be in the past)
    validateDate(date, fieldName) {
      const selectedDate = new Date(date)
      const today = new Date()
      if (selectedDate >= today) {
        this.errors[fieldName] = 'Date must be in the past'
        this.isValid = false
        return false
      }
      return true
    }

    // Validate percentage
    validatePercentage(percentage, fieldName) {
      const num = parseFloat(percentage)
      if (isNaN(num) || num < 0 || num > 100) {
        this.errors[fieldName] = 'Percentage must be between 0 and 100'
        this.isValid = false
        return false
      }
      return true
    }

    // Validate marks (obtained should not exceed total)
    validateMarks(obtained, total, fieldName) {
      const obtainedNum = parseFloat(obtained)
      const totalNum = parseFloat(total)
      
      if (obtainedNum > totalNum) {
        this.errors[fieldName] = 'Obtained marks cannot exceed total marks'
        this.isValid = false
        return false
      }
      return true
    }

    // Clear errors
    clearErrors() {
      this.errors = {}
      this.isValid = true
      document.querySelectorAll('.error-message').forEach(el => el.remove())
      document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'))
    }

    // Show error message
    showError(field, message) {
      const formGroup = document.querySelector(`[name="${field}"]`).closest('.form-group')
      formGroup.classList.add('error')
      
      // Remove existing error message
      const existingError = formGroup.querySelector('.error-message')
      if (existingError) {
        existingError.remove()
      }
      
      // Add new error message
      const errorDiv = document.createElement('div')
      errorDiv.className = 'error-message'
      errorDiv.textContent = message
      errorDiv.style.color = '#e74c3c'
      errorDiv.style.fontSize = '12px'
      errorDiv.style.marginTop = '5px'
      
      formGroup.appendChild(errorDiv)
    }

    // Show all errors
    showErrors() {
      Object.keys(this.errors).forEach(field => {
        this.showError(field, this.errors[field])
      })
    }
  }

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

  // Next button click handler with validation
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentTabId = this.closest('.form-tab-content').id
      const nextTabId = this.getAttribute("data-next")
      
      // Validate current tab before proceeding
      if (validateCurrentTab(currentTabId)) {
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
      } else {
        // Show error message
        showTabError(currentTabId)
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

  // Validate current tab
  function validateCurrentTab(tabId) {
    const validator = new FormValidator()
    
    switch(tabId) {
      case 'personal':
        return validatePersonalTab(validator)
      case 'academic':
        return validateAcademicTab(validator)
      case 'program':
        return validateProgramTab(validator)
      default:
        return true
    }
  }

  // Validate personal tab
  function validatePersonalTab(validator) {
    const fields = {
      fullName: 'Full Name',
      fatherName: "Father's Name",
      dob: 'Date of Birth',
      gender: 'Gender',
      cnic: 'CNIC',
      nationality: 'Nationality',
      religion: 'Religion',
      domicile: 'Domicile',
      address: 'Address',
      phone: 'Phone Number',
      email: 'Email Address',
      guardianPhone: "Guardian's Phone",
      emergencyContact: 'Emergency Contact'
    }

    let isValid = true

    Object.keys(fields).forEach(field => {
      const element = document.querySelector(`[name="${field}"]`)
      if (element) {
        const value = element.value.trim()
        
        // Required validation
        if (!validator.validateRequired(field, value, fields[field])) {
          isValid = false
        }
        
        // Specific validations
        if (field === 'email' && value) {
          if (!validator.validateEmail(value)) {
            isValid = false
          }
        }
        
        if (field === 'phone' && value) {
          if (!validator.validatePhone(value)) {
            isValid = false
          }
        }
        
        if (field === 'cnic' && value) {
          if (!validator.validateCNIC(value)) {
            isValid = false
          }
        }
        
        if (field === 'dob' && value) {
          if (!validator.validateDate(value, field)) {
            isValid = false
          }
        }
      }
    })

    if (!isValid) {
      validator.showErrors()
    }

    return isValid
  }

  // Validate academic tab
  function validateAcademicTab(validator) {
    const fields = {
      matricBoard: 'Matric Board',
      matricYear: 'Matric Year',
      matricRollNo: 'Matric Roll Number',
      matricInstitute: 'Matric Institute',
      matricTotal: 'Matric Total Marks',
      matricObtained: 'Matric Obtained Marks'
    }

    let isValid = true

    Object.keys(fields).forEach(field => {
      const element = document.querySelector(`[name="${field}"]`)
      if (element) {
        const value = element.value.trim()
        
        if (!validator.validateRequired(field, value, fields[field])) {
          isValid = false
        }
      }
    })

    // Validate marks
    const matricTotal = document.querySelector('[name="matricTotal"]')
    const matricObtained = document.querySelector('[name="matricObtained"]')
    
    if (matricTotal && matricObtained && matricTotal.value && matricObtained.value) {
      if (!validator.validateMarks(matricObtained.value, matricTotal.value, 'matricObtained')) {
        isValid = false
      }
    }

    if (!isValid) {
      validator.showErrors()
    }

    return isValid
  }

  // Validate program tab
  function validateProgramTab(validator) {
    const fields = {
      programLevel: 'Program Level',
      programChoice: 'Program Choice'
    }

    let isValid = true

    Object.keys(fields).forEach(field => {
      const element = document.querySelector(`[name="${field}"]`)
      if (element) {
        const value = element.value.trim()
        
        if (!validator.validateRequired(field, value, fields[field])) {
          isValid = false
        }
      }
    })

    // Validate declaration
    const declaration = document.querySelector('[name="declaration"]')
    if (!declaration || !declaration.checked) {
      validator.errors.declaration = 'You must agree to the declaration'
      isValid = false
    }

    if (!isValid) {
      validator.showErrors()
    }

    return isValid
  }

  // Show tab error
  function showTabError(tabId) {
    const tabContent = document.getElementById(tabId)
    const errorDiv = document.createElement('div')
    errorDiv.className = 'tab-error-message'
    errorDiv.innerHTML = `
      <div style="background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #f5c6cb;">
        <i class="fas fa-exclamation-triangle"></i> Please fix the errors above before proceeding.
      </div>
    `
    
    // Remove existing error
    const existingError = tabContent.querySelector('.tab-error-message')
    if (existingError) {
      existingError.remove()
    }
    
    tabContent.insertBefore(errorDiv, tabContent.firstChild)
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove()
      }
    }, 5000)
  }

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
        const bsPrograms = ["Computer Science", "Political Science", "English", "BBA (Hons)"]

        bsPrograms.forEach((program) => {
          const option = document.createElement("option")
          option.value = program.toLowerCase().replace(/\s+/g, "-")
          option.textContent = program
          programChoice.appendChild(option)
        })
      }
    })
  }

  // Percentage calculation for Matric with validation
  const matricTotal = document.getElementById("matricTotal")
  const matricObtained = document.getElementById("matricObtained")
  const matricPercentage = document.getElementById("matricPercentage")

  if (matricTotal && matricObtained && matricPercentage) {
    function calculateMatricPercentage() {
      const total = Number.parseFloat(matricTotal.value)
      const obtained = Number.parseFloat(matricObtained.value)

      if (!isNaN(total) && !isNaN(obtained) && total > 0) {
        if (obtained > total) {
          matricPercentage.value = "Error: Obtained > Total"
          matricPercentage.style.color = "#e74c3c"
        } else {
          const percentage = (obtained / total) * 100
          matricPercentage.value = percentage.toFixed(2) + "%"
          matricPercentage.style.color = "#28a745"
        }
      } else {
        matricPercentage.value = ""
        matricPercentage.style.color = ""
      }
    }

    matricTotal.addEventListener("input", calculateMatricPercentage)
    matricObtained.addEventListener("input", calculateMatricPercentage)
  }

  // Percentage calculation for Intermediate with validation
  const interTotal = document.getElementById("interTotal")
  const interObtained = document.getElementById("interObtained")
  const interPercentage = document.getElementById("interPercentage")

  if (interTotal && interObtained && interPercentage) {
    function calculateInterPercentage() {
      const total = Number.parseFloat(interTotal.value)
      const obtained = Number.parseFloat(interObtained.value)

      if (!isNaN(total) && !isNaN(obtained) && total > 0) {
        if (obtained > total) {
          interPercentage.value = "Error: Obtained > Total"
          interPercentage.style.color = "#e74c3c"
        } else {
          const percentage = (obtained / total) * 100
          interPercentage.value = percentage.toFixed(2) + "%"
          interPercentage.style.color = "#28a745"
        }
      } else {
        interPercentage.value = ""
        interPercentage.style.color = ""
      }
    }

    interTotal.addEventListener("input", calculateInterPercentage)
    interObtained.addEventListener("input", calculateInterPercentage)
  }

  // Form submission with comprehensive error handling
  const admissionForm = document.getElementById("admissionForm")

  if (admissionForm) {
    admissionForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      // Validate entire form
      const validator = new FormValidator()
      
      if (!validatePersonalTab(validator) || 
          !validateAcademicTab(validator) || 
          !validateProgramTab(validator)) {
        
        // Show error message
        showFormError("Please fix all errors before submitting the form.")
        return
      }

      // Update submit button
      const submitBtn = this.querySelector(".submit-btn")
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = "Submitting..."
      submitBtn.disabled = true

      try {
        // Collect all form data
        const formData = collectFormData()
        
        // Send to Excel sheet via Google Apps Script
        const response = await submitToExcel(formData)
        
        if (response.success) {
          // Show success message
          showSuccessMessage(response.referenceNumber)
        } else {
          throw new Error(response.message || "Submission failed")
        }

      } catch (error) {
        console.error("Form submission error:", error)
        
        // Show error message with retry option
        showFormError(`Submission failed: ${error.message}. Please try again.`, true)
        
        // Reset submit button
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }
    })
  }

  // Collect all form data
  function collectFormData() {
    const form = document.getElementById("admissionForm")
    const formData = new FormData(form)
    const data = {}
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    
    // Add timestamp and additional data
    data.timestamp = new Date().toISOString()
    data.submissionDate = new Date().toLocaleDateString('en-US')
    data.submissionTime = new Date().toLocaleTimeString('en-US')
    
    // Add calculated percentages
    const matricPercentage = document.getElementById("matricPercentage")
    const interPercentage = document.getElementById("interPercentage")
    
    if (matricPercentage && matricPercentage.value) {
      data.matricPercentage = matricPercentage.value
    }
    
    if (interPercentage && interPercentage.value) {
      data.interPercentage = interPercentage.value
    }
    
    return data
  }

  // Submit form data to Supabase admissions table
  async function submitToExcel(formData) {
    const refNum = generateReferenceNumber()

    const payload = {
      reference_number:  refNum,
      full_name:         formData.fullName        || null,
      father_name:       formData.fatherName      || null,
      dob:               formData.dob             || null,
      gender:            formData.gender          || null,
      cnic:              formData.cnic            || null,
      nationality:       formData.nationality     || null,
      religion:          formData.religion        || null,
      domicile:          formData.domicile        || null,
      any_disability:    formData.anyDisability === 'on',
      address:           formData.address         || null,
      phone:             formData.phone           || null,
      email:             formData.email           || null,
      guardian_phone:    formData.guardianPhone   || null,
      emergency_contact: formData.emergencyContact|| null,
      matric_board:      formData.matricBoard     || null,
      matric_year:       formData.matricYear      || null,
      matric_roll_no:    formData.matricRollNo    || null,
      matric_institute:  formData.matricInstitute || null,
      matric_total:      formData.matricTotal     ? parseInt(formData.matricTotal)   : null,
      matric_obtained:   formData.matricObtained  ? parseInt(formData.matricObtained): null,
      matric_percentage: formData.matricPercentage|| null,
      inter_board:       formData.interBoard      || null,
      inter_year:        formData.interYear       || null,
      inter_roll_no:     formData.interRollNo     || null,
      inter_institute:   formData.interInstitute  || null,
      inter_total:       formData.interTotal      ? parseInt(formData.interTotal)    : null,
      inter_obtained:    formData.interObtained   ? parseInt(formData.interObtained) : null,
      inter_percentage:  formData.interPercentage || null,
      program_level:     formData.programLevel    || null,
      program_choice:    formData.programChoice   || null,
      program_reason:    formData.programReason   || null,
      blood_group:       formData.bloodGroup      || null,
      hafiz_quran:       formData.hafizQuran      || null,
      disability:        formData.disability      || null,
      medical_condition: formData.medicalCondition|| null,
    }

    const { error } = await _supabase.from('admissions').insert(payload)

    if (error) throw new Error(error.message)
    return { success: true, referenceNumber: refNum }
  }

  // Generate reference number
  function generateReferenceNumber() {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `APP-${timestamp}-${random}`
  }

  // Show form error
  function showFormError(message, showRetry = false) {
    const formContainer = document.querySelector(".form-container")
    if (!formContainer) return

    const errorMessage = document.createElement("div")
    errorMessage.className = "form-error-message"
    errorMessage.innerHTML = `
      <div style="background-color: #f8d7da; color: #721c24; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f5c6cb; text-align: center;">
        <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 10px;"></i>
        <h3 style="margin: 10px 0;">Submission Failed</h3>
        <p style="margin: 10px 0;">${message}</p>
        ${showRetry ? '<button onclick="location.reload()" class="cta-button" style="margin-top: 10px;">Try Again</button>' : ''}
      </div>
    `

    // Insert at the top of form container
    formContainer.insertBefore(errorMessage, formContainer.firstChild)

    // Scroll to error message
    window.scrollTo({
      top: formContainer.offsetTop - 100,
      behavior: "smooth",
    })

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (errorMessage.parentNode) {
        errorMessage.remove()
      }
    }, 10000)
  }

  // Show success message
  function showSuccessMessage(referenceNumber) {
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
        <p>Your application reference number: <strong>${referenceNumber}</strong></p>
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
  }

  // Real-time validation
  function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input, select, textarea')
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this)
      })
      
      input.addEventListener('input', function() {
        // Clear error when user starts typing
        const formGroup = this.closest('.form-group')
        if (formGroup) {
          formGroup.classList.remove('error')
          const errorMessage = formGroup.querySelector('.error-message')
          if (errorMessage) {
            errorMessage.remove()
          }
        }
      })
    })
  }

  // Validate individual field
  function validateField(field) {
    const validator = new FormValidator()
    const fieldName = field.name
    const value = field.value.trim()
    
    // Basic required validation
    if (field.hasAttribute('required') && !value) {
      validator.showError(fieldName, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`)
      return false
    }
    
    // Specific validations
    if (fieldName === 'email' && value) {
      if (!validator.validateEmail(value)) {
        validator.showError(fieldName, 'Please enter a valid email address')
        return false
      }
    }
    
    if (fieldName === 'phone' && value) {
      if (!validator.validatePhone(value)) {
        validator.showError(fieldName, 'Please enter a valid phone number')
        return false
      }
    }
    
    if (fieldName === 'cnic' && value) {
      if (!validator.validateCNIC(value)) {
        validator.showError(fieldName, 'Please enter CNIC in format: 12345-1234567-1')
        return false
      }
    }
    
    return true
  }

  // Initialize real-time validation
  setupRealTimeValidation()

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

  // Fallback for network issues
  window.addEventListener('online', function() {
    console.log('Network connection restored')
  })

  window.addEventListener('offline', function() {
    showFormError("You are currently offline. Please check your internet connection and try again.")
  })
})