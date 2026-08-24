/* Favour Akintade — studio interactions */

(() => {
  const body = document.body;
  const nav = document.getElementById('siteNav');
  const menuBtn = document.getElementById('menuBtn');
  const veil = document.getElementById('veil');
  const mq = window.matchMedia('(max-width: 1180px)');

  const closeNav = () => {
    body.classList.remove('nav-open');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    }
    if (!document.getElementById('pdfModal')?.classList.contains('is-open')) {
      body.style.overflow = '';
    }
  };

  const openNav = () => {
    body.classList.add('nav-open');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close menu');
    }
    if (mq.matches) body.style.overflow = 'hidden';
  };

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      if (body.classList.contains('nav-open')) closeNav();
      else openNav();
    });
  }

  if (veil) veil.addEventListener('click', closeNav);

  document.querySelectorAll('#siteNav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mq.matches) closeNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNav();
      closePdf();
    }
  });

  mq.addEventListener('change', (e) => {
    if (!e.matches) closeNav();
  });

  /* Lagos clock */
  const clockEls = document.querySelectorAll('[data-clock]');
  const tick = () => {
    const t = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
    clockEls.forEach((el) => {
      el.textContent = t;
    });
  };
  if (clockEls.length) {
    tick();
    setInterval(tick, 30000);
  }

  /* Expertise tabs */
  const tabButtons = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  const activateTab = (id) => {
    tabButtons.forEach((btn) => {
      const on = btn.dataset.tab === id;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.tabIndex = on ? 0 : -1;
    });
    tabPanels.forEach((panel) => {
      const on = panel.id === 'tab-' + id;
      panel.classList.toggle('is-active', on);
      panel.hidden = !on;
    });
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    btn.addEventListener('keydown', (e) => {
      const list = [...tabButtons];
      const i = list.indexOf(btn);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = e.key === 'ArrowRight'
          ? list[(i + 1) % list.length]
          : list[(i - 1 + list.length) % list.length];
        next.focus();
        activateTab(next.dataset.tab);
      }
    });
  });

  document.querySelectorAll('[data-jump-tab]').forEach((el) => {
    el.addEventListener('click', () => activateTab(el.dataset.jumpTab));
  });

  /* Scroll spy */
  const navLinks = document.querySelectorAll('#siteNav > a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));

  /* Reveal */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* Contact form */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const formBtn = document.getElementById('formBtn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const honey = form.querySelector('[name="_gotcha"]');
      if (honey && honey.value) return;

      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        topic: form.topic.value,
        message: form.message.value.trim(),
      };

      if (!data.name || !data.email || !data.message) {
        formNote.textContent = 'Name, email, and a message are required.';
        formNote.dataset.state = 'error';
        return;
      }

      formBtn.disabled = true;
      formBtn.textContent = 'Sending…';
      formNote.textContent = '';
      formNote.dataset.state = '';

      try {
        const res = await fetch('https://formsubmit.co/ajax/meetfavourakintade@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...data,
            _subject: 'Portfolio — ' + data.topic,
          }),
        });
        if (!res.ok) throw new Error('send failed');
        form.reset();
        formNote.textContent = 'Message sent. I’ll reply to your email.';
        formNote.dataset.state = 'ok';
        formBtn.textContent = 'Message sent';
        setTimeout(() => {
          formBtn.disabled = false;
          formBtn.textContent = 'Send message';
        }, 2800);
      } catch (err) {
        const subject = encodeURIComponent('Portfolio — ' + data.topic);
        const bodyText = encodeURIComponent(
          data.message + '\n\n— ' + data.name + ' (' + data.email + ')'
        );
        window.location.href =
          'mailto:meetfavourakintade@gmail.com?subject=' + subject + '&body=' + bodyText;
        formNote.textContent = 'Opening your email app to send the message.';
        formNote.dataset.state = 'ok';
        formBtn.disabled = false;
        formBtn.textContent = 'Send message';
      }
    });
  }

  /* PDF modal */
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  const modalTitle = document.getElementById('pdfTitle');
  const pdfs = {
    ibm: {
      src: 'cv/IBM_Java_Developer_Certificate.pdf',
      title: 'IBM Java Developer — Professional Certificate',
    },
    escaide: {
      src: 'cv/ESCAIDE_2025_Certificate.pdf',
      title: 'ESCAIDE 2025 — Certificate of Attendance',
    },
  };

  function openPdf(key) {
    const item = pdfs[key];
    if (!item || !modal) return;
    frame.src = item.src;
    modalTitle.textContent = item.title;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('pdfClose');
    if (closeBtn) closeBtn.focus();
  }

  function closePdf() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    frame.src = '';
    if (!body.classList.contains('nav-open')) body.style.overflow = '';
  }

  document.querySelectorAll('[data-pdf]').forEach((btn) => {
    btn.addEventListener('click', () => openPdf(btn.dataset.pdf));
  });

  const pdfClose = document.getElementById('pdfClose');
  if (pdfClose) pdfClose.addEventListener('click', closePdf);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePdf();
    });
  }

  window.openPdfModal = openPdf;
})();
