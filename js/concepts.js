/**
 * Fermion Bec Productions - Concepts & Packaging Client Controller
 * Manages modal interactions, data rendering, filtering, asset protection, and deck inquiry submissions.
 */

// Global State
let activeDeckInquiry = null;
let deckModalOpenedAt = 0;

/**
 * HTML Escape Helper (DOM XSS Defense)
 */
function escapeHTML(str) {
  return String(str || '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

/**
 * Branded Security Toast Alert
 */
function triggerSecurityToast(msg) {
  const toast = document.getElementById('securityToast');
  const label = document.getElementById('securityToastMessage');
  if (!toast || !label) return;
  label.innerText = msg || 'Fermion Bec Productions // WGA & Commercial IP Protected';
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/**
 * Open the Deck Request Modal with auto-populated read-only project title
 */
function openDeckRequestModal(projectId, encodedTitle, encodedFormat) {
  const title = decodeURIComponent(encodedTitle || '');
  const format = decodeURIComponent(encodedFormat || '');

  activeDeckInquiry = { projectId, title, format };
  deckModalOpenedAt = Date.now();

  const modal = document.getElementById('deck-request-modal');
  const titleDisplay = document.getElementById('modal-project-title-display') || document.getElementById('modal-project-title');
  const idInput = document.getElementById('modal-project-id');
  const formatInput = document.getElementById('modal-project-format');
  const formContainer = document.getElementById('deck-form-container');
  const successContainer = document.getElementById('deck-success-container');

  if (titleDisplay) {
    titleDisplay.value = format ? `${title} (${format})` : title;
  }
  if (idInput) idInput.value = projectId;
  if (formatInput) formatInput.value = format;

  // Reset states
  if (formContainer) formContainer.classList.remove('hidden');
  if (successContainer) successContainer.classList.add('hidden');

  // Display modal
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus on first editable input
    setTimeout(() => {
      const nameInput = document.getElementById('modal-requester-name') || document.getElementById('requester-name');
      if (nameInput) nameInput.focus();
    }, 100);
  }
}

/**
 * Close Deck Request Modal
 */
function closeDeckRequestModal() {
  const modal = document.getElementById('deck-request-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Reset form
  const form = document.getElementById('deck-inquiry-form') || document.getElementById('deck-request-form');
  if (form) form.reset();

  activeDeckInquiry = null;
}

/**
 * Handle Form Submission for Deck Inquiries (with Zero-CAPTCHA Bot Telemetry & Rate Limiting)
 */
async function handleDeckRequestSubmit(event) {
  event.preventDefault();

  // 1. Honeypot Bot Trap
  const honey = document.getElementById('deck-honey');
  if (honey && honey.value) return;

  // 2. Behavioral Human-Interaction Timing Gate (>1.2s)
  if (deckModalOpenedAt && (Date.now() - deckModalOpenedAt < 1200)) {
    triggerSecurityToast('Security Verification: Please complete all required fields.');
    return;
  }

  // 3. Session Rate-Limit Cooldown (30s)
  const lastDeckDispatch = Number(sessionStorage.getItem('fbp_deck_last_dispatch') || 0);
  if (Date.now() - lastDeckDispatch < 30000) {
    triggerSecurityToast('Rate Limit Active: Please wait 30 seconds before submitting another request.');
    return;
  }

  const submitBtn = document.getElementById('btn-submit-deck-request') || document.getElementById('btn-deck-submit');

  const projectId = (document.getElementById('modal-project-id')?.value || '').trim();
  const projectTitle = ((document.getElementById('modal-project-title-display') || document.getElementById('modal-project-title'))?.value || '').trim();
  const requesterName = ((document.getElementById('modal-requester-name') || document.getElementById('requester-name'))?.value || '').trim();
  const requesterCompany = ((document.getElementById('modal-requester-company') || document.getElementById('requester-company'))?.value || '').trim();
  const requesterEmail = ((document.getElementById('modal-requester-email') || document.getElementById('requester-email'))?.value || '').trim();
  const requesterRole = ((document.getElementById('modal-requester-role') || document.getElementById('requester-role'))?.value || '').trim();
  const inquiryScope = ((document.getElementById('modal-inquiry-scope') || document.getElementById('inquiry-scope'))?.value || '').trim();

  if (!requesterName || !requesterCompany || !requesterEmail) return;
  sessionStorage.setItem('fbp_deck_last_dispatch', String(Date.now()));

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'TRANSMITTING & DISPATCHING EMAIL...';
  }

  // Generate Reference ID
  const refCode = 'FBP-DECK-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestamp = new Date().toISOString();

  // Privacy & Data Protection: Purge any legacy unencrypted PII from localStorage
  try {
    localStorage.removeItem('fbp_deck_inquiries');
  } catch (e) {
    // Ignore storage access errors in strict privacy browsers
  }

  // Build Structured Email Content
  const emailSubject = `[FBP DECK REQUEST] ${projectTitle} - ${requesterCompany} (${refCode})`;
  const emailBodyText = `==================================================\n` +
    `FERMION BEC PRODUCTIONS // DECK ACCESS PROTOCOL\n` +
    `==================================================\n` +
    `REFERENCE CODE : ${refCode}\n` +
    `TIMESTAMP      : ${timestamp}\n\n` +
    `PROJECT DETAILS:\n` +
    `Project Title  : ${projectTitle}\n` +
    `Project ID     : ${projectId}\n\n` +
    `REQUESTER INFORMATION:\n` +
    `Full Name      : ${requesterName}\n` +
    `Company/Agency : ${requesterCompany}\n` +
    `Email Address  : ${requesterEmail}\n` +
    `Role / Title   : ${requesterRole || 'Not Specified'}\n` +
    `Inquiry Scope  : ${inquiryScope || 'Confidential Packaging Review'}\n\n` +
    `DISPATCH AUDIT:\n` +
    `This request was submitted via Peter Levi Bethel's Portfolio & Concepts Packaging Suite.\n` +
    `Direct Inquiries  : info@fermionbecproductions.com\n` +
    `Primary Recipient : fermionbecproductions@gmail.com\n` +
    `Executive Archive : levibethel@gmail.com\n` +
    `==================================================`;

  const mailtoUrl = `mailto:fermionbecproductions@gmail.com?cc=levibethel@gmail.com,info@fermionbecproductions.com&reply-to=${encodeURIComponent(requesterEmail)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBodyText)}`;

  // Attempt direct mail client trigger during user gesture
  try {
    window.location.href = mailtoUrl;
  } catch (err) {
    console.warn('Direct mailto redirect:', err);
  }

  // Background Email Dispatch via FormSubmit AJAX endpoint as redundancy
  try {
    fetch('https://formsubmit.co/ajax/ed97f021249b9307a739c7f93ebaf6b0', {
      method: 'POST',
      referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: emailSubject,
        _cc: 'fermionbecproductions@gmail.com,levibethel@gmail.com,info@fermionbecproductions.com',
        _replyto: requesterEmail,
        _template: 'table',
        _captcha: 'false',
        reference_code: refCode,
        project_title: projectTitle,
        project_id: projectId,
        requester_name: requesterName,
        company: requesterCompany,
        requester_email: requesterEmail,
        requester_role: requesterRole,
        inquiry_scope: inquiryScope,
        timestamp: timestamp
      })
    }).then(res => res.json()).then(data => {
      console.log('Background email dispatch status:', data);
    }).catch(err => {
      console.warn('Background email dispatch network issue:', err);
    });
  } catch (err) {
    console.warn('Dispatch error:', err);
  }

  // Update UI and activate direct mail link
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'TRANSMIT DECK REQUEST';
    }

    const formContainer = document.getElementById('deck-form-container');
    const successContainer = document.getElementById('deck-success-container');
    const refDisplay = document.getElementById('deck-success-ref');
    const projectDisplay = document.getElementById('deck-success-project-name');
    const mailtoBtn = document.getElementById('btn-deck-mailto-fallback');

    if (formContainer) formContainer.classList.add('hidden');
    if (refDisplay) refDisplay.innerText = `REF: ${refCode}`;
    if (projectDisplay) projectDisplay.innerText = projectTitle;
    if (mailtoBtn) {
      mailtoBtn.href = mailtoUrl;
    }
    if (successContainer) successContainer.classList.remove('hidden');
  }, 400);
}

