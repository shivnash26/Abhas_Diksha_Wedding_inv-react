/*
 * Events.jsx — the "Events Schedule": one coloured card per event.
 *
 * The cards are drawn from the `events` list below, so changing a date, time,
 * colour or place is a one-line edit — no markup to touch.
 */
import { Fragment } from 'react';
import { googleCalendarUrl, icsUrl } from '../calendar.js';

// Where each event happens. Each place links to Google Maps.
const HOME = {
  label: 'Home',
  // 2/340, Vishwas Khand, Gomti Nagar, Lucknow
  url: 'https://www.google.com/maps/search/?api=1&query=2%2F340%2C%20Vishwas%20Khand%2C%20Gomti%20Nagar%2C%20Lucknow',
};
const VENUE = {
  label: 'Lotus Portico Club',
  // Lotus Portico Club, Jankipuram Ext, Beside ORO City, Lucknow
  url: 'https://maps.google.com/?q=Lotus%20Portico%20Club%20Lucknow',
};

// Show the illustration on each card ('pictures'), or a small line icon on every card ('icons').
// A card without a picture always falls back to its icon.
const ART = 'pictures';

// A small circle written as an SVG path (used for flowers and music notes).
const dot = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

// Line-art icons on a 24×24 grid, drawn in each card's colour.
const ICONS = {
  // dholak with music notes
  sangeet: ['M4 15.5c0-2 1-3 2-3h9c1 0 2 1 2 3s-1 3-2 3H6c-1 0-2-1-2-3z', 'M6 12.5v6M15 12.5v6', 'M8 12.5l2 6M10.5 12.5l2 6',
    'M17 4.5v5', 'M21 3.5v5', 'M17 4.5l4-1', dot(16, 9.5, 1), dot(20, 8.5, 1)],
  // diya with a flame
  matra: ['M3 14.5c2 3 5 4.5 9 4.5s7-1.5 9-4.5c-2 .6-4.5.9-9 .9s-7-.3-9-.9z', 'M9 21.5h6',
    'M12 4c1.8 2.3 2.6 3.8 2.6 5.1a2.6 2.6 0 0 1-5.2 0c0-1.3.8-2.8 2.6-5.1z'],
  // trumpet (the "band baaja")
  baraat: ['M13 9.5L20 6v10l-7-3.5z', 'M3 9.5h10M3 12.5h10', 'M3 8.5v5', 'M6.5 9.5v-3M9 9.5v-3M11.5 9.5v-3',
    'M5.8 6.5h1.4M8.3 6.5h1.4M10.8 6.5h1.4', 'M5 12.5c0 3 1.6 4.5 4 4.5s4-1.5 4-4.5'],
  // varmala (flower garland), drawn as a row of beads by the CSS
  varmala: ['M5 3c0 9 3 14.5 7 14.5S19 12 19 3', dot(12, 19.6, 1.6)],
};

// The Royal Night palette (deep jewel tones for the evening).
const ROYAL_NIGHT = ['#7A1F3D', '#1F5E4A', '#1E3A6E', '#C9A24A', '#F3EBDD'];

/*
 * The events. Fields:
 *  numeral   big faded number behind the card
 *  theme     card colours, from sections.css: haldi | sangeet | tel | matra | baraat | vidaai
 *  icon      which icon from ICONS above
 *  image     illustration (in public/images/events/), optional
 *  colours   dress-code swatches, optional
 *  note      dress-code line, optional
 *  place     HOME or VENUE
 *  calendar  true = show the "Add to calendar" buttons on this card
 */
