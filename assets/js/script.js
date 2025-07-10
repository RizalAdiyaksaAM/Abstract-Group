const menuBtn = document.querySelector('.nav-btn-responsive');
const navMenu = document.querySelector('.nav-menu');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  ScrollTrigger.defaults({
    marklers: true // untuk debugging, hapus di produksi
  });

  document.fonts.ready.then(() => {
    animateHero();   // Panggil animasi bagian hero
    animateLogo();
    animateGrowthLeft();   // Panggil animasi bagian logo (nanti diisi)
  });
});

function animateHero() {
  const tl = gsap.timeline();

  gsap.set([".hero-title", ".hero-desc", ".button-hero"], { opacity: 1 });

  const splitTitle = new SplitText(".hero-title", {
    type: "words,lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines"
  });

  const splitDesc = new SplitText(".hero-desc", {
    type: "words",
    autoSplit: true,
    mask: "words"
  });

  tl.from(splitTitle.lines, {
    duration: 1.2,
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    ease: "expo.out"
  })
  .from(splitDesc.words, {
    duration: 1,
    yPercent: 100,
    opacity: 0,
    stagger: 0.08,
    ease: "expo.out"
  }, 0.1)
  .from(".button-hero", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    y: -100
  }, 0.6);
}


function animateLogo() {
  const logos = gsap.utils.toArray(".logo-brand"); // ambil semua elemen logo
  gsap.utils.shuffle(logos); // acak urutan animasinya

  gsap.from(logos, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
  });
}

function animateGrowthLeft() {
  gsap.set([".title-growth", ".desc-growth"], { opacity: 1 });

  const splitTitle = new SplitText(".title-growth", {
    type: "lines",
    linesClass: "line",
    mask: "lines"
  });

  const splitDesc = new SplitText(".desc-growth", {
    type: "chars",
    charsClass: "char"
  });

  // Animasi title seperti sebelumnya
  gsap.from(splitTitle.lines, {
    scrollTrigger: {
      trigger: ".heading-growth",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    yPercent: 100,
    opacity: 0,
    ease: "expo.out",
    duration: 1,
    stagger: 0.1
  });

  // Animasi huruf per huruf + perubahan warna untuk deskripsi
  gsap.fromTo(splitDesc.chars,
    {
      opacity: 0,
      color: "#aaa"
    },
    {
      scrollTrigger: {
        trigger: ".desc-growth",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      color: "#000",
      ease: "power2.out",
      duration: 1,
      stagger: 0.02
    }
  );
}
