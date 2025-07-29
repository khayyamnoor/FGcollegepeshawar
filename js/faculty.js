// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Faculty filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const facultyCards = document.querySelectorAll(".faculty-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filterValue = this.getAttribute("data-filter")

      // Filter faculty cards
      facultyCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.classList.remove("hidden")
        } else {
          card.classList.add("hidden")
        }
      })
    })
  })

  // Staggered animation for faculty cards
  function animateFacultyCards() {
    facultyCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("fade-in")
      }, 100 * index)
    })
  }

  // Run animation on page load
  animateFacultyCards()
})
