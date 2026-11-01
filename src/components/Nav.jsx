/*
 * Nav.jsx — the menu bar that fades in once you scroll past the main card.
 * Links like href="#rsvp" jump to the section with id="rsvp".
 * (Showing / hiding the bar is done by effects.js, not React.)
 */

// The menu as data: to add a link, add a line here. The .map() below turns each into an <a>.
const links = [
  { href: '#memories', label: 'Memories' },
  { href: '#couple', label: 'Couple' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#events', label: 'Events' },
  { href: '#families', label: 'Families' },
  { href: '#venue', label: 'Location' },
];

export default function Nav() {
  return (
    <div className="nav-1" data-nav="1">
      <a className="nav-2" href="#top">D &amp; A</a>
      <div className="nav-3">
        {/* .map() repeats markup for every item in a list (Angular: @for).
            React needs a unique `key` on each repeated item to keep track of it. */}
        {links.map((link) => (
          <a key={link.href} className="nav-4" href={link.href}>{link.label}</a>
        ))}
      </div>
    </div>
  );
}
