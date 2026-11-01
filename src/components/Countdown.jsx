/*
 * Countdown.jsx — the gold "scratch to reveal" ticket.
 * Under the foil is the countdown; the numbers are filled in every second by effects.js
 * (it looks for the data-countdown-* attributes).
 *
 * The foil is a <canvas>. Scratching "erases" pixels from it, and once half is gone
 * the rest fades away.
 */
import { useEffect, useRef, useState } from 'react';

export default function Countdown() {
  // useRef gives us the real <canvas> element once it is on screen (Angular: @ViewChild).
  const foilRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  // Keep `revealed` readable inside the event handlers below without re-running the effect.
  const revealedRef = useRef(false);

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true); // React redraws, adding the "is-gone" class that fades the foil
  };

  // Everything below runs once, after the canvas appears. The returned function cleans up.
  useEffect(() => {
    const cv = foilRef.current;
    const ctx = cv.getContext('2d');
    if (!ctx) { reveal(); return; }

    let scratching = false;
    let last = null;   // previous pointer position, so strokes are joined up
    let moves = 0;     // how many scratch strokes so far

    // Paint the gold foil (re-done on resize until someone starts scratching).
    const paintFoil = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth, h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // brushed gold
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#c9a066');
      g.addColorStop(0.3, '#e9cd92');
      g.addColorStop(0.48, '#f3dca4');
      g.addColorStop(0.7, '#c79a5c');
      g.addColorStop(1, '#b8874a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,240,205,.16)';
      ctx.lineWidth = 1;
      for (let x = -h; x < w; x += 6) {
        ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(x + h, 0); ctx.stroke();
      }
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = `rgba(255,248,225,${(0.15 + Math.random() * 0.4).toFixed(2)})`;
        ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.8 + 0.4, 0, Math.PI * 2); ctx.fill();
      }

      // seal
      const cx = w / 2, sy = h * 0.3;
      const sg = ctx.createRadialGradient(cx - 4, sy - 5, 2, cx, sy, 14);
      sg.addColorStop(0, '#fff7e4'); sg.addColorStop(0.6, '#ecd6a8'); sg.addColorStop(1, '#c9a368');
      ctx.fillStyle = sg;
      ctx.shadowColor = 'rgba(90,60,25,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2;
      ctx.beginPath(); ctx.arc(cx, sy, 14, 0, Math.PI * 2); ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#6b3a22';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '13px Georgia, serif';
      ctx.fillText('✦', cx, sy + 1);

      // lettering
      ctx.fillStyle = '#6b2f1f';
      ctx.font = `${Math.min(40, w / 9)}px "Great Vibes", cursive`;
      ctx.fillText('Scratch to reveal', cx, h * 0.56);
      ctx.fillStyle = 'rgba(95,60,30,.6)';
      ctx.font = '9px "Cormorant Garamond", Georgia, serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('DRAG ACROSS THE PANEL', cx, h * 0.76);
      ctx.letterSpacing = '0px';
    };

    // Pointer position relative to the canvas.
    const point = (e) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    // Once most of the foil is gone, fade the rest away.
    const checkCleared = () => {
      if (revealedRef.current || !cv.width) return;
      const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 64) { total++; if (data[i] < 40) clear++; }
      if (clear / total > 0.5) reveal();
    };

    // "Erase" a thick line from the last point to this one.
    const scratch = (p) => {
      if (revealedRef.current) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = '#000';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 38;
      ctx.beginPath();
      const from = last ?? p;
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(p.x + 0.01, p.y);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
      last = p;
      if (++moves % 12 === 0) checkCleared();
    };

    const onDown = (e) => {
      scratching = true;
      last = point(e);
      cv.setPointerCapture?.(e.pointerId);
      scratch(last);
    };
    const onMove = (e) => { if (scratching) scratch(point(e)); };
    const onStop = () => { scratching = false; last = null; checkCleared(); };

    // Wait for the script font so the foil lettering is drawn in Great Vibes.
    (document.fonts?.load ? document.fonts.load('40px "Great Vibes"').catch(() => {}) : Promise.resolve())
      .then(paintFoil);

    cv.addEventListener('pointerdown', onDown);
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerup', onStop);
    cv.addEventListener('pointercancel', onStop);

    // Keep the foil sharp on resize, as long as nobody has scratched it yet.
    const ro = 'ResizeObserver' in window
      ? new ResizeObserver(() => { if (!moves && !revealedRef.current) paintFoil(); })
      : null;
    ro?.observe(cv);

    // Clean-up: React calls this when the component is removed.
    return () => {
      cv.removeEventListener('pointerdown', onDown);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerup', onStop);
      cv.removeEventListener('pointercancel', onStop);
      ro?.disconnect();
    };
  }, []);

  // Keyboard users can press Enter / Space on the foil to reveal it.
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); }
  };

  return (
    <section className="countdown-1">
      <div className="countdown-2" data-reveal="1">
        <div className="countdown-strip">
          <span className="countdown-label countdown-label--top">Celebrate the couple</span>
        </div>

        <div className="countdown-panel">
          {/* revealed underneath the foil */}
          <div className="countdown-under">
            <div className="countdown-3">Counting down</div>
            <div className="countdown-4" data-countdown-days>00</div>
            <div className="countdown-5">Days to go</div>
            <div className="countdown-clock">
              <span data-countdown-hours>00</span><i>h</i>
              <span data-countdown-minutes>00</span><i>m</i>
              <span data-countdown-seconds>00</span><i>s</i>
            </div>
            <div className="countdown-date">Thursday · 3rd December 2026</div>
          </div>

          {/* gold foil the guest scratches away. ref={foilRef} connects it to useRef above. */}
          <canvas ref={foilRef} className={`countdown-foil${revealed ? ' is-gone' : ''}`}
                  tabIndex={0} role="button" aria-label="Scratch to reveal the countdown"
                  onKeyDown={onKey}></canvas>
        </div>

        <div className="countdown-strip">
          <span className="countdown-label">Lucknow</span>
        </div>

        <span className="countdown-notch countdown-notch--left"></span>
        <span className="countdown-notch countdown-notch--right"></span>
      </div>
    </section>
  );
}
