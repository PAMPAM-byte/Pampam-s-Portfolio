'use client';

import { useEffect, useRef, useState } from 'react';
import { contact } from '@/lib/content';

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  /* Menu state lives on <body> so the stylesheet's .nav-open rules apply */
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    const small = window.matchMedia('(max-width: 960px)').matches;
    document.body.style.overflow = open && small ? 'hidden' : '';
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(max-width: 960px)');
    const onMq = (e: MediaQueryListEvent) => !e.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  /* Border once scrolled, inverted over black slabs */
  useEffect(() => {
    const paint = () => {
      const header = headerRef.current;
      if (!header) return;
      const probe = header.offsetHeight / 2;
      let overSlab = false;
      document.querySelectorAll('.slab').forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) overSlab = true;
      });
      setDark(overSlab);
      setScrolled(window.scrollY > 8);
    };
    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    return () => {
      window.removeEventListener('scroll', paint);
      window.removeEventListener('resize', paint);
    };
  }, []);

  /* Scroll spy */
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  const headerClass = ['site-header', dark && 'is-dark', scrolled && 'is-scrolled']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass} ref={headerRef}>
        <nav className="site-nav" id="siteNav" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : undefined}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <div className="nav-socials">
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </nav>

        <a className="status" href="#contact">
          <span>Available for work</span>
          <i aria-hidden="true" />
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="siteNav"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>
      <div className="veil" onClick={() => setOpen(false)} />
    </>
  );
}
