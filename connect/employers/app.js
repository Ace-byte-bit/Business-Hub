(function () {
  'use strict';

  setFooterYear();
  Identity.renderBadge('identityBadge');

  const form = document.getElementById('employerForm');
  if (!form) return;

  const fields = {
    company: { el: document.getElementById('company'),     hint: document.getElementById('companyHint') },
    email:   { el: document.getElementById('email'),       hint: document.getElementById('emailHint') },
    plan:    { el: document.getElementById('plan'),        hint: document.getElementById('planHint') },
    title:   { el: document.getElementById('jobTitle'),    hint: document.getElementById('jobTitleHint') },
    desc:    { el: document.getElementById('description'), hint: document.getElementById('descriptionHint') }
  };

  function setError(f, msg) {
    f.el.classList.add('invalid');
    f.hint.textContent = msg;
    f.hint.classList.add('error');
    shake(f.el);
  }
  function clearError(f) {
    f.el.classList.remove('invalid');
    f.hint.textContent = '';
    f.hint.classList.remove('error');
  }

  /* Clear a field's error as soon as the user edits it */
  Object.values(fields).forEach(f => {
    const evt = f.el.tagName === 'SELECT' ? 'change' : 'input';
    f.el.addEventListener(evt, () => clearError(f));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    Object.values(fields).forEach(clearError);

    let ok = true;
    const company = fields.company.el.value.trim();
    const email = fields.email.el.value.trim();
    const plan = fields.plan.el.value;
    const title = fields.title.el.value.trim();
    const desc = fields.desc.el.value.trim();

    if (!company) { setError(fields.company, 'Company name is required'); ok = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(fields.email, email ? 'Enter a valid email' : 'Email is required');
      ok = false;
    }
    if (!plan) { setError(fields.plan, 'Choose a plan'); ok = false; }
    if (!title) { setError(fields.title, 'Job title is required'); ok = false; }
    if (desc.length < 30) { setError(fields.desc, 'Describe the role (30+ characters)'); ok = false; }

    if (!ok) return;

    /* Mailto fallback — swap for a backend later */
    const subject = `Job Ad Inquiry — ${company} (${plan})`;
    const body =
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `Plan: ${plan}\n` +
      `Job: ${title}\n\n` +
      desc;

    showToast('📧 Opening your email app…');
    setTimeout(() => {
      window.location.href =
        'mailto:ads@clconnect.rw?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    }, 600);
  });
})();
