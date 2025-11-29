// netflix.js — sidebar toggle, reveal-on-scroll, carousel arrow controls
(function(){

  // SIDEBAR
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const closeSidebar = document.getElementById('closeSidebar');

  if(menuToggle){
    menuToggle.addEventListener('click', ()=> sidebar?.classList.toggle('open'));
  }

  if(closeSidebar){
    closeSidebar.addEventListener('click', ()=> sidebar?.classList.remove('open'));
  }

  // REVEAL ON SCROLL
  const els = document.querySelectorAll('.fade-in');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    els.forEach(el=>io.observe(el));
  } else {
    els.forEach(el=>el.classList.add('reveal'));
  }

  // CAROUSEL ARROWS
  document.querySelectorAll('[data-carousel]').forEach(car=>{
    const left = car.parentElement.querySelector('.carousel-left');
    const right = car.parentElement.querySelector('.carousel-right');

    if(left) left.addEventListener('click', ()=> {
      car.scrollBy({left: -car.clientWidth*0.7, behavior:'smooth'});
    });

    if(right) right.addEventListener('click', ()=> {
      car.scrollBy({left: car.clientWidth*0.7, behavior:'smooth'});
    });
  });

  // READ MORE BUTTONS
  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.previousElementSibling;

      if (text.classList.contains("expanded")) {
        text.style.maxHeight = "90px";
        text.classList.remove("expanded");
        btn.textContent = "Read More";
      } else {
        text.style.maxHeight = text.scrollHeight + "px";
        text.classList.add("expanded");
        btn.textContent = "Read Less";
      }
    });
  });

 /* ------------------------------
    MOBILE MENU
------------------------------ */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

/* ------------------------------
    MODALS (Terms & Privacy)
------------------------------ */

// Links in Footer
const termsLink = document.getElementById("termsLink");
const privacyLink = document.getElementById("privacyLink");

// Modal Boxes
const termsModal = document.getElementById("termsModal");
const privacyModal = document.getElementById("privacyModal");

// Close Buttons
const closeTerms = document.getElementById("closeTerms");
const closePrivacy = document.getElementById("closePrivacy");

/* ---- OPEN MODALS ---- */
termsLink.addEventListener("click", (e) => {
  e.preventDefault();
  termsModal.classList.add("show-modal");
});

privacyLink.addEventListener("click", (e) => {
  e.preventDefault();
  privacyModal.classList.add("show-modal");
});

/* ---- CLOSE MODALS ---- */
closeTerms.addEventListener("click", () => {
  termsModal.classList.remove("show-modal");
});

closePrivacy.addEventListener("click", () => {
  privacyModal.classList.remove("show-modal");
});

/* ---- CLOSE WHEN CLICKING OUTSIDE ---- */
window.addEventListener("click", (event) => {
  if (event.target === termsModal) {
    termsModal.classList.remove("show-modal");
  }
  if (event.target === privacyModal) {
    privacyModal.classList.remove("show-modal");
  }
});


})();

