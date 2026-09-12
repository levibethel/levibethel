/**
 * Fermion Bec Productions - DeckRequestModal Component
 * Dedicated secure modal dialog for requesting confidential pitch and packaging decks.
 */
function renderDeckRequestModal() {
  return `
    <div id="deck-request-modal" class="fixed inset-0 bg-black/95 z-50 hidden flex items-center justify-center p-4 sm:p-6 backdrop-blur-md transition-opacity duration-300">
      
      <!-- Modal Card -->
      <div class="bg-[#0A0A0E] border border-[#26262E] rounded-2xl max-w-xl w-full p-6 sm:p-8 md:p-10 relative shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
        
        <!-- Header HUD -->
        <div class="flex justify-between items-start mb-6 border-b border-[#1E1E24] pb-4">
          <div>
            <span class="text-[10px] font-mono-hud text-amber-500 uppercase tracking-widest block mb-1">
              // DECK ACCESS PROTOCOL • CONFIDENTIAL
            </span>
            <h3 class="text-2xl sm:text-3xl font-hero text-white tracking-wide">
              REQUEST PACKAGING DOSSIER
            </h3>
          </div>
          <button 
            type="button"
            onclick="closeDeckRequestModal()" 
            class="text-xs font-mono-hud text-[#888] hover:text-white transition px-2 py-1 rounded hover:bg-white/5"
            aria-label="Close modal"
          >
            [CLOSE ✕]
          </button>
        </div>

        <!-- IP Protection Notice -->
        <div class="mb-6 p-3.5 bg-[#0F0F14] border border-[#222228] rounded-lg text-xs text-[#8E8E98] leading-relaxed flex items-start gap-3">
          <svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <p>
            Presentation decks and treatments are protected by Fermion Bec Productions LLC. Access is granted to verified studio executives, producers, agency reps, and commercial brand leaders under mutual confidentiality.
          </p>
        </div>

        <!-- Form State Container -->
        <div id="deck-form-container">
          <form id="deck-inquiry-form" onsubmit="handleDeckRequestSubmit(event)" class="space-y-4">
            
            <!-- Read-Only Auto-Captured Project Title -->
            <div>
              <label class="block text-[11px] font-mono-hud text-amber-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Requested Project Deck</span>
                <span class="text-[9px] text-[#666]">// AUTO-CAPTURED (READ-ONLY)</span>
              </label>
              <div class="relative">
                <input 
                  type="text" 
                  id="modal-project-title-display" 
                  readonly 
                  tabindex="-1"
                  class="w-full bg-[#121217] border border-amber-500/40 text-amber-300 font-mono-hud text-xs sm:text-sm px-3.5 py-2.5 rounded cursor-not-allowed select-none focus:outline-none focus:border-amber-500"
                  value=""
                />
                <div class="absolute right-3 top-2.5 text-[#666]">
                  <svg class="w-4 h-4 text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>
              <input type="hidden" id="modal-project-id" name="project_id" value="" />
              <input type="hidden" id="modal-project-format" name="project_format" value="" />
            </div>

            <!-- Requester Name (Required) -->
            <div>
              <label for="modal-requester-name" class="block text-[11px] font-mono-hud text-[#AAA] uppercase tracking-wider mb-1.5">
                Requester's Full Name <span class="text-amber-500">*</span>
              </label>
              <input 
                type="text" 
                id="modal-requester-name" 
                name="requester_name" 
                required 
                placeholder="e.g., Alexandra Vance" 
                class="w-full bg-[#0F0F14] border border-[#2A2A33] text-white text-sm px-3.5 py-2.5 rounded focus:border-amber-500 focus:bg-[#14141A] focus:outline-none transition"
              />
            </div>

            <!-- Production Company / Agency (Required) -->
            <div>
              <label for="modal-requester-company" class="block text-[11px] font-mono-hud text-[#AAA] uppercase tracking-wider mb-1.5">
                Production Company / Agency / Brand <span class="text-amber-500">*</span>
              </label>
              <input 
                type="text" 
                id="modal-requester-company" 
                name="requester_company" 
                required 
                placeholder="e.g., A24, Anonymous Content, Lucid Motors, CAA" 
                class="w-full bg-[#0F0F14] border border-[#2A2A33] text-white text-sm px-3.5 py-2.5 rounded focus:border-amber-500 focus:bg-[#14141A] focus:outline-none transition"
              />
            </div>

            <!-- Professional Email (Required) -->
            <div>
              <label for="modal-requester-email" class="block text-[11px] font-mono-hud text-[#AAA] uppercase tracking-wider mb-1.5">
                Professional Email Address <span class="text-amber-500">*</span>
              </label>
              <input 
                type="email" 
                id="modal-requester-email" 
                name="requester_email" 
                required 
                placeholder="e.g., alexandra@anonymouscontent.com" 
                class="w-full bg-[#0F0F14] border border-[#2A2A33] text-white text-sm px-3.5 py-2.5 rounded focus:border-amber-500 focus:bg-[#14141A] focus:outline-none transition"
              />
            </div>

            <!-- Role / Scope (Optional) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="modal-requester-role" class="block text-[11px] font-mono-hud text-[#888] uppercase tracking-wider mb-1.5">
                  Professional Capacity
                </label>
                <select 
                  id="modal-requester-role" 
                  name="requester_role" 
                  class="w-full bg-[#0F0F14] border border-[#2A2A33] text-[#CCC] text-xs px-3.5 py-2.5 rounded focus:border-amber-500 focus:outline-none transition"
                >
                  <option value="Producer / Executive">Producer / Executive</option>
                  <option value="Acquisitions / Financing">Acquisitions / Financing</option>
                  <option value="Agency / Management">Agency / Management</option>
                  <option value="Commercial Brand / Agency Lead">Commercial Brand / Agency Lead</option>
                  <option value="Director of Photography / Crew">Cinematographer / Crew</option>
                  <option value="Other">Other Representative</option>
                </select>
              </div>
              <div>
                <label for="modal-inquiry-scope" class="block text-[11px] font-mono-hud text-[#888] uppercase tracking-wider mb-1.5">
                  Timeline / Slate Phase
                </label>
                <select 
                  id="modal-inquiry-scope" 
                  name="inquiry_scope" 
                  class="w-full bg-[#0F0F14] border border-[#2A2A33] text-[#CCC] text-xs px-3.5 py-2.5 rounded focus:border-amber-500 focus:outline-none transition"
                >
                  <option value="Q3/Q4 2026 Production">Q3/Q4 2026 Production</option>
                  <option value="Development & Packaging">Development & Packaging</option>
                  <option value="Commercial Bid / Pitch">Commercial Bid / Pitch</option>
                  <option value="General Agency Review">General Agency Review</option>
                </select>
              </div>
            </div>

            <!-- Mutual Confidentiality Checkbox -->
            <div class="pt-2">
              <label class="flex items-start gap-2.5 cursor-pointer text-xs text-[#888]">
                <input 
                  type="checkbox" 
                  required 
                  class="mt-0.5 rounded bg-[#121216] border-[#333] text-amber-500 focus:ring-0 cursor-pointer"
                />
                <span>I acknowledge that requested decks are proprietary to Fermion Bec Productions and agree to maintain confidentiality.</span>
              </label>
            </div>

            <!-- Submit Button & Controls -->
            <div class="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button 
                type="submit" 
                id="btn-submit-deck-request"
                class="w-full sm:w-auto flex-1 btn-hire text-center cursor-pointer"
              >
                Transmit Deck Request
              </button>
              <button 
                type="button" 
                onclick="closeDeckRequestModal()" 
                class="w-full sm:w-auto text-xs font-mono-hud text-[#888] hover:text-white px-5 py-3 rounded border border-[#28282E] hover:border-[#444] transition text-center"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

        <!-- Success Feedback Container -->
        <div id="deck-success-container" class="hidden text-center py-6">
          <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span class="text-xs font-mono-hud text-amber-500 uppercase tracking-widest block mb-2">
            // TRANSMISSION LOGGED
          </span>
          <h3 class="text-2xl font-hero text-white mb-2">
            REQUEST RECEIVED
          </h3>
          <p class="text-xs font-mono-hud text-emerald-400 mb-4 tracking-wider" id="deck-success-ref">
            REF: FBP-DECK-2026-X9
          </p>
          <p class="text-sm text-[#8C8C92] font-light max-w-md mx-auto mb-6 leading-relaxed">
            Your inquiry for <strong class="text-white font-medium" id="deck-success-project-name">The Project</strong> has been delivered to Peter Levi Bethel. Credentials will be vetted and a secure view link will be dispatched to your email.
          </p>
          <button 
            type="button"
            onclick="closeDeckRequestModal()" 
            class="btn-hire text-xs"
          >
            Return to Gallery
          </button>
        </div>

      </div>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  window.renderDeckRequestModal = renderDeckRequestModal;
}
