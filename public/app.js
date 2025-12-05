// public/app.js
(async function () {
  const jobsList = document.getElementById('jobsList');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const clearBtn = document.getElementById('clearBtn');

  const applyModal = document.getElementById('applyModal');
  const closeModal = document.getElementById('closeModal');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const applyForm = document.getElementById('applyForm');

  async function fetchJobs(search) {
    let url = '/api/jobs';
    if (search) url += '?search=' + encodeURIComponent(search);
    const res = await fetch(url);
    const json = await res.json();
    if (!json.success) {
      jobsList.innerHTML = '<p>Failed to load jobs</p>';
      return;
    }
    const jobs = json.data;
    if (jobs.length === 0) jobsList.innerHTML = '<p>No jobs found</p>';
    else jobsList.innerHTML = '';
    jobs.forEach(job => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${escapeHtml(job.title)} <small>${escapeHtml(job.company)}</small></h3>
        <p><b>Location:</b> ${escapeHtml(job.location || '—')}</p>
        <p>${escapeHtml(job.description || '')}</p>
        <button class="applyBtn" data-id="${job.id}" data-title="${escapeHtml(job.title)}">Apply</button>
      `;
      jobsList.appendChild(card);
    });

    document.querySelectorAll('.applyBtn').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const title = e.target.dataset.title;
        document.getElementById('jobId').value = id;
        modalJobTitle.textContent = 'Apply for: ' + title;
        openModal();
      });
    });
  }

  function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]); }

  function openModal(){ applyModal.classList.remove('hidden'); }
  function closeModalFn(){ applyModal.classList.add('hidden'); applyForm.reset(); }

  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const jobId = document.getElementById('jobId').value;
    const name = document.getElementById('appName').value.trim();
    const email = document.getElementById('appEmail').value.trim();
    const resume = document.getElementById('appResume').value.trim();
    const cover = document.getElementById('appCover').value.trim();

    const resp = await fetch('/api/applications', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ jobId, name, email, resume, coverLetter: cover })
    });
    const j = await resp.json();
    if (j.success) {
      alert('Application submitted');
      closeModalFn();
    } else alert(j.message || 'Submit failed');
  });

  closeModal.addEventListener('click', closeModalFn);
  window.addEventListener('click', (e) => { if (e.target === applyModal) closeModalFn(); });

  searchBtn.addEventListener('click', () => fetchJobs(searchInput.value.trim()));
  clearBtn.addEventListener('click', () => { searchInput.value=''; fetchJobs(); });

  // initial load
  fetchJobs();
})();
