/*
 * MusicButton.jsx — the round button (bottom right) that plays / pauses the music.
 * onToggle is a function passed in from App.jsx; React calls it on click.
 * The little bars dance via effects.js (it finds them through data-music-eq).
 */
export default function MusicButton({ onToggle }) {
  return (
    <button className="music-button-1" onClick={onToggle} aria-label="Play or pause music">
      <div className="music-button-2" data-music-eq>
        <div className="music-button-3"></div>
        <div className="music-button-4"></div>
        <div className="music-button-5"></div>
        <div className="music-button-6"></div>
      </div>
    </button>
  );
}
