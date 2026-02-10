import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './ParallelText.module.css';

export default function ParallelText({ lines }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('lines'); // e.g. "12" or "12-14,18"

    if (!target) return;

    const lineNumbers = expandLines(target);

    lineNumbers.forEach(n => {
      const el = document.getElementById(`line-${n}`);
      if (el) el.classList.add(styles.highlight);
    });

    const first = document.getElementById(`line-${lineNumbers[0]}`);
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className={styles.wrapper}>
      {lines.map(l => (
        <div key={l.line} id={`line-${l.line}`} className={styles.row}>
          <div className={styles.lineNo}>{l.line}</div>
          <div className={styles.original}>{l.original}</div>
          <div className={styles.modern}>{l.modern}</div>
          <div className={styles.english}>{l.english}</div>
        </div>
      ))}
    </div>
  );
}

function expandLines(input) {
  // "12-14,18" → [12,13,14,18]
  return input.split(',').flatMap(part => {
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number);
      return Array.from({ length: b - a + 1 }, (_, i) => a + i);
    }
    return [Number(part)];
  });
}
