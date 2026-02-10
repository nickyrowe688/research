import React from 'react';
import Link from '@docusaurus/Link';

export function CF({ lines, label }) {
  const text = label ?? `(CF${lines})`;

  return (
    <Link to={`/docs/texts/charter-fragment?lines=${lines}`}>
      {text}
    </Link>
  );
}

export function BM({ lines, label }) {
  const text = label ?? `(BM${lines})`;

  return (
    <Link to={`/docs/texts/bewnans-meriasek?lines=${lines}`}>
      {text}
    </Link>
  );
}
