import React, { useMemo, useState } from 'react';
import styles from './AnnotatedText.module.css';

const NOTE_PATTERN = /\[\[note:(.*?)\]\]/gs;

export default function AnnotatedText({ text }) {
  const content = text ?? '';
  const tokens = useMemo(() => tokenize(content), [content]);

  return (
    <>
      {tokens.map((token, idx) => {
        if (token.type === 'note') {
          return <InlineNote key={`${token.note}-${idx}`} note={token.note} />;
        }

        return <React.Fragment key={`text-${idx}`}>{token.value}</React.Fragment>;
      })}
    </>
  );
}

function InlineNote({ note }) {
  const [open, setOpen] = useState(false);

  return (
    <span className={styles.noteWrapper}>
      <button
        type="button"
        className={styles.noteButton}
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
      >
        [note]
      </button>
      {open && <span className={styles.noteContent}>{note}</span>}
    </span>
  );
}

function tokenize(text) {
  const tokens = [];
  let cursor = 0;

  for (const match of text.matchAll(NOTE_PATTERN)) {
    const index = match.index ?? 0;

    if (index > cursor) {
      tokens.push({ type: 'text', value: text.slice(cursor, index) });
    }

    tokens.push({ type: 'note', note: (match[1] || '').trim() });
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    tokens.push({ type: 'text', value: text.slice(cursor) });
  }

  if (tokens.length === 0) {
    tokens.push({ type: 'text', value: text });
  }

  return tokens;
}
