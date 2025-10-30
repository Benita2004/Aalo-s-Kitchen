/* =========================================================
   Aromas of Africa - Interactive Script
   ---------------------------------------------------------
   This file handles all JavaScript features:
   - Navbar toggle
   - Fade-in scroll animation
   - Dark mode toggle
   - Dish of the Day randomizer
   - Suggest a Restaurant form feedback
   ========================================================= */

/* ====== MOBILE MENU TOGGLE ====== */
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
  }
  
  /* ====== FADE-IN ON SCROLL ======
     Uses IntersectionObserver for smooth entry animation
     when sections become visible in the viewport.
  ================================= */
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.2 };
  
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  
  faders.forEach((fader) => appearOnScroll.observe(fader));
  
  /* ====== DARK MODE TOGGLE ======
     Toggles dark mode by adding/removing a CSS class to <body>
     and updates the button icon accordingly.
  ================================= */
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      // Swap icons between moon/sun
      darkToggle.innerHTML = document.body.classList.contains("dark-mode")
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  }
  
  /* ====== DISH OF THE DAY ======
     Randomly displays an African dish from a local images folder.
     Dishes are stored as objects with name + image path.
  ================================= */
 const dishes = [
  { name: "Jellof rice (Nigeria)", img: "Jellof rice.jpg" },
  { name: "Waakye (Ghana)", img: "Waakye.jpg" },
  { name: "Bunny chow (South Africa)", img: "Bunny chow.jpg" },
  { name: "Suqaar (Somalia)", img: "Suqaar.jpg" },
  { name: "Egusi Soup (Nigeria)", img: "Egusi.jpg" },
  { name: "Bobotie (South Africa)", img: "Bobotie.jpg" },
  { name: "Fufu with Light Soup (Ghana)", img: "Fufu with light soup.jpg" },
  { name: "Malawah (Somalia)", img: "Malawah.jpg" },
  { name: "Puff Puff (Nigeria)", img: "Puff puff.jpg" },
  { name: "Chakalaka (South Africa)", img: "Chakalaka.jpg" }
];

  // DOM references
  const dishName = document.getElementById("dish-name");
  const dishImg = document.getElementById("dish-image");
  const randomDishBtn = document.getElementById("random-dish-btn");
  
  if (randomDishBtn) {
    randomDishBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * dishes.length);
      const selectedDish = dishes[randomIndex];
  
      // Update the dish name and image
      dishName.textContent = selectedDish.name;
      dishImg.src = selectedDish.img;
      dishImg.alt = selectedDish.name;
  
      // Add fade effect when changing image
      dishImg.classList.add("fade-image");
      setTimeout(() => dishImg.classList.remove("fade-image"), 400);
    });
  }

/* ====== AUTO DISH OF THE DAY ======
   Automatically pick a dish based on today's date
   so everyone sees a consistent "Dish of the Day".
================================= */
function showDishOfTheDay() {
  const today = new Date();
  const dayIndex = today.getDate() % dishes.length; // Cycles through dishes
  const dish = dishes[dayIndex];

  dishName.textContent = dish.name;
  dishImg.src = dish.img;
  dishImg.alt = dish.name;
}

// Run automatically when the page loads
window.addEventListener("DOMContentLoaded", showDishOfTheDay);

  
  /* ====== SUGGEST A RESTAURANT FORM ======
     Displays a thank-you message dynamically upon form submission.
  ================================= */
  const suggestForm = document.getElementById("suggest-form");
  const responseText = document.getElementById("form-response");
  
  if (suggestForm) {
    suggestForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const name = document.getElementById("restaurant-name").value;
      const country = document.getElementById("restaurant-country").value;
  
      // Show confirmation text dynamically
      responseText.textContent = `Thank you for suggesting ${name} from ${country}! We'll check it out.`;
      suggestForm.reset();
  
      // Clear message after 4 seconds
      setTimeout(() => {
        responseText.textContent = "";
      }, 4000);
    });
  }

  