/**
 * Handle Mailto Click Callback
 */
function handleMailtoClick() {
  const noticeBox = document.getElementById('deck-success-notice');
  if (noticeBox) {
    noticeBox.innerHTML = `✓ DISPATCH INITIATED: Hit <strong>"Send"</strong> in your mail app to transmit this request to <strong>info@fermionbecproductions.com</strong>, <strong>fermionbecproductions@gmail.com</strong> &amp; <strong>levibethel@gmail.com</strong>. Once received, credentials will be vetted and your view link dispatched.`;
    noticeBox.classList.remove('bg-amber-500/10', 'border-amber-500/40', 'text-amber-300');
    noticeBox.classList.add('bg-emerald-500/10', 'border-emerald-500/30', 'text-emerald-400');
  }
}

if (typeof window !== 'undefined') {
  window.handleMailtoClick = handleMailtoClick;
  window.escapeHTML = escapeHTML;
}

/**
 * Filter Concepts in Gallery
 */
function filterConcepts(category, btnElement) {
  const buttons = document.querySelectorAll('.concept-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'border-amber-500/60', 'bg-amber-500/10', 'text-amber-400');
    btn.classList.add('border-[#26262E]', 'text-[#777]');
  });

  if (btnElement) {
    btnElement.classList.add('active', 'border-amber-500/60', 'bg-amber-500/10', 'text-amber-400');
    btnElement.classList.remove('border-[#26262E]', 'text-[#777]');
  }

  const cards = document.querySelectorAll('.concept-card');
  const data = window.CONCEPTS_DATA || [];

  cards.forEach(card => {
    const pId = card.getAttribute('data-project-id');
    const project = data.find(p => p.id === pId);

    if (!project) return;

    if (category === 'all') {
      card.style.display = 'flex';
    } else if (category === 'feature') {
      card.style.display = project.formatCategory === 'Narrative Feature' ? 'flex' : 'none';
    } else if (category === 'commercial') {
      card.style.display = project.formatCategory === 'Commercial Concept' ? 'flex' : 'none';
    }
  });
}

