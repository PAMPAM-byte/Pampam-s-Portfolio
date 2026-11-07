'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = { src: string; title: string };

/* Opens a PDF in a modal portalled to <body>, so a transformed ancestor
   can't trap its fixed positioning. Escape, the close button, or the
   backdrop close it. */
export default function CertificateButton({ src, title }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button className="btn btn-solid" type="button" onClick={() => setOpen(true)}>
        View certificate
      </button>
      {mounted && createPortal(
      <div
        className={open ? 'modal is-open' : 'modal'}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdfTitle"
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <div className="modal-inner">
          <div className="modal-bar">
            <strong id="pdfTitle">{title}</strong>
            <button type="button" aria-label="Close" ref={closeRef} onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          {open && <iframe src={src} title="Certificate PDF" />}
        </div>
      </div>,
      document.body
      )}
    </>
  );
}
