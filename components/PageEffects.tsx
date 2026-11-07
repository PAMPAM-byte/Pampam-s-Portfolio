'use client';

import { useEffect } from 'react';

/* Page-wide behaviour that has no markup of its own */
export default function PageEffects() {
  /* Always open at the top, not at a restored position or #section */
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);
    const onShow = () => window.scrollTo(0, 0);
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  /* In-page links scroll without writing #section into the address bar */
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.('a[href^="#"]:not(.skip)');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href') || '');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: calm ? 'auto' : 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* Reveal on scroll */
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
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
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Work: the project nearest the middle of the screen shows in colour */
  useEffect(() => {
    const live = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-live', entry.isIntersecting);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    document.querySelectorAll('.project').forEach((p) => live.observe(p));
    return () => live.disconnect();
  }, []);

  return null;
}
