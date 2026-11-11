/* =========================================================
   DIGITAL IDENTITY TRUST LAYER (DEMO)
   National ID number + name match against a tiny demo registry.
   In production, replace DEMO_REGISTRY with a call to NIDA.
   Only a masked ID is stored in the browser, never the full number.
   ========================================================= */

const Identity = (function () {
  'use strict';

  const KEY = 'clconnect_identity';

  const DEMO_REGISTRY = {
    '1199070012345678': { name: 'Aline Uwase', district: 'Nyabihu' },
    '1199580098765432': { name: 'Jean Mugisha', district: 'Bugesera' },
    '1200170055555555': { name: 'Claudine Mukamana', district: 'Ruhango' }
  };

  function get() {
    try { return JSON.parse(localStorage.getItem(KEY)); }
    catch (e) { return null; }
  }

  function save(record) {
    try { localStorage.setItem(KEY, JSON.stringify(record)); } catch (e) {}
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  const normalise = s => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

  /** Returns { ok:true, name, district, idMasked, verifiedAt } or { ok:false, error } */
  function verify(idNumber, fullName) {
    const id = String(idNumber || '').replace(/\s+/g, '');
    const name = String(fullName || '').trim();

    if (!/^\d{16}$/.test(id)) {
      return { ok: false, error: 'National ID must be 16 digits.' };
    }
    if (name.length < 3) {
      return { ok: false, error: 'Enter your full name as on your ID.' };
    }

    const record = DEMO_REGISTRY[id];
    if (!record) {
      return { ok: false, error: 'No matching ID found. Check the number.' };
    }
    if (normalise(record.name) !== normalise(name)) {
      return { ok: false, error: 'Name does not match our records for this ID.' };
    }

    const verified = {
      idMasked: '************' + id.slice(-4),
      name: record.name,
      district: record.district,
      verifiedAt: new Date().toISOString()
    };
    save(verified);
    return { ok: true, ...verified };
  }

  function isVerified() { return !!get(); }

  function verifyUrl() { return rootPath() + 'verify/index.html'; }

  function renderBadge(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const user = get();
    if (user) {
      el.className = 'identity-badge verified';
      el.innerHTML = '✓ ' + escapeHtml(user.name.split(' ')[0]) + ' · verified';
    } else {
      el.className = 'identity-badge unverified';
      el.innerHTML = '<a href="' + verifyUrl() + '">Get verified</a>';
    }
  }

  /** Demo counter — in production this comes from the server */
  function verifiedCount() { return Object.keys(DEMO_REGISTRY).length + 147; }

  return { get, save, clear, verify, isVerified, verifyUrl, renderBadge, verifiedCount };
})();
