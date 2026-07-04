(function(){
  // ═══════ PRELOADER ═══════
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader')?.classList.add('hide'), 500);
  });

  // ═══════ MOBILE MENU ═══════
  const menu = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  menu?.addEventListener('click', () => { menu.classList.toggle('open'); nav.classList.toggle('open'); });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => { menu?.classList.remove('open'); nav?.classList.remove('open'); }));

  // ═══════ SMOOTH SCROLL (LENIS) ═══════
  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // ═══════ AOS & SPLITTING ═══════
  if (window.AOS) AOS.init({ duration: 900, offset: 120, once: true, easing: 'ease-out-cubic' });
  if (window.Splitting) Splitting();

  // ═══════ SWIPERS ═══════
  if (window.Swiper) {
    new Swiper('.hero-swiper', { effect:'fade', loop:true, speed:1400, autoplay:{ delay:4800, disableOnInteraction:false }, pagination:{ el:'.hero-pagination', clickable:true } });
    new Swiper('.gallery-swiper', { slidesPerView:1.05, spaceBetween:18, speed:900, navigation:{ nextEl:'.gallery-next', prevEl:'.gallery-prev' }, breakpoints:{ 720:{ slidesPerView:2.1 }, 1080:{ slidesPerView:2.75 } } });
    new Swiper('.artist-swiper', { slidesPerView:1.1, spaceBetween:18, speed:850, breakpoints:{ 720:{ slidesPerView:2.2 }, 1080:{ slidesPerView:3.15 } } });
  }

  // ═══════ HEADER SCROLL ═══════
  const header = document.getElementById('siteHeader');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive:true }); onScroll();

  // ═══════ GSAP ANIMATIONS ═══════
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.hero-title .char', { opacity:1, y:0, rotateX:0, duration:1.1, ease:'power4.out', stagger:.025, delay:.75 });
    gsap.from('.hero-eyebrow', { opacity:0, y:20, duration:.8, delay:.55, ease:'power3.out' });
    gsap.utils.toArray('.parallax-bg img').forEach(img => gsap.to(img, { yPercent:-14, ease:'none', scrollTrigger:{ trigger:img.closest('section'), start:'top bottom', end:'bottom top', scrub:true } }));
    gsap.utils.toArray('.pillar').forEach(card => gsap.to(card, { y:-18, ease:'none', scrollTrigger:{ trigger:card, start:'top bottom', end:'bottom top', scrub:true } }));
    gsap.to('.poster-main', { y:-35, rotate:-1.5, scrollTrigger:{ trigger:'.poster-stack', start:'top bottom', end:'bottom top', scrub:true } });
    gsap.to('.poster-back', { y:35, rotate:7, scrollTrigger:{ trigger:'.poster-stack', start:'top bottom', end:'bottom top', scrub:true } });
  }

  // ═══════ LOTTIE FLAME ═══════
  const flameAnimation = {
    v:'5.7.4', fr:30, ip:0, op:90, w:220, h:220, nm:'flame-pulse', ddd:0, assets:[],
    layers:[
      {ddd:0, ind:1, ty:4, nm:'outer glow', sr:1, ks:{o:{a:1,k:[{t:0,s:[22]},{t:45,s:[70]},{t:90,s:[22]}]}, r:{a:0,k:0}, p:{a:0,k:[110,110,0]}, a:{a:0,k:[0,0,0]}, s:{a:1,k:[{t:0,s:[80,80,100]},{t:45,s:[120,120,100]},{t:90,s:[80,80,100]}]}}, shapes:[{ty:'el',p:{a:0,k:[0,0]},s:{a:0,k:[160,160]},nm:'ellipse'},{ty:'fl',c:{a:0,k:[1,.38,.08,1]},o:{a:0,k:100},r:1,nm:'fill'}], ip:0, op:90, st:0, bm:0},
      {ddd:0, ind:2, ty:4, nm:'flame drop', sr:1, ks:{o:{a:0,k:100}, r:{a:1,k:[{t:0,s:[-6]},{t:45,s:[6]},{t:90,s:[-6]}]}, p:{a:0,k:[110,112,0]}, a:{a:0,k:[0,0,0]}, s:{a:1,k:[{t:0,s:[88,88,100]},{t:45,s:[105,105,100]},{t:90,s:[88,88,100]}]}}, shapes:[{ty:'sh',ks:{a:0,k:{i:[[0,0],[-26,22],[8,28],[22,8],[28,-18],[0,-34],[-16,-20]],o:[[-34,8],[18,14],[-6,-24],[-26,-10],[-2,35],[18,-12],[0,0]],v:[[0,-88],[-45,-16],[-20,62],[22,68],[56,16],[32,-46],[0,-88]],c:true}},nm:'flame'},{ty:'gf',o:{a:0,k:100},r:1,g:{p:3,k:{a:0,k:[0,1,.79,.33,.5,1,.39,.06,1,.94,.08,.02]}},s:{a:0,k:[-50,-80]},e:{a:0,k:[50,80]},t:1,nm:'grad'}], ip:0, op:90, st:0, bm:0},
      {ddd:0, ind:3, ty:4, nm:'cross', sr:1, ks:{o:{a:0,k:100}, r:{a:0,k:0}, p:{a:0,k:[110,119,0]}, a:{a:0,k:[0,0,0]}, s:{a:0,k:[100,100,100]}}, shapes:[{ty:'rc',p:{a:0,k:[0,0]},s:{a:0,k:[18,80]},r:{a:0,k:0},nm:'v'},{ty:'fl',c:{a:0,k:[1,1,1,1]},o:{a:0,k:100},r:1,nm:'fill'},{ty:'rc',p:{a:0,k:[0,-12]},s:{a:0,k:[58,18]},r:{a:0,k:0},nm:'h'},{ty:'fl',c:{a:0,k:[1,1,1,1]},o:{a:0,k:100},r:1,nm:'fill2'}], ip:0, op:90, st:0, bm:0}
    ]
  };
  if (window.lottie && document.getElementById('lottieFlame')) {
    lottie.loadAnimation({ container:document.getElementById('lottieFlame'), renderer:'svg', loop:true, autoplay:true, animationData:flameAnimation });
  }

  // ═══════ THREE.JS PARTICLES ═══════
  if (window.THREE && document.getElementById('spiritCanvas')) {
    const canvas = document.getElementById('spiritCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 220;
    const count = 720;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count*3);
    for(let i=0;i<count;i++){
      positions[i*3] = (Math.random()-.5)*520;
      positions[i*3+1] = (Math.random()-.5)*300;
      positions[i*3+2] = (Math.random()-.5)*500;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
    const material = new THREE.PointsMaterial({ color:0xff6b1a, size:1.35, transparent:true, opacity:.72, blending:THREE.AdditiveBlending });
    const particles = new THREE.Points(geometry, material); scene.add(particles);
    const resize = () => { renderer.setSize(window.innerWidth,window.innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); };
    window.addEventListener('resize', resize); resize();
    let t = 0;
    function animate(){
      t += .003;
      particles.rotation.y += .0008;
      particles.rotation.x = Math.sin(t)*.06;
      material.opacity = .48 + Math.sin(t*4)*.18;
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ═══════ MAGNETIC BUTTONS ═══════
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * .16;
      const y = (e.clientY - r.top - r.height/2) * .16;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
  });

  // ═══════ COUNTDOWN TIMER ═══════
  const EVENT_DATE = new Date('2026-09-18T18:00:00');
  function updateCountdown() {
    const now = new Date();
    const diff = EVENT_DATE - now;
    if (diff <= 0) {
      document.querySelectorAll('.countdown__number').forEach(el => el.textContent = '00');
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    const secs = Math.floor((diff % (1000*60)) / 1000);

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (daysEl) updateDigit(daysEl, String(days).padStart(3,'0'));
    if (hoursEl) updateDigit(hoursEl, String(hours).padStart(2,'0'));
    if (minsEl) updateDigit(minsEl, String(mins).padStart(2,'0'));
    if (secsEl) updateDigit(secsEl, String(secs).padStart(2,'0'));
  }
  function updateDigit(el, val) {
    if (el.textContent !== val) {
      el.textContent = val;
      el.classList.remove('flip');
      void el.offsetWidth;
      el.classList.add('flip');
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ═══════ CALENDAR WIDGET ═══════
  const EVENT_DATES = [
    { date: '2026-09-18', label: 'Unleashed Day 1 — Doors & Worship', time: '6:00 PM' },
    { date: '2026-09-19', label: 'Unleashed Day 2 — Word & Ministry', time: '5:00 PM' },
    { date: '2026-09-20', label: 'Unleashed Day 3 — Outpouring & Encounter', time: '4:00 PM' },
  ];

  let calYear = 2026;
  let calMonth = 8; // September (0-indexed)
  let selectedDate = null;

  function renderCalendar() {
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const monthEl = document.getElementById('calMonth');
    const daysEl = document.getElementById('calDays');
    if (!monthEl || !daysEl) return;

    monthEl.textContent = `${monthNames[calMonth]} ${calYear}`;

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const daysInPrev = new Date(calYear, calMonth, 0).getDate();
    const today = new Date();

    let html = '';

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      html += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const isEvent = EVENT_DATES.some(e => e.date === dateStr);
      const isToday = today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === d;
      const isSelected = selectedDate === dateStr;
      let cls = 'cal-day';
      if (isEvent) cls += ' event-day';
      if (isToday) cls += ' today';
      if (isSelected) cls += ' selected';
      html += `<div class="${cls}" data-date="${dateStr}">${d}</div>`;
    }

    // Next month padding
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remaining; i++) {
      html += `<div class="cal-day other-month">${i}</div>`;
    }

    daysEl.innerHTML = html;

    // Day click handlers
    daysEl.querySelectorAll('.cal-day:not(.other-month)').forEach(day => {
      day.addEventListener('click', () => {
        const dateStr = day.dataset.date;
        selectedDate = dateStr;
        renderCalendar();
        updateCalInfo(dateStr);
        // Fill booking form date
        const bookingDate = document.getElementById('bookingDate');
        if (bookingDate) {
          const dateObj = new Date(dateStr + 'T12:00:00');
          bookingDate.value = dateObj.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
        }
      });
    });
  }

  function updateCalInfo(dateStr) {
    const infoEl = document.getElementById('calInfo');
    if (!infoEl) return;
    const event = EVENT_DATES.find(e => e.date === dateStr);
    if (event) {
      const dateObj = new Date(dateStr + 'T12:00:00');
      const formatted = dateObj.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
      infoEl.innerHTML = `
        <p class="event-highlight">${event.label}</p>
        <p>${formatted} &bull; Starts at ${event.time}</p>
        <p>The Bahamas &bull; Powered by Plugged in Faith</p>
      `;
    } else {
      const dateObj = new Date(dateStr + 'T12:00:00');
      const formatted = dateObj.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
      infoEl.innerHTML = `<p>${formatted} — No scheduled event on this date.</p>`;
    }
  }

  document.getElementById('calPrev')?.addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  });
  document.getElementById('calNext')?.addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  });

  renderCalendar();

  // ═══════ BOOKING FORM ═══════
  document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const oldText = btnText.textContent;

    btnText.textContent = 'Processing...';
    if (btnLoader) btnLoader.hidden = false;

    setTimeout(() => {
      btnText.textContent = 'Booking Confirmed!';
      if (btnLoader) btnLoader.hidden = true;
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        btnText.textContent = oldText;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });

  // ═══════ WAITLIST FORM ═══════
  document.querySelector('.waitlist-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button');
    const old = btn.textContent;
    btn.textContent = 'Interest Saved!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(() => { btn.textContent = old; btn.style.background = ''; }, 2600);
  });
})();