const events = [
  {
    numeral: 'I', theme: 'sangeet', icon: 'sangeet', image: 'images/events/sangeet.webp',
    date: 'Tue · 1 Dec 2026', title: 'Sangeet',
    subtitle: 'An afternoon of song and dance — both families have been rehearsing in secret.',
    time: '4:00 PM onwards', place: HOME,
    colours: ['#1F6E7E', '#3E7D5A', '#C69A3E', '#1E1E1E', '#C9CCCF'],
    note: 'Glamorous cocktail & jewel tones',
  },
  {
    numeral: 'II', theme: 'matra', icon: 'matra', image: 'images/events/matra.webp',
    date: 'Wed · 2 Dec 2026', title: 'Matra Poojan',
    subtitle: 'Seeking the blessings of the mothers who came before us.',
    time: '10:00 AM onwards', place: HOME,
    colours: ['#F2C94C', '#E8952E', '#8FB8A3'],
    note: 'Comfy pastels & marigold yellows',
  },
  {
    numeral: 'III', theme: 'tel', icon: 'baraat', image: 'images/events/baraat.webp',
    date: 'Thu · 3 Dec 2026', title: 'Band, Baaja & Baraat',
    subtitle: 'The groom’s procession — dhol, dancing and a very proud family.',
    time: '5:00 PM onwards', place: HOME,
    colours: ROYAL_NIGHT,
    note: 'Jewel tones & festive finery — maroon, emerald, royal blue, gold',
  },
  {
    numeral: 'IV', theme: 'baraat', icon: 'varmala', image: 'images/events/varmala.webp',
    date: 'Thu · 3 Dec 2026', title: 'Varmala',
    subtitle: 'The exchange of garlands — the big moment is finally here.',
    time: '9:00 PM onwards', place: VENUE, calendar: true,
    colours: ROYAL_NIGHT,
    note: 'Jewel tones & festive finery — maroon, emerald, royal blue, gold',
  },
];

export default function Events() {
  return (
    <section className="events-1" id="events">
      <div className="events-2">
        <div className="events-3">
          <div className="events-4" data-reveal="1">Days of celebration</div>
          <h2 className="events-5" data-reveal="1" data-delay="80">Events Schedule</h2>
        </div>
        <div className="events-7">
          {events.map((e, i) => (
            // Each event renders two things (divider + card), so they're wrapped in a Fragment,
            // which carries the `key` without adding any HTML.
            <Fragment key={e.title}>
              {i > 0 && (
                <div className={`ev-sep ev--${e.theme}`} data-reveal="1" aria-hidden="true"><span></span>✦<span></span></div>
              )}
              <article className={`ev-card ev--${e.theme}`} data-reveal="1">
                <div className="ev-numeral" aria-hidden="true">{e.numeral}</div>
                <div className="ev-ring" aria-hidden="true"></div>
                <div className="ev-ring ev-ring--dashed" aria-hidden="true"></div>
                <div className="ev-body">
                  {ART === 'pictures' && e.image ? (
                    <img className="ev-picture" src={e.image} alt="" loading="lazy" />
                  ) : (
                    <div className={`ev-icon ev-icon--${e.icon}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        {ICONS[e.icon].map((d, j) => <path key={j} d={d} />)}
                      </svg>
                    </div>
                  )}
                  <div className="ev-date"><span></span>{e.date}<span></span></div>
                  <h3 className="ev-title">{e.title}</h3>
                  <p className="ev-sub">{e.subtitle}</p>
                  <div className="ev-rule"></div>
                  <div className="ev-time">{e.time}</div>
                  <a className="ev-place" href={e.place.url} target="_blank" rel="noopener"
                     aria-label={`${e.place.label} – open in Google Maps`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                    {e.place.label}
                  </a>
                  {e.colours && (
                    <>
                      <div className="ev-kicker">Colours of the event</div>
                      <div className="ev-swatches">
                        {e.colours.map((c, j) => <span key={j} className="ev-swatch" style={{ background: c }}></span>)}
                      </div>
                    </>
                  )}
                  {e.note && <div className="ev-note">{e.note}</div>}
                  {e.calendar && (
                    <div className="ev-cal">
                      <a className="ev-cal-btn" href={googleCalendarUrl} target="_blank" rel="noopener">+ Google Calendar</a>
                      <a className="ev-cal-btn" href={icsUrl} download="diksha-abhas-wedding.ics">+ Apple / Outlook</a>
                    </div>
                  )}
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
