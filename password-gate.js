(function () {
  const PASSWORD = 'vitrynelaunch226';
  const KEY = 'vt_auth';

  if (sessionStorage.getItem(KEY) === '1') return;

  /* ── Styles ── */
  const style = document.createElement('style');
  style.textContent = `
    #vt-gate {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #1A1A1A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans', -apple-system, sans-serif;
    }
    #vt-gate-box {
      text-align: center;
      padding: 48px 40px;
      max-width: 380px;
      width: 90%;
    }
    #vt-gate-logo {
      width: 44px;
      height: 44px;
      margin: 0 auto 28px;
    }
    #vt-gate h1 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 30px;
      color: #FDFCFA;
      font-weight: 400;
      margin-bottom: 8px;
    }
    #vt-gate p {
      color: #888;
      font-size: 14px;
      margin-bottom: 36px;
      line-height: 1.5;
    }
    #vt-gate-input {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      color: #FDFCFA;
      font-size: 16px;
      font-family: 'JetBrains Mono', monospace;
      text-align: center;
      letter-spacing: 3px;
      outline: none;
      margin-bottom: 12px;
      transition: border-color 0.2s, background 0.2s;
      box-sizing: border-box;
    }
    #vt-gate-input:focus {
      border-color: rgba(184,151,106,0.6);
      background: rgba(255,255,255,0.07);
    }
    #vt-gate-input.error {
      border-color: #e05c5c;
      animation: vt-shake 0.3s ease;
    }
    #vt-gate-btn {
      width: 100%;
      padding: 14px;
      background: #B8976A;
      color: #1A1A1A;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      font-family: 'DM Sans', -apple-system, sans-serif;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      letter-spacing: 0.3px;
    }
    #vt-gate-btn:hover {
      background: #C9AB82;
    }
    #vt-gate-btn:active {
      transform: scale(0.98);
    }
    #vt-gate-error {
      color: #e07070;
      font-size: 13px;
      margin-top: 12px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    #vt-gate-error.show {
      opacity: 1;
    }
    @keyframes vt-shake {
      0%,100% { transform: translateX(0); }
      25%      { transform: translateX(-7px); }
      75%      { transform: translateX(7px); }
    }
  `;
  document.head.appendChild(style);

  /* ── Block scroll ── */
  document.documentElement.style.overflow = 'hidden';

  /* ── Overlay HTML ── */
  const overlay = document.createElement('div');
  overlay.id = 'vt-gate';
  overlay.innerHTML = `
    <div id="vt-gate-box">
      <svg id="vt-gate-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="7" fill="#1A1A1A" stroke="rgba(184,151,106,0.35)" stroke-width="1"/>
        <path d="M8.5 8 L11 8 Q16 22.5 16 22.5 Q16 22.5 21 8 L23.5 8 L17.2 25.5 Q16 28.5 16 28.5 Q16 28.5 14.8 25.5 Z" fill="#FDFCFA"/>
        <circle cx="16" cy="27" r="1.4" fill="#B8976A"/>
      </svg>
      <h1>Vitryne</h1>
      <p>Accès privé — entrez le mot de passe<br>pour consulter la landing</p>
      <input id="vt-gate-input" type="password" placeholder="••••••••••••••" autocomplete="off" spellcheck="false"/>
      <button id="vt-gate-btn">Accéder →</button>
      <div id="vt-gate-error">Mot de passe incorrect</div>
    </div>
  `;

  /* ── Mount ── */
  function mount() {
    document.body.insertBefore(overlay, document.body.firstChild);

    const input = document.getElementById('vt-gate-input');
    const btn   = document.getElementById('vt-gate-btn');
    const error = document.getElementById('vt-gate-error');

    function attempt() {
      if (input.value === PASSWORD) {
        sessionStorage.setItem(KEY, '1');
        document.documentElement.style.overflow = '';
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '0';
        setTimeout(function () { overlay.remove(); }, 420);
      } else {
        input.classList.add('error');
        error.classList.add('show');
        setTimeout(function () { input.classList.remove('error'); }, 350);
        input.value = '';
        input.focus();
      }
    }

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) {
      error.classList.remove('show');
      if (e.key === 'Enter') attempt();
    });

    input.focus();
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();
