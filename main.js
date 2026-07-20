// Nav scroll
const nav = document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled', scrollY>40));

// Mobile menu
const ham = document.getElementById('hamburger');
const links = document.getElementById('navLinks');
ham?.addEventListener('click',()=>{ham.classList.toggle('open');links.classList.toggle('open')});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('open');links.classList.remove('open')}));

// Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Hero Scale & Parallax
const hero = document.querySelector('.hero');
const bgVideo = document.querySelector('.hero__bg-video');
const heroText = document.querySelector('.hero__text');

if (hero && bgVideo && heroText) {
  gsap.to(bgVideo, {
    scale: 0.9,
    opacity: 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      pinSpacing: false
    }
  });
  gsap.to(heroText, {
    yPercent: -50,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}

// Advanced Scroll Reveals (replaces IntersectionObserver)
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.fromTo(el, 
    { y: 40, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});



// Particles
const pw = document.getElementById('particles');
if(pw){for(let i=0;i<28;i++){const s=document.createElement('i');s.style.left=Math.random()*100+'%';s.style.animationDelay=(-Math.random()*12)+'s';s.style.animationDuration=(8+Math.random()*10)+'s';s.style.opacity=.3+Math.random()*.5;pw.appendChild(s)}}

// Counters
const cIo=new IntersectionObserver((es)=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target, end=+el.dataset.count, suf=el.dataset.suffix||'';
  let n=0; const step=end/50;
  const t=setInterval(()=>{n+=step;if(n>=end){n=end;clearInterval(t)}el.textContent=Math.round(n)+suf},28);
  cIo.unobserve(el);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cIo.observe(el));





// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const id=a.getAttribute('href'); if(id.length<2)return;
  const t=document.querySelector(id); if(!t)return;
  e.preventDefault(); 
  if(typeof lenis !== 'undefined'){
    lenis.scrollTo(t);
  } else {
    t.scrollIntoView({behavior:'smooth',block:'start'});
  }
}));

// Aero GMT Color Switcher
const fcPrev = document.getElementById('fcPrev');
const fcNext = document.getElementById('fcNext');
const fcProductImg = document.getElementById('fcProductImg');
const fcLifestyleImg = document.getElementById('fcLifestyleImg');
const fcSectionTitle = document.getElementById('fcSectionTitle');
const fcCount = document.getElementById('fcCount');

if (fcPrev && fcNext && fcProductImg && fcLifestyleImg && fcSectionTitle && fcCount) {
    const variants = [
      { color: 'Black', src: 'images/Gemini_Generated_Image_5ukpyz5ukpyz5ukp-Photoroom.png', lifeSrc: 'images/ChatGPT Image Jul 2, 2026, 10_35_59 PM.png' },
      { color: 'Blue', src: 'images/Gemini_Generated_Image_2f0lz12f0lz12f0l-Photoroom.png', lifeSrc: 'images/ChatGPT Image Jul 2, 2026, 10_35_40 PM.png' },
      { color: 'Golden', src: 'images/Gemini_Generated_Image_hvtztbhvtztbhvtz-Photoroom.png', lifeSrc: 'images/ChatGPT Image Jul 2, 2026, 10_39_38 PM.png' }
    ];
  let currentVariantIndex = 0;

  function updateVariant(direction) {
    if (direction === 'next') {
      currentVariantIndex = (currentVariantIndex + 1) % variants.length;
    } else {
      currentVariantIndex = (currentVariantIndex - 1 + variants.length) % variants.length;
    }

    const variant = variants[currentVariantIndex];

    fcProductImg.src = variant.src;
    fcLifestyleImg.src = variant.lifeSrc;
    fcSectionTitle.innerHTML = 'Aero GMT in ' + variant.color + '.';
    fcCount.textContent = (currentVariantIndex + 1) + ' / ' + variants.length;
  }

  fcPrev.addEventListener('click', () => updateVariant('prev'));
  fcNext.addEventListener('click', () => updateVariant('next'));
}

// Cinematic Scroll Sequence
const cinematicSeq = document.getElementById('cinematic-seq');
if (cinematicSeq) {
  const showcase1 = cinematicSeq.querySelector('.showcase-1');
  const showcase1Img = cinematicSeq.querySelector('.showcase-1 img');
  const showcase2 = cinematicSeq.querySelector('.showcase-2');
  const showcase2Img = cinematicSeq.querySelector('.showcase-2 img');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cinematicSeq,
      start: "top top",
      end: "+=150%",
      scrub: true,
      pin: true,
      pinSpacing: true
    }
  });

  // Scale down and fade first showcase to create depth
  tl.to(showcase1Img, {
    scale: 0.85,
    opacity: 0.4,
    ease: "none"
  }, 0);

  // Slide second showcase up over the first one
  tl.to(showcase2, {
    y: 0,
    ease: "none"
  }, 0);

  // Slight scale-down parallax on second showcase image
  gsap.set(showcase2Img, { scale: 1.15 });
  tl.to(showcase2Img, {
    scale: 1,
    ease: "none"
  }, 0);
}
