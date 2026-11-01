# Diksha & Abhas · Wedding Invitation (React + Vite)

The animated wedding invitation (envelope intro, scratch-card countdown, memories,
illustrated event cards, RSVP, venue map and contact card) as a React + Vite project.
It has the same design, text and photos as the Angular version; only the events,
their dates and the home address differ.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser. Edits show up instantly.

## Where to edit things

| What you want to change | File |
|---|---|
| Names, parents, date, venue on the main card | `src/components/Hero.jsx` |
| Envelope screen ("You're Invited", D&A seal) | `src/components/Envelope.jsx` |
| Memories photos | `src/components/Memories.jsx` |
| Couple cards and favourites | `src/components/Couple.jsx` |
| **Events: names, dates, times, places, colours** | `src/components/Events.jsx` (the `events` list) |
| Home address / venue links on the event cards | `src/components/Events.jsx` (`HOME`, `VENUE`) |
| Families | `src/components/Families.jsx` |
| RSVP questions and deadline | `src/components/Rsvp.jsx` |
| Venue map and contact numbers | `src/components/Venue.jsx` |
| Footer | `src/components/Footer.jsx` |
| Menu links | `src/components/Nav.jsx` |
| Add-to-calendar details | `src/calendar.js` and `public/wedding.ics` |
| Countdown date, music, RSVP sheet URL, petals | `src/config.js` |
| Site address for the WhatsApp preview | `.env` |
| Colours, sizes, spacing | `src/styles/sections.css` |
| Animations (petals, reveal, music, countdown) | `src/effects.js` |

### Background music
Put an `.mp3` in `public/audio/` and set `musicSrc` in `src/config.js`, e.g.
`'audio/our-song.mp3'`. It starts when the guest taps the envelope. Until then the
music button plays a soft generated tone.

### Adding photos
- **Memories:** photos are in `public/images/` (1.webp – 8.webp); change the `src` values in `Memories.jsx`.
- **Couple:** `public/images/bride.webp` and `groom.webp`.
- **Event illustrations:** `public/images/events/` (one per card, set with `image:` in `Events.jsx`).
  A card without an image shows its line icon instead.

### WhatsApp link preview
`.env` holds the site address (`VITE_SITE_URL`). If your GitHub repo has a different
name, change it there. The preview card itself is `public/images/share-card.jpg`.

### Save RSVPs to a spreadsheet (Google Sheets → Excel)
Each RSVP is saved as a new row: time, name, attending, guests, days, note, side,
attendees and travel.

1. Go to [sheets.new](https://sheets.new) to create a Google Sheet, for example "Wedding RSVPs".
2. In the sheet, open **Extensions → Apps Script**. Delete the code there, paste in
   everything from `google-sheet/Code.gs`, and click **Save**.
3. Click **Deploy → New deployment**, click the gear icon, and choose **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy**, allow the permissions (choose your account →
   *Advanced* → *Go to project* → *Allow*), and copy the **Web app URL**
   (it ends in `/exec`).
4. Paste that URL into `rsvpSheetUrl` in `src/config.js`, then push to GitHub.

While `rsvpSheetUrl` is empty, replies are only printed in the browser console
(right-click → Inspect → Console), which is handy for testing.
To get an Excel file at any time: **File → Download → Microsoft Excel (.xlsx)**.

## React in five minutes (for Angular people)

Every file in `src/components/` is a **component**: a function that returns
HTML-like markup called **JSX**. Open any of them; they all have comments.

| Idea | Angular | React (this project) |
|---|---|---|
| A component | class + `.html` template | one function returning JSX |
| CSS class | `class="..."` | `className="..."` |
| Show a value | `{{ e.title }}` | `{e.title}` |
| Pass data in | `@Input() sent` | props: `function Rsvp({ sent })` |
| Send an event out | `@Output() open = new EventEmitter()` | pass a function: `<Envelope onOpen={openInvite} />` |
| Click handler | `(click)="start()"` | `onClick={start}` |
| Show if… | `@if (sent) { … }` | `{sent && …}` or `{sent ? A : B}` |
| Repeat a list | `@for (e of events; track e.title)` | `{events.map((e) => <X key={e.title} />)}` |
| A value that updates the screen | class field | `const [sent, setSent] = useState(false)` |
| Run code after it appears | `ngAfterViewInit` / `ngOnDestroy` | `useEffect(() => { … return cleanUp; }, [])` |
| Reach a DOM element | `@ViewChild('foil')` | `const foilRef = useRef(null)` + `ref={foilRef}` |
| Inline style | `[style.background]="c"` | `style={{ background: c }}` |

Good files to read first: `Nav.jsx` (lists and `.map`), `Envelope.jsx` (state and clicks),
`Rsvp.jsx` (a form that changes as you answer) and `Countdown.jsx` (`useRef` and `useEffect`).

## Publish on GitHub Pages

1. Create a new repository on GitHub and push this folder to the `main` branch.
2. In the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes the site
   on every push. Your link will be `https://<your-username>.github.io/<repo-name>/`.
4. Put that link in `.env` (`VITE_SITE_URL`) so the WhatsApp preview works.

## Build manually

```bash
npm run build
```
The finished site is in `dist/` — upload that folder to any static host.
