/**
 * Fermion Bec Productions - Concepts & Packaging Client Controller
 * Manages modal interactions, data rendering, filtering, and deck inquiry submissions.
 */

// Global State
let activeDeckInquiry = null;

/**
 * Open the Deck Request Modal with auto-populated read-only project title
 */
function openDeckRequestModal(projectId, encodedTitle, encodedFormat) {
  const title = decodeURIComponent(encodedTitle || '');
  const format = decodeURIComponent(encodedFormat || '');
  
  activeDeckInquiry = { projectId, title, format };

  const modal = document.getElementById('deck-request-modal');
  const titleDisplay = document.getElementById('modal-project-title-display');
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
      const nameInput = document.getElementById('modal-requester-name');
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
  const form = document.getElementById('deck-inquiry-form');
  if (form) form.reset();

  activeDeckInquiry = null;
}

/**
 * Handle Form Submission for Deck Inquiries
 */
function handleDeckRequestSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = document.getElementById('btn-submit-deck-request');

  const projectId = document.getElementById('modal-project-id')?.value || '';
  const projectTitle = document.getElementById('modal-project-title-display')?.value || '';
  const requesterName = document.getElementById('modal-requester-name')?.value || '';
  const requesterCompany = document.getElementById('modal-requester-company')?.value || '';
  const requesterEmail = document.getElementById('modal-requester-email')?.value || '';
  const requesterRole = document.getElementById('modal-requester-role')?.value || '';
  const inquiryScope = document.getElementById('modal-inquiry-scope')?.value || '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'TRANSMITTING REQUEST...';
  }

  // Generate Reference ID
  const refCode = 'FBP-DECK-' + Math.random().toString(36).substring(2, 7).toUpperCase();

  const inquiryPayload = {
    refCode,
    projectId,
    projectTitle,
    requesterName,
    requesterCompany,
    requesterEmail,
    requesterRole,
    inquiryScope,
    timestamp: new Date().toISOString()
  };

  // Persist locally for review/auditing
  try {
    const existing = JSON.parse(localStorage.getItem('fbp_deck_inquiries') || '[]');
    existing.unshift(inquiryPayload);
    localStorage.setItem('fbp_deck_inquiries', JSON.stringify(existing));
  } catch (e) {
    console.warn('Storage unavailable:', e);
  }

  console.log('Secure Deck Request Transmitted:', inquiryPayload);

  // Simulate network dispatch delay for professional HUD feel
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'TRANSMIT DECK REQUEST';
    }

    const formContainer = document.getElementById('deck-form-container');
    const successContainer = document.getElementById('deck-success-container');
    const refDisplay = document.getElementById('deck-success-ref');
    const projectDisplay = document.getElementById('deck-success-project-name');

    if (formContainer) formContainer.classList.add('hidden');
    if (refDisplay) refDisplay.innerText = `REF: ${refCode}`;
    if (projectDisplay) projectDisplay.innerText = projectTitle;
    if (successContainer) successContainer.classList.remove('hidden');
  }, 600);
}

/**
 * Filter Concepts in Gallery
 */
function filterConcepts(category, btnElement) {
  // Update button active states
  const buttons = document.querySelectorAll('.concept-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'border-amber-500/60', 'bg-amber-500/10', 'text-amber-400');
    btn.classList.add('border-[#26262E]', 'text-[#777]');
  });

  if (btnElement) {
    btnElement.classList.add('active', 'border-amber-500/60', 'bg-amber-500/10', 'text-amber-400');
    btnElement.classList.remove('border-[#26262E]', 'text-[#777]');
  }

  // Filter cards
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
 * Cycles through production package materials across all cards with smooth transitions.
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

    // Hover pauses rotation
    container.addEventListener('mouseenter', () => { isPaused = true; });
    container.addEventListener('mouseleave', () => { isPaused = false; });

    // Click cycles immediately
    container.addEventListener('click', (e) => {
      e.stopPropagation();
      isPaused = false;
      showNext();
      startRotation();
    });

    startRotation();
  });
}

// Global Event Listeners (Escape key, Outside Click, Hash Routing)
document.addEventListener('DOMContentLoaded', () => {
  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDeckRequestModal();
      if (typeof closeQuiz === 'function') closeQuiz();
    }
  });

  // Click outside modal card to close
  const modal = document.getElementById('deck-request-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeDeckRequestModal();
      }
    });
  }

  // Handle URL hash on initial load & hashchange
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
  window.addEventListener('hashchange', handleHashNavigation);
});
