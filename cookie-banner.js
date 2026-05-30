(function () {
  var KEY = 'vt_cookie_consent';

  // Si déjà accepté → activer GA immédiatement
  if (localStorage.getItem(KEY) === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }

  // Si déjà refusé → rien à faire
  if (localStorage.getItem(KEY) === 'denied') return;

  // Sinon → afficher le banner
  var banner = document.createElement('div');
  banner.id = 'vt-cookie-banner';
  banner.innerHTML = [
    '<div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;">',
      '<div style="flex:1;min-width:220px">',
        '<p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#1A1A1A">🍪 Cookies & vie privée</p>',
        '<p style="margin:0;font-size:13px;color:#666;line-height:1.5">Nous utilisons Google Analytics pour analyser le trafic de manière anonyme. Aucune donnée personnelle n\'est vendue.',
        ' <a href="confidentialite.html" style="color:#B8976A;text-decoration:underline">En savoir plus</a>.</p>',
      '</div>',
      '<div style="display:flex;gap:8px;align-items:center;flex-shrink:0">',
        '<button id="vt-cookie-decline" style="padding:8px 18px;font-size:13px;font-weight:600;color:#1A1A1A;background:#fff;border:1.5px solid #1A1A1A;border-radius:7px;cursor:pointer;font-family:inherit">Refuser</button>',
        '<button id="vt-cookie-accept" style="padding:8px 18px;font-size:13px;font-weight:600;color:#fff;background:#1A1A1A;border:1.5px solid #1A1A1A;border-radius:7px;cursor:pointer;font-family:inherit">Accepter</button>',
      '</div>',
    '</div>'
  ].join('');

  banner.style.cssText = [
    'position:fixed',
    'bottom:20px',
    'left:50%',
    'transform:translateX(-50%)',
    'width:min(680px,calc(100vw - 32px))',
    'background:#fff',
    'border:1.5px solid #E8E4DF',
    'border-radius:14px',
    'padding:18px 20px',
    'box-shadow:0 8px 32px rgba(0,0,0,0.10)',
    'z-index:99999',
    'font-family:"DM Sans",sans-serif',
    'animation:vt-slide-up 0.35s cubic-bezier(.16,1,.3,1) both',
  ].join(';');

  var style = document.createElement('style');
  style.textContent = '@keyframes vt-slide-up{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
  document.head.appendChild(style);

  function accept() {
    localStorage.setItem(KEY, 'granted');
    gtag('consent', 'update', { analytics_storage: 'granted' });
    banner.remove();
  }

  function decline() {
    localStorage.setItem(KEY, 'denied');
    banner.remove();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(banner);
    document.getElementById('vt-cookie-accept').addEventListener('click', accept);
    document.getElementById('vt-cookie-decline').addEventListener('click', decline);
  });
})();
