// ===== OPENING ANIMATION =====
const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
const openBtn = document.getElementById('openInvitation');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

openBtn.addEventListener('click', () => {
  cover.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  cover.style.opacity = '0';
  cover.style.transform = 'scale(1.1)';
  setTimeout(() => {
    cover.style.display = 'none';
    mainContent.classList.remove('hidden');
    window.scrollTo(0, 0);
    // Play music
    bgMusic.play().then(() => {
      musicToggle.textContent = '🔊';
      musicToggle.classList.add('playing');
    }).catch(() => {});
  }, 800);
});

// ===== MUSIC CONTROL =====
let musicPlaying = false;
musicToggle.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔇';
    musicToggle.classList.remove('playing');
  } else {
    bgMusic.play();
    musicToggle.textContent = '🔊';
    musicToggle.classList.add('playing');
  }
  musicPlaying = !musicPlaying;
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme + '-theme';
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.className = next + '-theme';
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});

// ===== PARALLAX =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.getElementById('parallaxBg');
  if (parallax) parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// ===== SCROLL ANIMATION (Intersection Observer) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item, .event-card, .gift-card, .couple-card').forEach(el => {
  observer.observe(el);
});

// ===== LIGHTBOX GALLERY =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
  });
});
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) lightbox.classList.remove('active');
});

// ===== COPY REKENING =====
document.querySelectorAll('.btn-copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      const original = btn.textContent;
      btn.textContent = '✅ Tersalin!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      alert('Gagal copy: ' + btn.dataset.copy);
    }
  });
});

// ===== SHARE WHATSAPP =====
document.getElementById('shareWA').addEventListener('click', () => {
  const url = window.location.href;
  const text = `Assalamualaikum, kami mengundang Anda ke pernikahan Andi & Sari. Buka undangan: ${url}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
});

// ===== PWA SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(console.error);
}
