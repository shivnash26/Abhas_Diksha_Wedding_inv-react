import { invitation } from './config.js';

/*
 * Sends one RSVP to the Google Sheet (via the Apps Script web app URL in config.js).
 * Resolves when the reply has been sent; rejects if the network request fails.
 */
export async function sendRsvp(data) {
  const url = invitation.rsvpSheetUrl;
  if (!url) {
    console.warn('RSVP not saved: add your Google Apps Script URL to rsvpSheetUrl in config.js.', data);
    return;
  }
  const body = new URLSearchParams({
    name: data.name || '',
    attending: data.attending === 'no' ? 'Regretfully declines' : 'Joyfully accepts',
    guests: data.guests || '',
    days: (data.days || []).join(', '),
    note: data.note || '',
    side: data.side || '',
    plusOne: data.plusOne || '',
    attendees: data.attendees || '',
    travel: data.travel || '',
  });
  // 'no-cors' lets the browser post to Google without CORS errors
  // (the catch: the site can't read Google's reply, so it can't tell if the sheet saved it).
  await fetch(url, { method: 'POST', mode: 'no-cors', body });
}
