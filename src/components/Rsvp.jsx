/*
 * Rsvp.jsx — the RSVP form, and the thank-you card shown after sending.
 *
 * Props from App.jsx:
 *  - sent:     true once the reply has gone (shows the thank-you card instead of the form)
 *  - sending:  true while it is being sent (disables the button)
 *  - onSubmit: function App.jsx gives us; we call it with the answers
 */
import { useState } from 'react';

// Answer choices. Edit these lists to change the options shown.
const sides = ['Bride', 'Groom', 'Both'];
const travel = ['By car directly to the venue', 'Flying to Lucknow first', 'Coming by train to Lucknow Station', 'Need to plan'];
const days = ['Sangeet', 'Matra Poojan', 'Baraat', 'Varmala'];

export default function Rsvp({ sent, sending, onSubmit }) {
  // These two answers decide which other questions to show, so React needs to know them.
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser reloading the page (its default for forms)
    // FormData reads every named field in the form. Hidden questions aren't on the page,
    // so they simply aren't sent.
    const fd = new FormData(e.currentTarget);
    onSubmit({ ...Object.fromEntries(fd), days: fd.getAll('d') });
  };

  return (
    <section className="rsvp-1" id="rsvp">
      <div className="rsvp-2">
        <div className="rsvp-3">
          <div className="couple-4 rsvp-kicker" data-reveal="1">Kindly respond by 10 November</div>
          <h2 className="couple-5 rsvp-title" data-reveal="1" data-delay="80">RSVP</h2>
        </div>

        {sent ? (
          <div className="rsvp-4">
            <div className="rsvp-5">Thank you</div>
            <div className="rsvp-6">आपकी उपस्थिति हमारे लिए आशीर्वाद है।</div>
            <div className="rsvp-7">We have your response. Details for the day will reach you closer to December.</div>
          </div>
        ) : (
          <form className="rsvp-8" onSubmit={handleSubmit} data-reveal="1" data-delay="130">
            <label className="rsvp-9">
              <span className="rsvp-10">Full name</span>
              <input className="rsvp-11" name="name" required placeholder="Your name" autoComplete="name" />
            </label>

            <div className="rsvp-12">
              <label className="rsvp-9">
                <span className="rsvp-10">Attending</span>
                {/* onChange runs on every change; e.target.value is the chosen option */}
                <select className="rsvp-13" name="attending" value={attending} onChange={(e) => setAttending(e.target.value)}>
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </label>
              {attending === 'yes' && (
                <label className="rsvp-9">
                  <span className="rsvp-10">Guests (including you)</span>
                  <select className="rsvp-13" name="guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </label>
              )}
            </div>

            <fieldset className="rsvp-14">
              <legend className="rsvp-10">Are you from bride’s side or groom’s?</legend>
              <div className="rsvp-15">
                {sides.map((o) => (
                  <label key={o} className="rsvp-16"><input className="rsvp-17" type="radio" name="side" value={o} />{o}</label>
                ))}
              </div>
            </fieldset>

            {/* Only for guests who are coming. <> ... </> is a "fragment": a wrapper that adds no HTML. */}
            {attending === 'yes' && (
              <>
                {guests !== '1' && (
                  <label className="rsvp-9">
                    <span className="rsvp-10">Names of everyone coming with you</span>
                    <input className="rsvp-11" name="attendees" placeholder="e.g. Rahul, Priya" />
                  </label>
                )}

                <fieldset className="rsvp-14">
                  <legend className="rsvp-10">How will you be traveling to Lucknow?</legend>
                  <div className="rsvp-15">
                    {travel.map((o) => (
                      <label key={o} className="rsvp-16"><input className="rsvp-17" type="radio" name="travel" value={o} />{o}</label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="rsvp-14">
                  <legend className="rsvp-10">Which days will you join?</legend>
                  <div className="rsvp-15">
                    {days.map((o) => (
                      <label key={o} className="rsvp-16"><input className="rsvp-17" type="checkbox" name="d" value={o} />{o}</label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            <label className="rsvp-9">
              <span className="rsvp-10">A note for the couple</span>
              <textarea className="rsvp-18" name="note" rows="3" placeholder="Blessings/love, dietary foods, skincare tips, anything at all" />
            </label>
            <button className="rsvp-19" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send Response'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
