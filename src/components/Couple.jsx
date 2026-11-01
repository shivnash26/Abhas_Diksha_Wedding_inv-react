/*
 * Couple.jsx — "Meet the Couple": a favourites card for each of them.
 */

// Images live in public/images/. Anything in public/ is copied to the site as-is,
// so a plain path like "images/bride.webp" works. (Vite can also `import` an image
// from src/ and give it a unique file name, but public/ is simpler.)

export default function Couple() {
  return (
    <section className="couple-1" id="couple">
      <div className="couple-2">
        <div className="couple-3">
          <div className="couple-4" data-reveal="1">The two of us</div>
          <h2 className="couple-5" data-reveal="1" data-delay="80">Meet the Couple</h2>
        </div>
        <div className="couple-6">
          <div className="couple-7" data-reveal="1">
            <div className="couple-8">Diksha’s Favourites</div>
            <img className="couple-9 slot" src="images/bride.webp" alt="Diksha" />
            <div className="couple-10">
              <div className="couple-11">🐱 Cats</div>
              <div className="couple-11">🎵 Music</div>
              <div className="couple-11">✈ Travelling</div>
              <div className="couple-11">🛍️ Shopping</div>
            </div>
            <div className="couple-12">“You’re the good part, you make all of it better.”</div>
          </div>
          <div className="couple-7" data-reveal="1" data-delay="110">
            <div className="couple-8">Abhas’s Favourites</div>
            <img className="couple-9 slot" src="images/groom.webp" alt="Abhas" />
            <div className="couple-13">
              <div className="couple-14">The only answer</div>
              <div className="couple-15">Diksha ♥</div>
              <div className="couple-16">Everything else is a distant second.</div>
            </div>
            <div className="couple-12">“I said ‘I do’ inside my head the first time.”</div>
          </div>
        </div>
      </div>
    </section>
  );
}
