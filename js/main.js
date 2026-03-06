/* =========================================
   FAVOUR AKINTADE — PORTFOLIO SCRIPTS
   Blue Ocean Theme · 2025
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // ANIMATED WAVE CANVAS BACKGROUND
  // =========================================
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');

  let W, H, animFrame;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Wave configuration
  const waves = [
    { amplitude: 60,  frequency: 0.008, speed: 0.012, yOffset: 0.35, alpha: 0.18, color: '#1a5fb4' },
    { amplitude: 45,  frequency: 0.012, speed: 0.018, yOffset: 0.50, alpha: 0.14, color: '#2563eb' },
    { amplitude: 70,  frequency: 0.006, speed: 0.008, yOffset: 0.65, alpha: 0.12, color: '#0ea5e9' },
    { amplitude: 35,  frequency: 0.016, speed: 0.022, yOffset: 0.78, alpha: 0.10, color: '#38bdf8' },
    { amplitude: 50,  frequency: 0.010, speed: 0.014, yOffset: 0.88, alpha: 0.16, color: '#60a5fa' },
  ];

  let time = 0;

  function drawWaves() {
    ctx.clearRect(0, 0, W, H);

    // Deep background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0,   'rgba(5, 13, 26, 0)');
    bg.addColorStop(0.5, 'rgba(10, 22, 40, 0.2)');
    bg.addColorStop(1,   'rgba(14, 52, 96, 0.12)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    waves.forEach((wave) => {
      ctx.beginPath();

      const baseY = H * wave.yOffset;
      const phase = time * wave.speed;

      ctx.moveTo(0, baseY);

      for (let x = 0; x <= W; x += 4) {
        const y = baseY
          + Math.sin(x * wave.frequency + phase) * wave.amplitude
          + Math.sin(x * wave.frequency * 1.7 + phase * 0.6) * (wave.amplitude * 0.35);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, H);
      grad.addColorStop(0, wave.color.replace(')', `, ${wave.alpha})`).replace('rgb', 'rgba').replace('#', ''));

      // Parse hex color for gradient
      const hex = wave.color;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      const fillGrad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, H);
      fillGrad.addColorStop(0, `rgba(${r},${g},${b},${wave.alpha})`);
      fillGrad.addColorStop(1, `rgba(${r},${g},${b},${wave.alpha * 0.3})`);

      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Draw the wave line itself (glowing edge)
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= W; x += 4) {
        const y = baseY
          + Math.sin(x * wave.frequency + phase) * wave.amplitude
          + Math.sin(x * wave.frequency * 1.7 + phase * 0.6) * (wave.amplitude * 0.35);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},${wave.alpha * 2.5})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    time++;
    animFrame = requestAnimationFrame(drawWaves);
  }

  drawWaves();


  // =========================================
  // CUSTOM CURSOR
  // =========================================
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .tab-btn, .project-card, input, textarea, select').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform    = 'translate(-50%,-50%) scale(2.2)';
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
      cursorRing.style.opacity  = '0.9';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform    = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.opacity  = '0.5';
    });
  });


  // =========================================
  // EXPERTISE TABS
  // =========================================
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach((t) => t.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + tabId);
      if (target) target.classList.add('active');
    });
  });


  // =========================================
  // SCROLL FADE-UP ANIMATIONS
  // =========================================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));


  // =========================================
  // ACTIVE NAV HIGHLIGHT ON SCROLL
  // =========================================
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--sky)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => navObserver.observe(s));


  // =========================================
  // NAVBAR SCROLL SHADOW
  // =========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });


  // =========================================
  // CONTACT FORM SUBMIT FEEDBACK
  // =========================================
  const submitBtn = document.getElementById('formSubmitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const original = submitBtn.textContent;
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
      setTimeout(() => {
        submitBtn.textContent = original;
        submitBtn.style.background = '';
      }, 3000);
    });
  }

});
