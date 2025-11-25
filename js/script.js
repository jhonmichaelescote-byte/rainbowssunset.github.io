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

})();
