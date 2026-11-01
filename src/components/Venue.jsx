/*
 * Venue.jsx — "The Venue": map, directions, and who to call with questions.
 */

// Contact numbers for guests (Indian numbers, without +91).
const phones = [
  { tel: '8176875720', display: '+91 81768 75720' },
  { tel: '9172063059', display: '+91 91720 63059' },
];

export default function Venue() {
  return (
    <section className="venue-1" id="venue">
      <div className="venue-2">
        <div className="couple-4" data-reveal="1">Where to find us</div>
        <h2 className="venue-3" data-reveal="1" data-delay="80">The Venue</h2>
        <div className="venue-4" data-reveal="1" data-delay="130">Lotus Portico Club<br />Jankipuram Ext, Beside ORO City<br />Lucknow</div>
        <div className="venue-5" data-reveal="1" data-delay="180">
          <iframe className="venue-6" title="Venue map" src="https://maps.google.com/maps?q=Lotus%20Portico%20Club%20Lucknow&z=14&output=embed" loading="lazy"></iframe>
        </div>
        <a className="venue-7" href="https://maps.google.com/?q=Lotus%20Portico%20Club%20Lucknow" target="_blank" rel="noopener" data-reveal="1" data-delay="230">
          ✦ Get Directions ✦
        </a>

        {/* questions about the day, travel or stay */}
        <div className="venue-contact" data-reveal="1" data-delay="280">
          <div className="venue-contact-kicker">Questions? Reach out to</div>
          <div className="venue-contact-name">Abhas Tewari</div>
          {phones.map((n) => (
            <div key={n.tel} className="venue-contact-row">
              <span className="venue-contact-num">{n.display}</span>
              {/* tel: opens the phone dialler, wa.me opens a WhatsApp chat */}
              <a className="venue-contact-btn" href={`tel:+91${n.tel}`}>Call</a>
              <a className="venue-contact-btn venue-contact-btn--wa" href={`https://wa.me/91${n.tel}`} target="_blank" rel="noopener">WhatsApp</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
