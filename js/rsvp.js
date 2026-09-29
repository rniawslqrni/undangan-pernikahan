// Simulasi realtime dengan LocalStorage
// Untuk produksi gunakan Firebase Realtime Database / Firestore

const RSVP_KEY = 'wedding_rsvp_data';

function getRsvpData() {
  return JSON.parse(localStorage.getItem(RSVP_KEY) || '[]');
}

function saveRsvpData(data) {
  localStorage.setItem(RSVP_KEY, JSON.stringify(data));
  renderWishes();
}

function renderWishes() {
  const data = getRsvpData();
  const container = document.getElementById('wishesList');
  if (!container) return;
  
  if (data.length === 0) {
    container.innerHTML = '<p style="text-align:center;opacity:0.6">Belum ada ucapan. Jadilah yang pertama! 💌</p>';
    return;
  }
  
  container.innerHTML = data.slice().reverse().map(item => `
    <div class="wish-card">
      <div class="wish-head">
        <span class="wish-name">${escapeHtml(item.name)}</span>
        <span class="wish-time">${item.time}</span>
      </div>
      <p>${escapeHtml(item.message || '-')}</p>
      ${item.attend ? `<span class="wish-attend ${item.attend}">${item.attend === 'hadir' ? '✅ Hadir' : '❌ Tidak Hadir'} (${item.guests} org)</span>` : ''}
    </div>
  `).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Handle RSVP Form
document.getElementById('rsvpForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('rsvpName').value.trim();
  const attend = document.getElementById('rsvpAttend').value;
  const guests = document.getElementById('rsvpGuests').value || 1;
  const message = document.getElementById('rsvpMessage').value.trim();
  
  if (!name || !attend) return alert('Mohon isi nama dan konfirmasi kehadiran');
  
  const data = getRsvpData();
  data.push({
    name,
    attend,
    guests,
    message,
    time: new Date().toLocaleString('id-ID', { 
      day: '2-digit', month: 'short', year: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    }),
    timestamp: Date.now()
  });
  saveRsvpData(data);
  
  e.target.reset();
  alert('Terima kasih atas konfirmasi Anda! 💕');
});

// Init render
renderWishes();
