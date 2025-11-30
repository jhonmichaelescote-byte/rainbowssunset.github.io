// netflix.js — sidebar toggle, reveal-on-scroll, carousel arrow controls

(function(){
  // sidebar
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const closeSidebar = document.getElementById('closeSidebar');

  if(menuToggle){
    menuToggle.addEventListener('click', ()=> {
      if(!sidebar) return;
      sidebar.classList.toggle('open');
    });
  }
  if(closeSidebar){
    closeSidebar.addEventListener('click', ()=> {
      if(!sidebar) return;
      sidebar.classList.remove('open');
    });
  }

  // reveal on scroll using IntersectionObserver
  const els = document.querySelectorAll('.fade-in');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});
    els.forEach(el => io.observe(el));
  } else {
    // fallback
    els.forEach(el => el.classList.add('reveal'));
  }

  // add keyboard ESC to close sidebar
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && sidebar) sidebar.classList.remove('open');
  });

  // small helper: add left/right arrow controls for each carousel that has data-carousel
  document.querySelectorAll('[data-carousel]').forEach(car => {
    const left = car.parentElement.querySelector('.carousel-left');
    const right = car.parentElement.querySelector('.carousel-right');
    if(left) left.addEventListener('click', ()=> {
      car.scrollBy({left: -car.clientWidth * 0.7, behavior:'smooth'});
    });
    if(right) right.addEventListener('click', ()=> {
      car.scrollBy({left: car.clientWidth * 0.7, behavior:'smooth'});
    });
  });
  // Get elements
const termsLink = document.getElementById('termsLink');
const privacyLink = document.getElementById('privacyLink');
const termsModal = document.getElementById('termsModal');
const privacyModal = document.getElementById('privacyModal');
const closeTerms = document.getElementById('closeTerms');
const closePrivacy = document.getElementById('closePrivacy');

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


// Show modals
termsLink.addEventListener("click", (e) => {
  e.preventDefault();    // stop page from going to the top
  termsModal.style.display = "block";
});

privacyLink.addEventListener("click", (e) => {
  e.preventDefault();    // stop page from going to the top
  privacyModal.style.display = "block";
});

// Close modals
closeTerms.onclick = () => termsModal.style.display = 'none';
closePrivacy.onclick = () => privacyModal.style.display = 'none';

// Close when clicking outside modal
window.onclick = function(event) {
  if (event.target == termsModal) termsModal.style.display = 'none';
  if (event.target == privacyModal) privacyModal.style.display = 'none';
};

/* ------------------------------------------
    GALLERY VIEWER + ARROWS + SWIPE
------------------------------------------ */

const galleryImages = document.querySelectorAll(".scenes-row img");
const viewer = document.getElementById("imgModal");
const viewerImg = document.getElementById("fullImg");
const viewerClose = document.querySelector(".img-close");
const leftArrow = document.querySelector(".viewer-arrow.left");
const rightArrow = document.querySelector(".viewer-arrow.right");

let currentIndex = 0;

// Open modal
function openModal(index) {
  currentIndex = index;
  viewerImg.src = galleryImages[currentIndex].src;
  viewer.style.display = "flex";
}

// Close modal
function closeModal() {
  viewer.style.display = "none";
}

// Update to next/prev image
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  viewerImg.src = galleryImages[currentIndex].src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  viewerImg.src = galleryImages[currentIndex].src;
}

// Click gallery image
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

// Close modal
viewerClose.addEventListener("click", closeModal);
viewer.addEventListener("click", e => {
  if (e.target === viewer) closeModal();
});

// Arrows
leftArrow.addEventListener("click", prevImage);
rightArrow.addEventListener("click", nextImage);

// Swipe support
let startX = 0;
viewerImg.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
viewerImg.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextImage();
  else if (endX - startX > 50) prevImage();
});



})();
