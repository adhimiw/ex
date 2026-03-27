const menuBtn = document.getElementById("menuBtn");
const menuList = document.getElementById("menuList");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
const visitorCount = document.getElementById("visitorCount");

menuBtn.addEventListener("click", () => {
  menuList.classList.toggle("open");
});

let count = Math.floor(Math.random() * 200) + 50;
visitorCount.textContent = String(count);

setInterval(() => {
  count += Math.random() > 0.5 ? 1 : -1;
  visitorCount.textContent = String(Math.max(0, count));
}, 1800);

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.textContent = "Thanks. We will contact you shortly.";
  contactForm.reset();
});
