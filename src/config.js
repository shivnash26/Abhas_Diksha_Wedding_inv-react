/*
 * config.js — the settings you are most likely to change.
 * Any file can read these with:  import { invitation } from './config.js';
 */
export const invitation = {
  envelopeIntro: true,   // show the envelope screen before the invitation
  petalCount: 38,        // falling petals/leaves (0 to turn off)
  cursorSparkle: true,   // sparkle trail behind the mouse on desktop
  weddingDate: '2026-12-03T17:00:00+05:30', // countdown target: Baraat, 3 Dec 2026, 5 PM IST

  // Background music: put an .mp3 in public/audio/ and set its path, e.g. 'audio/our-song.mp3'.
  // Leave empty to use the soft generated tone (the music button still works).
  musicSrc: '',
  musicVolume: 0.5,      // 0 (silent) to 1 (full)
  musicOnOpen: true,     // start playing as soon as the envelope is opened

  // RSVP: paste your Google Apps Script web app URL here (see README → "Save RSVPs to a spreadsheet").
  // While it is empty, RSVPs are only printed in the browser console (handy for testing).
  rsvpSheetUrl: 'https://script.google.com/macros/s/AKfycbxcgZ3AzYBJI1cuY4snT1oq0XymhK4yVAKOmPz6D7qVac8F8hLPL3UloV6mJbTFlj0w6A/exec',
};
