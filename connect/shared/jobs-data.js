/* =========================================================
   SAMPLE REMOTE JOBS — replace with real listings later
   ========================================================= */

const JOBS = [
  { id: 1, title: "Customer Support (Kinyarwanda/English)", company: "Umurava Remote", category: "Support",
    location: "Remote — anywhere in Rwanda", type: "Full-time", salary: "RWF 250,000 – 350,000 / month",
    posted: "2026-11-02", featured: true, verifiedEmployer: true,
    description: "Handle customer tickets in Kinyarwanda and English for a regional fintech. Training provided. Must be verified on CL.Connect." },
  { id: 2, title: "Junior Web Developer", company: "Kigali Tech Collective", category: "Technology",
    location: "Remote — must attend monthly Kigali meetup", type: "Full-time", salary: "RWF 400,000 – 600,000 / month",
    posted: "2026-11-01", featured: true, verifiedEmployer: true,
    description: "Build and maintain web apps using JavaScript and Python. 1+ year experience. Portfolio required." },
  { id: 3, title: "Data Entry & Transcription", company: "Rwanda Digital Services", category: "Operations",
    location: "Fully remote", type: "Part-time", salary: "RWF 120,000 – 180,000 / month",
    posted: "2026-10-28", featured: true, verifiedEmployer: true,
    description: "Transcribe audio and enter records for health NGOs. Flexible hours. Kinyarwanda fluency essential." },
  { id: 4, title: "Social Media Manager", company: "Nyamirambo Coffee Co.", category: "Marketing",
    location: "Remote with occasional field visits", type: "Contract", salary: "RWF 200,000 / month",
    posted: "2026-10-25", featured: false, verifiedEmployer: true,
    description: "Grow our Instagram and TikTok presence. Experience with Canva and short-form video required." },
  { id: 5, title: "Online English Tutor", company: "Akazi Language Lab", category: "Education",
    location: "Fully remote", type: "Part-time", salary: "RWF 150,000 – 220,000 / month",
    posted: "2026-10-22", featured: false, verifiedEmployer: true,
    description: "Teach conversational English to diaspora children. C1 English required. Flexible schedule." },
  { id: 6, title: "Virtual Assistant", company: "Kigali Business Support", category: "Admin",
    location: "Fully remote", type: "Full-time", salary: "RWF 220,000 – 300,000 / month",
    posted: "2026-10-20", featured: false, verifiedEmployer: true,
    description: "Manage calendars, email, and invoicing for a small consultancy. Strong organisation skills required." }
];

/* ---------- Shared card renderer ---------- */
function jobCard(job) {
  const badge = job.verifiedEmployer
    ? '<span class="trust-badge" title="Verified employer">✓ Verified employer</span>'
    : '';

  return `
    <article class="job-card">
      <div class="job-head">
        <span class="job-category">${escapeHtml(job.category)}</span>
        ${badge}
      </div>
      <h3 class="job-title">${escapeHtml(job.title)}</h3>
      <p class="job-company">${escapeHtml(job.company)}</p>
      <p class="job-desc">${escapeHtml(job.description)}</p>
      <ul class="job-meta">
        <li>📍 ${escapeHtml(job.location)}</li>
        <li>🕒 ${escapeHtml(job.type)}</li>
        <li>💰 ${escapeHtml(job.salary)}</li>
      </ul>
      <button type="button" class="btn btn-primary job-apply" data-job-id="${job.id}">
        Apply (verified workers)
      </button>
    </article>
  `;
}

/* ---------- Shared Apply-button behaviour (home + jobs pages) ---------- */
function bindApplyButtons(container) {
  if (!container) return;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.job-apply');
    if (!btn || btn.disabled) return;

    if (!Identity.isVerified()) {
      showToast('❌ Verify your identity first');
      setTimeout(() => { window.location.href = Identity.verifyUrl(); }, 900);
      return;
    }
    showToast('✅ Application sent — employer will contact you');
    btn.textContent = 'Applied ✓';
    btn.disabled = true;
  });
}
