import React, { useEffect } from 'react';
import styles from './PlayText.module.css';
import AnnotatedText from './AnnotatedText';

export default function PlayText({ blocks }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('lines');

    if (!target) return;

    const lines = expandLines(target);

    lines.forEach(n => {
      const el = document.getElementById(`line-${n}`);
      if (el) el.classList.add(styles.highlight);
    });

    const first = document.getElementById(`line-${lines[0]}`);
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className={styles.wrapper}>
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}


function renderBlock(block, key) {
  switch (block.type) {
    case 'section':
      return (
        <div key={key} className={styles.section}>
          <h2>{block.title}</h2>
          {block.description && <p>{block.description}</p>}
        </div>
      );

    case 'speaker':
      return (
        <div className={styles.speaker}>
          <div className={styles.lineNo}>{block.line}</div>
          <div><AnnotatedText text={block.original} /></div>
          <div><AnnotatedText text={block.modern} /></div>
          <div><AnnotatedText text={block.english} /></div>
        </div>
      );

    case 'stage':
      return (
        <div className={styles.stage}>
          <div className={styles.lineNo}>{block.line}</div>
          <div><AnnotatedText text={block.original} /></div>
          <div><AnnotatedText text={block.modern} /></div>
          <div><AnnotatedText text={block.english} /></div>
        </div>
      );

    case 'line':
      return (
        <div
          key={key}
          id={`line-${block.line}`}
          className={styles.line}
        >
          <div className={styles.lineNo}>{block.line}</div>
          <div><AnnotatedText text={block.original} /></div>
          <div><AnnotatedText text={block.modern} /></div>
          <div><AnnotatedText text={block.english} /></div>
        </div>
      );

    case 'blank':
      return <div key={key} className={styles.blank} />;

    default:
      return null;
  }
}


function expandLines(input) {
  // examples:
  // "5" → [5]
  // "5-8" → [5,6,7,8]
  // "5,7,10-12" → [5,7,10,11,12]

  const result = new Set();

  input.split(',').forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          result.add(i);
        }
      }
    } else {
      const n = Number(part);
      if (!isNaN(n)) result.add(n);
    }
  });

  return [...result].sort((a, b) => a - b);
}



