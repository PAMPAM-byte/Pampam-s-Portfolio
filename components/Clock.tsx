'use client';

import { useEffect, useState } from 'react';

const format = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

/* Lagos time; renders a dash on the server so hydration matches */
export default function Clock() {
  const [time, setTime] = useState('—');

  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}
