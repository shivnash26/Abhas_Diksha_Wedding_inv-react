/*
 * Memories.jsx — "Meet the Bride & Groom": two rows of four photos.
 *
 * To add photos: put them in public/images/ and set `src`, e.g. 'images/us-1.webp'.
 * Leave src as '' to show a grey placeholder. Portrait photos (about 4:5) look best.
 */

const together = [
  { src: 'images/1.webp', alt: 'Diksha and Abhas together' },
  { src: 'images/2.webp', alt: 'Diksha and Abhas together' },
  { src: 'images/3.webp', alt: 'Diksha and Abhas together' },
  { src: 'images/4.webp', alt: 'Diksha and Abhas together' },
];

const overTheYears = [
  { src: 'images/5.webp', alt: 'Diksha and Abhas over the years' },
  { src: 'images/6.webp', alt: 'Diksha and Abhas over the years' },
  { src: 'images/7.webp', alt: 'Diksha and Abhas over the years' },
  { src: 'images/8.webp', alt: 'Diksha and Abhas over the years' },
];

// A small component used twice below. Components can live in the same file
// and take props, just like HTML attributes: <PhotoGrid photos={...} startAt={1} />
function PhotoGrid({ photos, startAt }) {
  return (
    <div className="memories-grid">
      {photos.map((p, i) =>
        // condition ? A : B  — show the photo if there is one, otherwise a placeholder (Angular: @if / @else)
        p.src ? (
          <img key={i} className="memories-photo slot" src={p.src} alt={p.alt} loading="lazy" />
        ) : (
          <div key={i} className="memories-photo slot slot--empty"><span>Photo {startAt + i}</span></div>
        )
      )}
    </div>
  );
}

export default function Memories() {
  return (
    <section className="memories-1" id="memories">
      <div className="memories-2" data-reveal="1">
        <h2 className="memories-title">Meet the Bride &amp; Groom</h2>
        <p className="memories-tagline">Together they are calmly chaotic, and think that a cup of coffee could fix everything.</p>
        <div className="memories-rule" aria-hidden="true"><span></span>✦<span></span></div>

        <PhotoGrid photos={together} startAt={1} />

        <div className="memories-subhead"><span></span><h3>Us over the years</h3><span></span></div>

        <PhotoGrid photos={overTheYears} startAt={5} />

        <div className="memories-rule memories-rule--plain" aria-hidden="true"><span></span></div>
        <p className="memories-story">A shared love for food, music, coffee, travelling, green corners and doing absolutely nothing together somehow turned into a lifetime plan.</p>
      </div>
    </section>
  );
}
