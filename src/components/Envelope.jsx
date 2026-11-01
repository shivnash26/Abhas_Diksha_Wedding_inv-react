/*
 * Envelope.jsx — the first screen: a sealed envelope the guest taps to open.
 *
 * Props (values passed in by App.jsx):
 *  - onTapped: called the moment the envelope is tapped (lets the music start)
 *  - onOpen:   called once the seal-breaking animation has played
 */
import { useState } from 'react';

export default function Envelope({ onTapped, onOpen }) {
  // `opening` is state: once true, the CSS class "is-opening" plays the flap animation.
  const [opening, setOpening] = useState(false);

  // Break the seal and lift the flap, then hand over to the page fade-out.
  const start = () => {
    if (opening) return; // ignore double taps
    setOpening(true);
    onTapped();
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setTimeout(onOpen, reduced ? 0 : 750);
  };

  // Keyboard users can open it with Enter or Space too.
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      start();
    }
  };

  return (
    // A class that depends on state: build the string with a template literal (`...${}...`).
    <div className={`envelope-1${opening ? ' is-opening' : ''}`} data-envelope>
      <div className="envelope-2">
        <div className="envelope-burst envelope-burst--top"></div>
        <div className="envelope-burst envelope-burst--corner"></div>
      </div>

      {/* Marigold festoon along the top edge.
          In JSX, SVG attributes with dashes become camelCase: stop-color → stopColor */}
      <svg className="envelope-festoon" aria-hidden="true">
        <defs>
          <pattern id="festoon-drops" width="258" height="40" patternUnits="userSpaceOnUse">
            <path d="M5 26h10v6c0 4-2 7-5 9-3-2-5-5-5-9z" fill="#e1892b" />
            <path d="M91 26h10v6c0 4-2 7-5 9-3-2-5-5-5-9z" fill="#e8b23a" />
            <path d="M177 26h10v6c0 4-2 7-5 9-3-2-5-5-5-9z" fill="#a8173a" />
          </pattern>
          <linearGradient id="festoon-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a1530" />
            <stop offset="1" stopColor="#9c3a4f" />
          </linearGradient>
        </defs>
        <rect width="100%" height="26" fill="url(#festoon-band)" />
        <rect width="100%" height="44" fill="url(#festoon-drops)" />
      </svg>

      {/* Lucknow skyline along the bottom edge */}
      <svg className="envelope-skyline" viewBox="0 0 1600 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g fill="currentColor">
          {/* dome with minarets */}
          <path d="M60 118v-34a22 26 0 0 1 44 0v34z" /><rect x="110" y="70" width="6" height="14" /><circle cx="122" cy="68" r="3" />
          {/* tall minaret */}
          <path d="M252 118v-82a8 8 0 0 1 16 0v82z" /><rect x="274" y="44" width="4" height="12" />
          {/* palace with chhatris */}
          <path d="M380 118v-46l8-10 8 10h12l12-14 12 14h12l8-10 8 10v46z" />
          {/* dome */}
          <path d="M600 118v-30a28 30 0 0 1 56 0v30z" /><rect x="662" y="62" width="6" height="16" /><circle cx="676" cy="60" r="3" />
          {/* temple / tree */}
          <path d="M800 118l-26 0 12-22h-6l10-18h-5l15-32 15 32h-5l10 18h-6l12 22z" />
          {/* palace */}
          <path d="M1112 118v-36l8-10 8 10h6l10-16 10 16h6l8-10 8 10v36z" />
          {/* dome with minaret */}
          <path d="M1318 118v-30a22 26 0 0 1 44 0v30z" /><rect x="1312" y="62" width="4" height="14" />
          {/* minaret */}
          <path d="M1456 118v-64a7 7 0 0 1 14 0v64z" /><rect x="1446" y="40" width="3" height="10" />
        </g>
        <rect y="117" width="1600" height="3" fill="currentColor" />
      </svg>

      {/* Event handlers are camelCase in React: onClick, onKeyDown (Angular: (click), (keydown)).
          tabIndex={0} lets keyboard users reach the envelope with Tab. */}
      <div className="envelope-3" role="button" tabIndex={0} aria-label="Open invitation"
           onClick={start} onKeyDown={onKey}>
        <div className="envelope-4"></div>
        <div className="envelope-rays"></div>
        <div className="envelope-side envelope-side--left"></div>
        <div className="envelope-side envelope-side--right"></div>
        <div className="envelope-5"></div>
        <div className="envelope-6"></div>
        <div className="envelope-7">
          <div className="envelope-8">D&amp;A</div>
        </div>
      </div>
      <div className="envelope-9">
        <div className="envelope-divider" aria-hidden="true"><span></span>◆ ◆ ◆<span></span></div>
        <div className="envelope-10">You’re Invited</div>
        <div className="envelope-11">Tap the envelope to break the seal</div>
      </div>
      <button className="envelope-12" onClick={start}>Open Invitation</button>
    </div>
  );
}