/**
 * Auto-rotating Stacked Cards Controller
 */
function initStackedRotatingCards() {
  const stackContainers = document.querySelectorAll('.card-stack-wrap');
  
  stackContainers.forEach(container => {
    const track = container.querySelector('.rotating-card-track');
    if (!track) return;
    
    const items = track.querySelectorAll('.rotating-card-item');
    if (items.length <= 1) return;
    
    let currentIndex = 0;
    let isPaused = false;
    let intervalId = null;

    function showNext() {
      if (isPaused) return;
      const prevItem = items[currentIndex];
      if (prevItem) {
        prevItem.classList.remove('active');
        prevItem.classList.add('exiting');
        setTimeout(() => {
          prevItem.classList.remove('exiting');
        }, 450);
      }

      currentIndex = (currentIndex + 1) % items.length;
      const nextItem = items[currentIndex];
      if (nextItem) {
        nextItem.classList.add('active');
      }
    }

    function startRotation() {
      if (intervalId) clearInterval(intervalId);
      const intervalMs = 2800 + Math.floor(Math.random() * 500);
      intervalId = setInterval(showNext, intervalMs);
    }

    container.addEventListener('mouseenter', () => { isPaused = true; });
    container.addEventListener('mouseleave', () => { isPaused = false; });

    container.addEventListener('click', (e) => {
      e.stopPropagation();
      isPaused = false;
      showNext();
      startRotation();
    });

    startRotation();
  });
}

/**
 * Bind Asset Protection Shields to Lookbook & Portfolio Imagery
 */
function initAssetProtectionShields() {
  const protectedMedia = document.querySelectorAll('.concept-card img, header img, #founder img');
  protectedMedia.forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', (e) => {
      e.preventDefault();
      triggerSecurityToast('Fermion Bec Productions // Lookbook & Visual IP Protected');
    });
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      triggerSecurityToast('Fermion Bec Productions // Lookbook & Visual IP Protected');
    });
  });
}

// Global Event Listeners (Escape key, Outside Click, Hash Routing, Asset Shielding)
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDeckRequestModal();
      if (typeof closeQuiz === 'function') closeQuiz();
    }
  });

  const modal = document.getElementById('deck-request-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeDeckRequestModal();
      }
    });
  }

  function handleHashNavigation() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#packaging' || hash === '#concepts' || hash === '#pitch') {
      const packagingBtn = document.getElementById('btn-nav-packaging');
      if (typeof switchRole === 'function') {
        switchRole('packaging', packagingBtn);
      }
    }
  }

  handleHashNavigation();
  initStackedRotatingCards();
  initAssetProtectionShields();
  window.addEventListener('hashchange', handleHashNavigation);
});
