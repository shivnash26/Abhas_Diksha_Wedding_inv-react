/*
 * Hero.jsx — the main invitation card (names, parents, date, venue).
 *
 * data-reveal / data-delay: effects.js fades each line in, one after another.
 * data-par: effects.js moves these layers slightly while scrolling (parallax).
 */

// Peacock-feather ornaments hanging from the top.
// x = position across the screen, len = string length, d = animation delay (so they don't sway in sync).
const feathers = [
  { x: '52%', len: '150px', d: '0s' },
  { x: '56.5%', len: '120px', d: '-1.2s' },
  { x: '62%', len: '170px', d: '-2.1s' },
  { x: '73%', len: '175px', d: '-.6s' },
  { x: '78.5%', len: '160px', d: '-1.8s' },
  { x: '83%', len: '150px', d: '-2.6s' },
];

export default function Hero() {
  return (
    <section className="hero-1" id="top">
      {/* watercolour washes */}
      <div className="hero-2" data-par="0.1"></div>
      <div className="hero-3" data-par="0.14"></div>
      <div className="hero-4" data-par="-0.06"></div>
      <div className="hero-wash" data-par="-0.04"></div>

      <div className="hero-feathers" aria-hidden="true">
        {/* In React, `style` takes an object, not a string. CSS variables like --x work as keys too. */}
        {feathers.map((f, i) => (
          <span key={i} className="hero-feather" style={{ '--x': f.x, '--len': f.len, '--d': f.d }}></span>
        ))}
      </div>

      <div className="hero-5">
        <div className="hero-card-art" aria-hidden="true"></div>
        <div className="hero-6" data-reveal="1"><span>ॐ</span></div>
        <div className="hero-7" data-reveal="1" data-delay="80">॥ श्री गणेशाय नमः ॥</div>
        <div className="hero-8" data-reveal="1" data-delay="140">We cordially invite you to witness the beginning of our forever, and celebrate the wedding ceremony of</div>
        <h1 className="hero-9" data-reveal="1" data-delay="220">Diksha</h1>
        <div className="hero-10" data-reveal="1" data-delay="260">Daughter of Kumud Singh &amp; Anil Kumar Singh</div>
        <div className="hero-11" data-reveal="1" data-delay="300">with</div>
        <h1 className="hero-12" data-reveal="1" data-delay="340">Abhas</h1>
        <div className="hero-10" data-reveal="1" data-delay="380">Son of Sangeeta Tiwari &amp; Ashok Kumar Tiwari</div>
        <div className="hero-13" data-reveal="1" data-delay="400">
          {/* <br /> must be closed with a slash in JSX (plain HTML allows <br>) */}
          <div className="hero-14">The Singh &amp; Tiwari families graciously<br />request the honour of your presence</div>
          <div className="hero-15">Thursday, 3rd December 2026</div>
          <div className="hero-16">Lotus Portico Club<br />Jankipuram Ext, Beside ORO City, Lucknow</div>
        </div>
      </div>
      <div className="hero-20"></div>
    </section>
  );
}
