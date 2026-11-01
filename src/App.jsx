/*
 * App.jsx — the whole invitation, top to bottom.
 *
 * A React "component" is just a function that returns HTML-like markup (called JSX).
 * <Hero />, <Events /> etc. below are other components, each in src/components/.
 *
 * Quick React vocabulary (with the Angular equivalent):
 *  - props      = data passed into a component, like <Rsvp sent={sent} />   (Angular: @Input)
 *  - callbacks  = functions passed in, like <Envelope onOpen={...} />       (Angular: @Output + EventEmitter)
 *  - useState   = a value that, when changed, makes React redraw the screen (Angular: a class field)
 *  - useEffect  = run code after the component appears on screen           (Angular: ngAfterViewInit / ngOnDestroy)
 *  - useRef     = a box that holds something without causing a redraw, e.g. a DOM element (Angular: @ViewChild)
 */
import { useEffect, useRef, useState } from 'react';
import { startInvitationEffects } from './effects.js';
import { invitation } from './config.js';
import { sendRsvp } from './rsvp.js';
import Envelope from './components/Envelope.jsx';
import Nav from './components/Nav.jsx';
import MusicButton from './components/MusicButton.jsx';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';
import Memories from './components/Memories.jsx';
import Couple from './components/Couple.jsx';
import Rsvp from './components/Rsvp.jsx';
import Events from './components/Events.jsx';
import Awaiting from './components/Awaiting.jsx';
import Families from './components/Families.jsx';
import Venue from './components/Venue.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // The outer <div>, so the effects script knows which part of the page to animate.
  const rootRef = useRef(null);
  // The running effects (petals, scroll reveal, countdown, music). useRef keeps it between redraws.
  const fx = useRef(null);

  // State: when any of these change, React redraws the parts of the page that use them.
  const [opened, setOpened] = useState(!invitation.envelopeIntro); // has the envelope been opened?
  const [sent, setSent] = useState(false);                         // has the RSVP been sent?
  const [sending, setSending] = useState(false);                   // is the RSVP being sent right now?

  // Start the effects once, after the page first appears.
  // The empty [] means "only run once". The function we return runs when the app is removed (clean-up).
  useEffect(() => {
    fx.current = startInvitationEffects(rootRef.current, invitation);
    return () => fx.current.destroy();
  }, []);

  // New elements that appear later (e.g. the RSVP thank-you card) also need the scroll-reveal.
  // [opened, sent] means "run again whenever opened or sent changes".
  useEffect(() => { fx.current && fx.current.observe(); }, [opened, sent]);

  // Browsers only allow sound inside a tap, so the song starts the moment the envelope is tapped.
  const onEnvelopeTap = () => {
    if (invitation.musicSrc && invitation.musicOnOpen) fx.current.startMusic();
  };
  const openInvite = () => fx.current.openEnvelope(() => setOpened(true));
  const toggleMusic = () => fx.current.toggleMusic();

  // Called by <Rsvp /> with the form answers.
  const submitRsvp = async (data) => {
    setSending(true);
    try {
      await sendRsvp(data); // saves a row in your Google Sheet
      setSent(true);
    } catch (err) {
      alert('Sorry, your response could not be sent. Please check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  const showEnvelope = invitation.envelopeIntro && !opened;

  // JSX: looks like HTML, but `class` is written `className`, and {curly braces} hold JavaScript.
  return (
    <div ref={rootRef} className="invite-root">
      <canvas className="app-1" data-petals></canvas>
      <div className="app-2" data-sparkle></div>

      {/* `condition && <X />` shows X only when the condition is true (Angular: @if) */}
      {showEnvelope && <Envelope onTapped={onEnvelopeTap} onOpen={openInvite} />}

      <Nav />
      <MusicButton onToggle={toggleMusic} />
      <Hero />
      <Countdown />
      <Memories />
      <Couple />
      <Rsvp sent={sent} sending={sending} onSubmit={submitRsvp} />
      <Events />
      <Awaiting />
      <Families />
      <Venue />
      <Footer />
    </div>
  );
}
