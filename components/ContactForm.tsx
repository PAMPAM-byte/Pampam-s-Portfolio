'use client';

import { useState, type FormEvent } from 'react';
import { contact, contactTopics } from '@/lib/content';

type Note = { text: string; state: '' | 'ok' | 'error' };

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [label, setLabel] = useState('Send message');
  const [note, setNote] = useState<Note>({ text: '', state: '' });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value.trim() ?? '';

    if (field('_gotcha')) return;

    const data = {
      name: field('name'),
      email: field('email'),
      topic: field('topic'),
      message: field('message'),
    };

    if (!data.name || !data.email || !data.message) {
      setNote({ text: 'Name, email, and a message are required.', state: 'error' });
      return;
    }

    setSending(true);
    setLabel('Sending…');
    setNote({ text: '', state: '' });

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'Portfolio — ' + data.topic }),
      });
      if (!res.ok) throw new Error('send failed');
      form.reset();
      setNote({ text: 'Message sent. I’ll reply to your email.', state: 'ok' });
      setLabel('Message sent');
      setTimeout(() => {
        setSending(false);
        setLabel('Send message');
      }, 2800);
    } catch {
      const subject = encodeURIComponent('Portfolio — ' + data.topic);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setNote({ text: 'Opening your email app to send the message.', state: 'ok' });
      setSending(false);
      setLabel('Send message');
    }
  };

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="gotcha">Leave blank</label>
        <input type="text" id="gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="topic">Reaching out about</label>
        <select id="topic" name="topic">
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Role, timeline, and anything I should know."
        />
      </div>
      <button className="btn btn-invert" type="submit" disabled={sending}>
        {label}
      </button>
      <p className="form-note" role="status" aria-live="polite" data-state={note.state}>
        {note.text}
      </p>
    </form>
  );
}
