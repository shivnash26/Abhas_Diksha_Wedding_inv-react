/*
 * Footer.jsx — the dark band at the bottom, with "Add to calendar" links.
 */
import { googleCalendarUrl, icsUrl } from '../calendar.js';

export default function Footer() {
  return (
    <footer className="footer-1">
      <div className="footer-2">
        <div className="footer-3" data-reveal="1">With love</div>
        <div className="footer-4" data-reveal="1" data-delay="90">Diksha &amp; Abhas</div>
        <div className="footer-5" data-reveal="1" data-delay="150">✦</div>
        <div className="footer-6" data-reveal="1" data-delay="200">03 . 12 . 2026</div>
        <div className="footer-cal" data-reveal="1" data-delay="240">
          <a href={googleCalendarUrl} target="_blank" rel="noopener">+ Google Calendar</a>
          <span aria-hidden="true">·</span>
          <a href={icsUrl} download="diksha-abhas-wedding.ics">+ Apple / Outlook</a>
        </div>
        <div className="footer-7">#DikshaWedsAbhas · The Singh &amp; Tiwari Families</div>
      </div>
    </footer>
  );
}
