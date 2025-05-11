// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

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

  // Category tab functionality
  const categoryButtons = document.querySelectorAll(".category-btn")
  const categoryContents = document.querySelectorAll(".category-content")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get parent tab content
      const parentTab = this.closest(".tab-content")

      // Remove active class from all category buttons and contents within this tab
      parentTab.querySelectorAll(".category-btn").forEach((btn) => btn.classList.remove("active"))
      parentTab.querySelectorAll(".category-content").forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show corresponding content
      const categoryId = this.getAttribute("data-category")
      parentTab.querySelector(`#${categoryId}`).classList.add("active")
    })
  })

  // Voucher card hover effect
  const voucherCards = document.querySelectorAll(".voucher-card")

  voucherCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
    })
  })
})
