


const menuBtn = document.querySelector('.nav-btn-responsive');
const navMenu = document.querySelector('.nav-menu');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  ScrollTrigger.defaults({
        // optional: add markers for debugging
    // markers: true,
  });

  document.fonts.ready.then(() => {
    animateHero();   // Panggil animasi bagian hero
    animateLogo();
    animateGrowthLeft();
    animateGrowthRight();   // Panggil animasi bagian logo (nanti diisi)
    animateStrategyTop();
    animateStrategyBottom();
    animateWrapLogo();
    animateWaveAudio()
    animateBubble();
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
    ease: "power2.in",
    y: 30
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
  gsap.set([".title-growth", ".desc-growth", ".arrow"], { opacity: 1 });

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
      end: "bottom 50%",
      scrub: true,
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
      opacity: 0.5,
      color: "#aaa"
    },
    {
      scrollTrigger: {
        trigger: ".desc-growth",
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
      opacity: 1,
      color: "#000",
      ease: "power2.out",
      duration: 1,
      stagger: 0.02,
    }
  );

  gsap.from(".arrow", {
    scrollTrigger: {
      trigger: ".arrow",
      start: "top 100%",
      end: "bottom 50%",
      scrub: true,
    },
    opacity: 0,
    duration: 0.8,
    ease: "power2.in",
    y: -100
  });
}

