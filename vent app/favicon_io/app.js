import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://vent-app-5bbf4-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "Yoga");

const sidebarItems = document.querySelectorAll(".sidebar li");
const categoryButtons = document.querySelectorAll(".categories button");
const cards = document.querySelectorAll(".card");
const searchInput = document.querySelector(".topbar input");

const helpBtn = document.querySelector(".help-btn");
const recommendBtn = document.querySelector(".recommend-btn");

// ===== SIDEBAR ACTIVE STATE =====
sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    sidebarItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    // 🔥 ADD THIS
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.querySelector(".overlay");

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.contains("active");

  if (isOpen) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }
});

// ===== CATEGORY FILTER (UI ONLY) =====

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Highlight selected category
    categoryButtons.forEach((btn) => btn.classList.remove("active-category"));
    button.classList.add("active-category");

    const category = button.textContent.toLowerCase();
    console.log("Selected category:", category);

    // Example filtering logic (basic demo)
    cards.forEach((card) => {
      if (category === "general") {
        card.style.display = "block";
      } else {
        // Fake logic for now (you'll connect real data later)
        card.style.display = Math.random() > 0.5 ? "block" : "none";
      }
    });
  });
});

// ===== CARD BUTTON ACTIONS =====

cards.forEach((card) => {
  const button = card.querySelector("button");
  const title = card.querySelector("h4").textContent;

  button.addEventListener("click", () => {
    switch (title) {
      case "Speak":
        alert("Connecting you to a listener...");
        break;

      case "Music":
        alert("Opening calming music...");
        break;

      case "Yoga":
        alert("Starting yoga session...");
        break;

      case "I don't know":
        alert("Showing recommendations...");
        break;

      default:
        alert("Action triggered");
    }

    console.log("Action clicked:", title);
  });
});

// ===== SEARCH FUNCTION =====

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();

    if (text.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// ===== HELP BUTTON =====

helpBtn.addEventListener("click", () => {
  alert("You're not alone ❤️\nConnecting you to support...");
  console.log("Help button clicked");
});

// ===== RECOMMENDED ACTION =====

recommendBtn.addEventListener("click", () => {
  alert("Starting guided breathing session...");
  push(referenceInDB, "Recommended yoga started");
});

// ===== HOVER EFFECT (OPTIONAL NICE UX) =====

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.02)";
    card.style.transition = "0.2s";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});

// ===== LOGOUT BUTTON =====

const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", () => {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    alert("Logged out successfully");
    console.log("User logged out");
  }
});
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});
