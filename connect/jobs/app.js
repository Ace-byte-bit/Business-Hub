(function () {
  'use strict';

  setFooterYear();
  Identity.renderBadge('identityBadge');

  const verifyPrompt = document.getElementById('verifyPrompt');
  if (verifyPrompt && !Identity.isVerified()) verifyPrompt.hidden = false;

  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const list = document.getElementById('jobsList');
  const count = document.getElementById('resultsCount');

  function render(filtered) {
    if (filtered.length === 0) {
      list.innerHTML = '<p class="no-results">No jobs match your search.</p>';
      count.textContent = '';
      return;
    }
    list.innerHTML = filtered.map(jobCard).join('');
    count.textContent = `Showing ${filtered.length} of ${JOBS.length} jobs`;
  }

  function applyFilters() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const cat = categoryFilter.value;

    render(JOBS.filter(job => {
      const matchesCat = cat === 'all' || job.category === cat;
      const haystack = (job.title + ' ' + job.company + ' ' + job.description).toLowerCase();
      return matchesCat && (!q || haystack.includes(q));
    }));
  }

  searchInput.addEventListener('input', applyFilters);
  categoryFilter.addEventListener('change', applyFilters);
  bindApplyButtons(list);

  applyFilters();
})();
