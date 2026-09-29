// Ambil nama tamu dari URL: ?to=NamaTamu
const params = new URLSearchParams(window.location.search);
const guestName = params.get('to');

if (guestName) {
  document.getElementById('guestName').textContent = decodeURIComponent(guestName);
  // Auto-fill RSVP form
  window.addEventListener('DOMContentLoaded', () => {
    const rsvpNameInput = document.getElementById('rsvpName');
    if (rsvpNameInput) rsvpNameInput.value = decodeURIComponent(guestName);
  });
}

// Generate link untuk setiap tamu (bisa dipakai di admin)
window.generateGuestLink = function(name) {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?to=${encodeURIComponent(name)}`;
};