function animateGrowthRight() {
  const items = document.querySelectorAll(".item");
  const circles = document.querySelectorAll(".item .circle");
  const texts = document.querySelectorAll(".item .text");
  const lines = document.querySelectorAll(".growth-right .line");

  // Set posisi awal
  gsap.set(items, { yPercent: 0, opacity: 1 });
  gsap.set(circles, { filter: "blur(15.64px)", backgroundColor: "#FF1AA3" });
  gsap.set(lines, {
    backgroundImage: `repeating-linear-gradient(
      to bottom,
      #161616 0px,
      #161616 4px,
      transparent 4px,
      transparent 8px
    )`,
    yPercent: 0
  });
  texts.forEach(text => text.textContent = "CHAOTIC");

  // Buat ScrollTrigger
  ScrollTrigger.create({
    trigger: ".growth-right",
    start: "top 30%",
    end: "bottom bottom",
    onEnter: () => {
      const tl = gsap.timeline();

      // Animasi item masuk
      tl.to(items, {
        yPercent: 250,
        opacity: 1,
        ease: "expo.out",
        duration: 1,
        stagger: 0.1
      });

      // Hilangkan blur + fill pada circle
      tl.to(circles, {
        filter: "blur(0px)",
        backgroundColor: "transparent",
        duration: 1,
        ease: "expo.in"
      }, "<"); // "<" artinya dijalankan bersamaan dengan animasi sebelumnya

      // Garis jadi solid dan naik
      tl.to(lines, {
        yPercent: -100,
        backgroundImage: "none",
        backgroundColor: "#161616",
        duration: 1
      }, "<");

      // Ubah teks
      tl.add(() => {
        texts.forEach(text => {
          text.textContent = "CLARITY";
        });
      });
    },

    onEnterBack: () => {
      const tlBack = gsap.timeline();

      tlBack.to(items, {
        yPercent: 0,
        opacity: 1,
        ease: "expo.out",
        duration: 1,
        // stagger: 0.1
      });

      tlBack.to(circles, {
        filter: "blur(15.64px)",
        backgroundColor: "#FF1AA3",
        duration: 1,
        ease: "expo.out"
      }, "<");

      tlBack.to(lines, {
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          #161616 0px,
          #161616 4px,
          transparent 4px,
          transparent 8px
        )`,
        backgroundColor: "transparent",
        yPercent: 0,
        duration: 1
      }, "<");

      tlBack.add(() => {
        texts.forEach(text => {
          text.textContent = "CHAOTIC";
        });
      });
    }
  });
}


function animateStrategyTop() {
  const tl = gsap.timeline();

  gsap.set(" .strategy-title", { yPercent: 0, opacity: 1 });

 const splitTitle = new SplitText(".strategy-title", {
    type: "lines",
    linesClass: "line",
    mask: "lines"
  });

  const splitDesc = new SplitText(".desc", {
    type: "chars",
    charsClass: "char"
  });

  // Animasi title seperti sebelumnya
  gsap.from(splitTitle.lines, {
    scrollTrigger: {
      trigger: ".strategy-top",
      start: "top 90%",
      end: "bottom 50%",
      scrub: true,
    },
    yPercent: 100,
    opacity: 0,
    ease: "expo.out",
    duration: 1,
    stagger: 0.1
  });

  // Animasi desc seperti sebelumnya
  gsap.from(splitDesc.chars, {
      opacity: 0.5,
      color: "#aaa",
    scrollTrigger: {
      trigger: ".strategy-top",
      start: "top 80%",
      end: "bottom 50%",
      scrub: true,
      opacity: 0.5
    },
      opacity: 1,
      ease: "power2.out",
      duration: 1,
      stagger: 0.02
  });

}

function animateStrategyBottom() {
  const cards = document.querySelectorAll(".card-strategy");
  const icons = document.querySelectorAll(".card-strategy .icon");

  // Set posisi awal
  gsap.set(cards, {
    xPercent: 10,
    opacity: 1,
    marginBottom: "3em"
  });
  gsap.set(icons, {
    opacity: 0.2
  });

  // ScrollTrigger tanpa scrub, menggunakan timeline on scroll in/out
  ScrollTrigger.create({
    trigger: ".strategy-bottom",
    start: "top 55%",
    end: "bottom 50%",
    onEnter: () => {
      const tl = gsap.timeline();
      
      tl.to(cards, {
        xPercent: 0,
        marginBottom: "1.5em",
        ease: "expo.out",
        duration: 1,
        stagger: 0.2
      });

      tl.to(icons, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
      }, "<"); // jalankan bersamaan
    },
    onEnterBack: () => {
      const tlBack = gsap.timeline();
      
      tlBack.to(cards, {
        xPercent: 10,
        marginBottom: "3em",
        ease: "expo.in",
        duration: 1,
        stagger: 0.2
      });

      tlBack.to(icons, {
        opacity: 0.2,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0.2
      }, "<");
    }
  });
}

function animateWrapLogo() {
  const logos = gsap.utils.toArray(".wrap-logos img");
  const button = document.querySelector(".button-logos");

  gsap.utils.shuffle(logos); // acak urutan

  // Set posisi awal semua elemen
  gsap.set(logos, { opacity: 0, y: 50 });
  gsap.set(button, { opacity: 0, y: 30 });

  ScrollTrigger.create({
    trigger: ".content-logos",
    start: "top 80%",
    end: "bottom 50%",
    onEnter: () => {
      const tl = gsap.timeline();

      tl.to(logos, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      });

      tl.to(button, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 1); // jeda sedikit setelah logo selesai
    },

    onEnterBack: () => {
      const tlBack = gsap.timeline();

      tlBack.to(button, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.in"
      });

      tlBack.to(logos, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.in",
        stagger: 0.1
      }, "<"); // jalan bersamaan
    }
  });
}

function animateBubble() {
  const chats = gsap.utils.toArray(".bubble .chat");
  const loveImg = document.querySelector(".chat.first .chat-left img");

  // Set posisi awal
  gsap.set(chats, { opacity: 0});
  gsap.set(loveImg, { opacity: 0 });

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
    paused: true // <-- Dijalankan hanya saat scrollTrigger aktif
  });

  // Munculkan chat satu per satu
  tl.to(chats, {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "power2.out",
    stagger: 1
  });

  // Love icon muncul di saat chat ke-2 tampil (1 detik setelah start)
  tl.to(loveImg, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)"
  }, 1);

  // Delay sebelum menghilangkan
  tl.to({}, { duration: 1 });

  // Hilangkan semuanya sekaligus
  tl.to([chats, loveImg], {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  });

  // ScrollTrigger aktifkan timeline saat scroll
  ScrollTrigger.create({
    trigger: ".bubble",
    start: "top 70%",
    end: "bottom 50%",
    onEnter: () => tl.play(),
    onLeave: () => tl.pause(),
    onEnterBack: () => tl.play(),
    onLeaveBack: () => tl.pause()
  });
}

function animateWaveAudio() {
  // Inisialisasi WaveSurfer
  const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'rgb(124, 124, 124)',
    progressColor: '#FF1AA3',
    height: 80,
    responsive: true,
    url: "./assets/audio/Feast - Arteri (Official Music Video).mp3",
    autoCenter: true
  });

  // Set posisi awal h2 dan .wave
  gsap.set([".heading-team h2", ".wave"], {
    opacity: 0,
    y: 40
  });

  // ScrollTrigger untuk heading dan audio
  ScrollTrigger.create({
    trigger: ".heading-team",
    start: "top 80%",
    end: "bottom bottom",

    onEnter: () => {
      const tl = gsap.timeline();

      tl.to(".heading-team h2", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });

      tl.to(".wave", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "<"); // mulai bersamaan dengan h2

      if (wavesurfer.isReady) {
        wavesurfer.play();
      } else {
        wavesurfer.on('ready', () => wavesurfer.play());
      }
    },

    onEnterBack: () => {
      const tlBack = gsap.timeline();

      tlBack.to(".heading-team h2", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.in"
      });

      tlBack.to(".wave", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.in"
      }, "<");

      wavesurfer.pause();
    }
  });
}
















