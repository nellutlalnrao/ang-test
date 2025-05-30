import React, { useState } from "react";
import './index.css';

const symbolConfig = {
  "plus":    ["horizCenter", "vertCenter"],
  "minus":   ["horizCenter"],
  "multiply":["diagSlash1","diagSlash2"]
};

const Symbol = ({ type }) => {
  // Load config for this symbol
  const config = symbolConfig[type]; // from our JSON
  // Track active segments in state
  const [active, setActive] = useState(new Set(config));
  const toggle = id => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <div className={`symbol symbol-${type}`}>
      {config.map(segId => (
        <div
          key={segId}
          className={`segment seg-${segId} ${active.has(segId) ? 'active' : ''}`}
          onClick={() => toggle(segId)}
        />
      ))}
    </div>
  );
}

export default Symbol;