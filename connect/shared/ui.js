/* =========================================================
   SHARED UI HELPERS
   ========================================================= */

let __toastTimer;
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    t.setAttribute('role', 'status');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(__toastTimer);
  __toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function shake(el) {
  if (!el || !el.animate) return;
  el.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(8px)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(0)' }
  ], { duration: 350 });
}

/* Path back to the project root, set per page: <body data-root="../"> */
function rootPath() {
  return document.body.dataset.root || '';
}

function setFooterYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}
