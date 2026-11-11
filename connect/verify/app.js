(function () {
  'use strict';

  setFooterYear();
  Identity.renderBadge('identityBadge');

  const panel = document.getElementById('verifyPanel');
  const form = document.getElementById('idForm');
  const verifiedState = document.getElementById('verifiedState');
  const nameEl = document.getElementById('fullName');
  const idEl = document.getElementById('idNumber');
  const nameHint = document.getElementById('nameHint');
  const idHint = document.getElementById('idHint');
  const resetBtn = document.getElementById('resetBtn');

  function clearErrors() {
    [nameEl, idEl].forEach(el => el.classList.remove('invalid'));
    [nameHint, idHint].forEach(h => { h.textContent = ''; h.classList.remove('error'); });
  }

  function fail(el, hint, msg) {
    el.classList.add('invalid');
    hint.textContent = msg;
    hint.classList.add('error');
    shake(el);
    el.focus();
  }

  function showVerified(record) {
    panel.hidden = true;
    verifiedState.hidden = false;
    document.getElementById('verifiedName').textContent = record.name;
    document.getElementById('verifiedMeta').textContent =
      `District: ${record.district} · Verified ${new Date(record.verifiedAt).toLocaleDateString()}`;
  }

  function showForm() {
    panel.hidden = false;
    verifiedState.hidden = true;
    form.reset();
    clearErrors();
  }

  /* Already verified? Show the success state. */
  if (Identity.isVerified()) showVerified(Identity.get());

  nameEl.addEventListener('input', () => {
    nameEl.classList.remove('invalid');
    nameHint.textContent = '';
    nameHint.classList.remove('error');
  });
  idEl.addEventListener('input', () => {
    idEl.value = idEl.value.replace(/\D/g, '').slice(0, 16);
    idEl.classList.remove('invalid');
    idHint.textContent = '';
    idHint.classList.remove('error');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = nameEl.value.trim();
    const id = idEl.value.trim();

    if (!name) return fail(nameEl, nameHint, 'Enter your full name');
    if (!/^\d{16}$/.test(id)) return fail(idEl, idHint, 'National ID must be exactly 16 digits');

    const result = Identity.verify(id, name);
    if (!result.ok) {
      fail(idEl, idHint, result.error);
      showToast('❌ Verification failed');
      return;
    }

    showToast('✅ Identity verified!');
    Identity.renderBadge('identityBadge');
    setTimeout(() => showVerified(result), 500);
  });

  resetBtn.addEventListener('click', () => {
    Identity.clear();
    Identity.renderBadge('identityBadge');
    showForm();
    showToast('You can now verify a different ID');
  });
})();
