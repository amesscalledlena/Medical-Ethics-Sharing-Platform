/* =================================================================
   Medical Ethics Sharing Platform — Front-end behavior
   - Mobile menu (with focus management + ESC to close)
   - Reveal-on-scroll via IntersectionObserver
   - Active-nav highlighting
   - Mock posts data + page renderers (home, list, detail, editor)
   - Form validation (register, login, create-post)
   ================================================================= */

(function () {
  'use strict';

  /* ---------------- Mock data ---------------- */
  const POSTS = [
    {
      id: 1,
      title: "The Doctor's Dilemma: Triage, Equity, and the Modern Wards",
      fullText:
`George Bernard Shaw's 1906 play raises questions that remain hauntingly relevant in modern medicine. When a clinician must choose between two equally deserving patients with finite resources, what calculus prevails?

Recent ICU admission protocols during pandemic surges echoed the moral weight of these fictional scenes. We watched committees of strangers decide whose ventilator went where, and whether age, comorbidity, and likelihood of survival are legitimate filters or thinly disguised forms of discrimination.

This piece argues that Shaw's central tension — the physician as both healer and gatekeeper — has not aged. If anything, it has sharpened. We need to teach triage not as a logistical exercise but as a practice of moral discernment, with all the discomfort that entails.

In medical school curricula, "The Doctor's Dilemma" deserves a place alongside the Hippocratic oath: not as scripture, but as a mirror.`,
      link: "https://example.org/doctors-dilemma-essay",
      category: "Theatre Plays",
      author: "Dr. Aleksandra Petrova",
      date: "2026-04-22"
    },
    {
      id: 2,
      title: "Wit and the Final Conversation",
      fullText:
`Margaret Edson's 'Wit' centers on Vivian Bearing, a stage IV ovarian cancer patient and literature scholar. The play unflinchingly examines informed consent in research, the dignity of dying, and what we owe terminally ill patients beyond protocol-driven care.

What makes 'Wit' indispensable for clinicians is not its medical accuracy — though that is considerable — but its insistence that a patient is never reducible to a body in a bed. Vivian's research-protocol enrollment is technically consensual. It is also, in Edson's hands, deeply not.

Over 200 medical schools worldwide now use 'Wit' as a tool for empathy training. Students read it. They watch the HBO film. They write reflective essays on the difference between a "good death" by clinical metrics and a death that the dying person would themselves endorse.

The play does not preach. It listens. We should learn to do the same.`,
      link: "https://example.org/wit-medical-humanities",
      category: "Theatre Plays",
      author: "Prof. Marcus Holloway",
      date: "2026-03-18"
    },
    {
      id: 3,
      title: "When Breath Becomes Air: A Neurosurgeon Faces Mortality",
      fullText:
`Paul Kalanithi's posthumously published memoir is required reading for the moral formation of clinicians. He writes from the rare vantage of physician-turned-patient, and his reflections on what makes a life meaningful in the face of incurable illness should reshape how we conduct end-of-life conversations.

Kalanithi resists the temptation to sentimentalize. He writes about the choice to continue training, to have a child, to keep operating — not as a triumph over death but as the ordinary practice of living a finite life well. His prose is restrained and precise. The medicine in it is recognizable; the philosophy is not optional.

Discussions of physician burnout often miss what Kalanithi keeps in view: the question is not just how to cope, but what work is for. His answer is neither religious nor secular in any clean sense. It is simply human, and worth sitting with.`,
      link: "https://example.org/breath-becomes-air-review",
      category: "Literary Texts",
      author: "Dr. Imani Okafor",
      date: "2026-02-05"
    },
    {
      id: 4,
      title: "Case Study: Refusal of Treatment by a Mature Minor",
      fullText:
`A 16-year-old Jehovah's Witness presents with acute lymphoblastic leukemia. Standard induction therapy includes blood transfusion. The patient, articulate and well-informed, refuses transfusion citing sincere religious belief. Parents are conflicted: the mother supports the patient's stance, the father is unsure.

The hospital ethics committee was convened. This case study walks through the deliberative process: the legal framework around the mature-minor doctrine, the assessment of decisional capacity, the role of pastoral care, and the eventual resolution.

We argue that the right outcome here was not predetermined. A committee that begins with a settled answer has already failed its function. Instead, the committee proceeded as if the patient's refusal might, on close examination, be honored — and tested that hypothesis against every available counterweight.

The patient ultimately consented to a modified protocol using bloodless techniques. The case is not a template. It is a record of one careful conversation, offered for others learning to hold such conversations with equal care.`,
      link: "https://example.org/mature-minor-case-2026",
      category: "Clinical Ethics Cases",
      author: "Bioethics Committee, St. Augustine General",
      date: "2026-01-30"
    }
  ];

  // Pending posts shown in the editor queue
  const PENDING = [
    {
      id: 101,
      title: "Algorithmic Triage in Emergency Departments: Whose Bias?",
      fullText:
`A growing number of emergency departments are piloting machine-learning triage tools. Early data suggests faster throughput, but the question of whose data trained the model is rarely addressed in the operational literature. This submission reviews three deployed systems and identifies a recurring pattern: training cohorts skewed toward better-insured patient populations, with predictably uneven performance on under-represented groups.`,
      link: "https://example.org/algorithmic-triage-bias",
      category: "Ethics News",
      author: "Dr. Yuki Tanaka",
      submitted: "2026-05-02"
    },
    {
      id: 102,
      title: "The Father by Florian Zeller: Capacity, Dignity, and the Ageing Mind",
      fullText:
`Zeller's play, and the 2020 film adaptation, deserve a seat at the bioethics table. The narrative refuses to clarify what is real for André, and that refusal is the point. For clinicians who routinely conduct capacity assessments in late-stage dementia, the play offers an uncomfortable mirror: the assessment is a snapshot of a moving target, and our confidence in the snapshot is often higher than the snapshot can bear.`,
      link: "https://example.org/the-father-bioethics",
      category: "Theatre Plays",
      author: "Sara El-Amin, MA Bioethics",
      submitted: "2026-05-04"
    },
    {
      id: 103,
      title: "Post-trial Access in Multinational Vaccine Studies",
      fullText:
`When a trial closes successfully, what do sponsors owe to the host community? The Declaration of Helsinki's post-trial access provisions are widely endorsed in principle and unevenly honored in practice. This piece examines three recent multinational vaccine studies, the access commitments made at protocol stage, and what actually happened twelve to thirty-six months after primary endpoint.`,
      link: "https://example.org/post-trial-access-2026",
      category: "Ethics News",
      author: "Prof. Adaeze Onyema",
      submitted: "2026-05-06"
    }
  ];

  /* ---------------- Helpers ---------------- */
  function formatDate(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function excerpt(text, n) {
    const flat = text.replace(/\s+/g, ' ').trim();
    if (flat.length <= n) return flat;
    return flat.slice(0, n).replace(/\s+\S*$/, '') + '…';
  }
  function paragraphs(text) {
    return text.split(/\n\s*\n/).map(p => `<p>${escapeHTML(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
  }
  function getQuery(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  /* ---------------- Footer year ---------------- */
  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------- Mobile menu ---------------- */
  function setupMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      menu.classList.add('is-open');
      menu.removeAttribute('hidden');
      document.body.classList.add('no-scroll');
      const firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      // Hide after transition for AT
      window.setTimeout(() => {
        if (toggle.getAttribute('aria-expanded') === 'false') menu.setAttribute('hidden', '');
      }, 320);
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    // Close when a link inside is clicked
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });

    // Close if window resized to desktop
    let mql = window.matchMedia('(min-width: 960px)');
    const handleMq = (m) => { if (m.matches) closeMenu(); };
    if (mql.addEventListener) mql.addEventListener('change', handleMq);
    else if (mql.addListener) mql.addListener(handleMq);
  }

  /* ---------------- Reveal on scroll ---------------- */
  function setupReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(t => io.observe(t));
  }

  /* ---------------- Active nav ---------------- */
  function setupActiveNav() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll('[data-nav]').forEach(link => {
      if (link.dataset.nav === page) link.setAttribute('aria-current', 'page');
    });
  }

  /* ---------------- Renderers ---------------- */
  function postCardHTML(post) {
    const url = `post_detail.html?id=${post.id}`;
    return `
      <a class="post-card reveal" href="${url}" aria-label="Read: ${escapeHTML(post.title)}">
        <span class="post-tag">${escapeHTML(post.category)}</span>
        <h3>${escapeHTML(post.title)}</h3>
        <div class="meta">
          <span>${escapeHTML(post.author)}</span>
          <span class="dot" aria-hidden="true">•</span>
          <span>${formatDate(post.date)}</span>
        </div>
        <p class="excerpt">${escapeHTML(excerpt(post.fullText, 180))}</p>
        <span class="read-more">Read post</span>
      </a>`;
  }

  function renderHomePosts() {
    const grid = document.getElementById('homePosts');
    if (!grid) return;
    const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
    grid.innerHTML = sorted.map(postCardHTML).join('');
  }

  function renderApprovedPosts() {
    const grid = document.getElementById('approvedPosts');
    if (!grid) return;

    const search = document.getElementById('searchInput');
    const chipBar = document.getElementById('filterChips');
    let activeCat = getQuery('cat') || 'All';

    function paint() {
      const q = (search && search.value || '').trim().toLowerCase();
      let list = POSTS.slice();
      if (activeCat && activeCat !== 'All') {
        list = list.filter(p => p.category === activeCat);
      }
      if (q) {
        list = list.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.fullText.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
        );
      }
      list.sort((a, b) => b.date.localeCompare(a.date));
      if (!list.length) {
        grid.innerHTML = '<div class="empty-state">No posts match these filters yet. Try clearing the search or selecting a different category.</div>';
      } else {
        grid.innerHTML = list.map(postCardHTML).join('');
      }
      // re-run reveal observer on new nodes
      setupReveal();
    }

    if (chipBar) {
      chipBar.querySelectorAll('.chip').forEach(chip => {
        if (chip.dataset.cat === activeCat) chip.classList.add('is-active');
        chip.addEventListener('click', () => {
          chipBar.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
          chip.classList.add('is-active');
          activeCat = chip.dataset.cat;
          paint();
        });
      });
    }
    if (search) {
      search.addEventListener('input', paint);
    }
    paint();
  }

  function renderPostDetail() {
    const root = document.getElementById('postDetail');
    if (!root) return;
    const id = parseInt(getQuery('id'), 10);
    const post = POSTS.find(p => p.id === id) || POSTS[0];
    if (!post) {
      root.innerHTML = '<div class="empty-state">Post not found.</div>';
      return;
    }
    document.title = `${post.title} — Medica·Ethica`;
    root.innerHTML = `
      <a href="approved_posts.html" class="back-link">← Back to all posts</a>
      <span class="post-tag">${escapeHTML(post.category)}</span>
      <h1>${escapeHTML(post.title)}</h1>
      <div class="meta">
        <span>By <strong>${escapeHTML(post.author)}</strong></span>
        <span aria-hidden="true">•</span>
        <span>${formatDate(post.date)}</span>
      </div>
      <div class="body">${paragraphs(post.fullText)}</div>
      <div class="shared-link-block">
        <span class="label">Shared resource</span>
        <a href="${escapeHTML(post.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(post.link)}</a>
      </div>`;
  }

  function reviewItemHTML(post) {
    return `
      <article class="review-item" data-id="${post.id}" aria-labelledby="review-${post.id}-title">
        <span class="status-badge" aria-live="polite"></span>
        <span class="post-tag">${escapeHTML(post.category)}</span>
        <h3 id="review-${post.id}-title">${escapeHTML(post.title)}</h3>
        <div class="meta">
          <span>Submitted by <strong>${escapeHTML(post.author)}</strong></span>
          <span aria-hidden="true">•</span>
          <span>${formatDate(post.submitted)}</span>
        </div>
        <p class="body">${escapeHTML(post.fullText)}</p>
        <a class="link-out" href="${escapeHTML(post.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(post.link)}</a>
        <div class="review-actions">
          <button type="button" class="btn btn-success" data-action="approve">Approve</button>
          <button type="button" class="btn btn-danger" data-action="reject">Reject</button>
          <button type="button" class="btn btn-ghost" data-action="preview">Preview</button>
        </div>
      </article>`;
  }

  function renderEditorPanel() {
    const list = document.getElementById('reviewList');
    const counter = document.getElementById('reviewCount');
    if (!list) return;
    list.innerHTML = PENDING.map(reviewItemHTML).join('');

    function refreshCount() {
      if (!counter) return;
      const remaining = list.querySelectorAll('.review-item:not(.is-handled)').length;
      counter.textContent = String(remaining);
    }
    refreshCount();

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const item = btn.closest('.review-item');
      if (!item) return;
      const action = btn.dataset.action;
      const badge = item.querySelector('.status-badge');

      if (action === 'approve') {
        item.classList.remove('is-rejected');
        item.classList.add('is-approved', 'is-handled');
        if (badge) badge.textContent = 'Approved';
      } else if (action === 'reject') {
        item.classList.remove('is-approved');
        item.classList.add('is-rejected', 'is-handled');
        if (badge) badge.textContent = 'Rejected';
      } else if (action === 'preview') {
        const id = item.dataset.id;
        const post = PENDING.find(p => String(p.id) === String(id));
        if (post) {
          window.alert(`${post.title}\n\n— ${post.author}\n\n${post.fullText}`);
        }
      }
      refreshCount();
    });
  }

  /* ---------------- Form validation ---------------- */
  function fail(row, msg) {
    row.classList.add('error');
    const err = row.querySelector('.err-msg');
    if (err) err.textContent = msg;
  }
  function pass(row) {
    row.classList.remove('error');
  }

  function validateRegister() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;

      const fields = form.querySelectorAll('.form-row');
      fields.forEach(pass);

      const username = form.elements.username;
      const email = form.elements.email;
      const password = form.elements.password;
      const confirm = form.elements.confirm;

      if (!username.value || username.value.trim().length < 3) {
        fail(username.closest('.form-row'), 'Username must be at least 3 characters.');
        ok = false;
      }
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        fail(email.closest('.form-row'), 'Please enter a valid email address.');
        ok = false;
      }
      if (!password.value || password.value.length < 8) {
        fail(password.closest('.form-row'), 'Password must be at least 8 characters.');
        ok = false;
      }
      if (confirm.value !== password.value) {
        fail(confirm.closest('.form-row'), 'Passwords do not match.');
        ok = false;
      }

      if (!ok) {
        const firstError = form.querySelector('.form-row.error input, .form-row.error textarea');
        if (firstError) firstError.focus();
        return;
      }

      const success = form.querySelector('.form-success');
      if (success) {
        success.textContent = 'Account created. Redirecting to sign-in…';
        success.classList.add('is-visible');
      }
      form.reset();
      window.setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    });
  }

  function validateLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('.form-row').forEach(pass);

      const id = form.elements.identifier;
      const password = form.elements.password;
      if (!id.value || id.value.trim().length < 3) {
        fail(id.closest('.form-row'), 'Enter your username or email.');
        ok = false;
      }
      if (!password.value) {
        fail(password.closest('.form-row'), 'Enter your password.');
        ok = false;
      }
      if (!ok) {
        const firstError = form.querySelector('.form-row.error input');
        if (firstError) firstError.focus();
        return;
      }
      const success = form.querySelector('.form-success');
      if (success) {
        success.textContent = 'Signed in. Redirecting…';
        success.classList.add('is-visible');
      }
      window.setTimeout(() => { window.location.href = 'index.html'; }, 900);
    });
  }

  function validateCreatePost() {
    const form = document.getElementById('createPostForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('.form-row').forEach(pass);

      const title = form.elements.title;
      const category = form.elements.category;
      const content = form.elements.content;
      const link = form.elements.link;

      if (!title.value || title.value.trim().length < 6) {
        fail(title.closest('.form-row'), 'Title must be at least 6 characters.');
        ok = false;
      }
      if (!category.value) {
        fail(category.closest('.form-row'), 'Please choose a category.');
        ok = false;
      }
      if (!content.value || content.value.trim().length < 80) {
        fail(content.closest('.form-row'), 'Please share at least 80 characters of context.');
        ok = false;
      }
      if (link.value && !/^https?:\/\/.+/i.test(link.value)) {
        fail(link.closest('.form-row'), 'Link must start with http:// or https://');
        ok = false;
      }

      if (!ok) {
        const firstError = form.querySelector('.form-row.error input, .form-row.error textarea, .form-row.error select');
        if (firstError) firstError.focus();
        return;
      }

      const success = form.querySelector('.form-success');
      if (success) {
        success.textContent = 'Submitted for editor review. You will be notified when it is approved.';
        success.classList.add('is-visible');
        success.focus && success.focus();
      }
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setupMobileMenu();
    setupActiveNav();
    renderHomePosts();
    renderApprovedPosts();
    renderPostDetail();
    renderEditorPanel();
    setupReveal();
    validateRegister();
    validateLogin();
    validateCreatePost();
  });
})();
