const menuBtn = document.querySelector('.nav-btn-responsive');
const navMenu = document.querySelector('.nav-menu');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });