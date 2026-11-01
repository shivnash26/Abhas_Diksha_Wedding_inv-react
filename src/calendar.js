/*
 * calendar.js — "Add to calendar" links for the wedding night (Varmala).
 * Times are in UTC: 9:00 PM – midnight IST on 3 Dec 2026.
 */
const title = 'Diksha & Abhas – Wedding (Varmala)';
const details = 'Varmala at 9:00 PM. With love, the Singh & Tiwari families.';
const location = 'Lotus Portico Club, Jankipuram Ext, Beside ORO City, Lucknow';

export const googleCalendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent(title) +
  '&dates=20261203T153000Z/20261203T183000Z' +
  '&details=' + encodeURIComponent(details) +
  '&location=' + encodeURIComponent(location);

// Apple Calendar / Outlook: a real file in public/ (phones handle a file best)
export const icsUrl = 'wedding.ics';
