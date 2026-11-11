/* HOMEPAGE — featured jobs, identity badge, stats */
(function () {
  'use strict';

  setFooterYear();
  Identity.renderBadge('identityBadge');

  const grid = document.getElementById('featuredJobs');
  if (grid) {
    grid.innerHTML = JOBS.filter(j => j.featured).slice(0, 3).map(jobCard).join('');
    bindApplyButtons(grid);
  }

  const sWorkers = document.getElementById('statWorkers');
  const sJobs = document.getElementById('statJobs');
  if (sWorkers) sWorkers.textContent = Identity.verifiedCount();
  if (sJobs) sJobs.textContent = JOBS.length;
})();
