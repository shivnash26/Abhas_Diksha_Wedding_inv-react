/*
 * Families.jsx — "With blessings from The Families", with hanging peacock feathers.
 */

// Same feather ornaments as the main card (see Hero.jsx), spread across the top.
const feathers = [
  { x: '0%', len: '200px', d: '0s' },
  { x: '18%', len: '150px', d: '-1.2s' },
  { x: '38%', len: '130px', d: '-2.1s' },
  { x: '58%', len: '130px', d: '-.6s' },
  { x: '77%', len: '150px', d: '-1.8s' },
  { x: '95%', len: '200px', d: '-2.6s' },
];

// One card per family.
const families = [
  { name: 'Tiwari Family', members: 'Sangeeta Tiwari & Ashok Kumar Tiwari' },
  { name: 'Singh Family', members: 'Kumud Singh & Anil Kumar Singh' },
];

export default function Families() {
  return (
    <section className="families-1" id="families">
      <div className="families-feathers" aria-hidden="true">
        {feathers.map((f, i) => (
          <span key={i} className="hero-feather" style={{ '--x': f.x, '--len': f.len, '--d': f.d }}></span>
        ))}
      </div>
      <div className="families-2">
        <div className="families-3">
          <div className="families-4" data-reveal="1">With blessings from</div>
          <h2 className="couple-5" data-reveal="1" data-delay="80">The Families</h2>
        </div>
        <div className="families-5">
          {/* data-delay staggers the two cards: the second one fades in 110 ms later */}
          {families.map((f, i) => (
            <div key={f.name} className="families-6" data-reveal="1" data-delay={i * 110}>
              <div className="families-8">{f.name}</div>
              <div className="families-9">{f.members}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
