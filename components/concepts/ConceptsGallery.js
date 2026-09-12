/**
 * Fermion Bec Productions - ConceptsGallery Component
 * Renders the responsive grid gallery with filter controls and A24-inspired aesthetic.
 */
function renderConceptsGallery(projects) {
  const cardsHtml = projects.map(p => createConceptCard(p)).join('\n');

  return `
    <section id="view-packaging" class="portfolio-section mb-24">
      
      <!-- Section Header -->
      <div class="mb-14 border-b border-[#1F1F24] pb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xs font-mono-hud text-amber-500 uppercase tracking-widest border border-amber-500/30 px-2.5 py-0.5 rounded bg-amber-500/10">
                // PACKAGING & VISUAL SLATE
              </span>
              <span class="text-[11px] font-mono-hud text-[#777] hidden sm:inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                CONFIDENTIAL REPOSITORIES
              </span>
            </div>
            <h2 class="text-4xl md:text-6xl text-white font-hero tracking-wider">
              CONCEPTS & PACKAGING
            </h2>
          </div>
          
          <!-- IP Security Callout -->
          <div class="text-left md:text-right max-w-sm">
            <p class="text-[11px] font-mono-hud text-[#777] leading-relaxed">
              <span class="text-amber-500/90 font-bold">IP PROTECTION ACTIVE:</span> Full treatments, one-pagers, and lookbooks are held under proprietary protection. Request below for executive access.
            </p>
          </div>
        </div>

        <!-- Curatorial Statement -->
        <p class="text-sm md:text-base text-[#8C8C92] font-light max-w-3xl leading-relaxed">
          Demonstrating high-concept narrative development, commercial visual proposals, and atmospheric lookbooks. Each package establishes optical strategy, color space, and tonal pacing without exposing confidential plot mechanics or financial data.
        </p>

        <!-- Filter Bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#18181D]">
          <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" id="concepts-filter-bar">
            <button 
              type="button" 
              onclick="filterConcepts('all', this)" 
              class="concept-filter-btn active text-[11px] font-mono-hud uppercase tracking-wider px-3.5 py-1.5 rounded border border-amber-500/60 bg-amber-500/10 text-amber-400 transition"
            >
              All Projects (3)
            </button>
            <button 
              type="button" 
              onclick="filterConcepts('feature', this)" 
              class="concept-filter-btn text-[11px] font-mono-hud uppercase tracking-wider px-3.5 py-1.5 rounded border border-[#26262E] text-[#777] hover:text-white hover:border-[#444] transition"
            >
              Features (2)
            </button>
            <button 
              type="button" 
              onclick="filterConcepts('commercial', this)" 
              class="concept-filter-btn text-[11px] font-mono-hud uppercase tracking-wider px-3.5 py-1.5 rounded border border-[#26262E] text-[#777] hover:text-white hover:border-[#444] transition"
            >
              Commercials (1)
            </button>
          </div>

          <div class="text-[11px] font-mono-hud text-[#555] flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></span>
            <span>DIRECTOR & PRODUCER PACKAGES // READY TO PITCH</span>
          </div>
        </div>
      </div>

      <!-- Responsive Masonry / Standard Grid -->
      <div id="concepts-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        ${cardsHtml}
      </div>

      <!-- Bottom Pitch & Packaging Capabilities Callout -->
      <div class="mt-16 bg-[#0A0A0E] border border-[#1F1F26] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span class="text-[10px] font-mono-hud text-amber-500 uppercase tracking-widest block mb-1">
            // CUSTOM PACKAGING COMMISSION
          </span>
          <h3 class="text-2xl text-white font-hero tracking-wide mb-2">
            NEED A PRODUCTION DECK OR LOOKBOOK ENGINEERED?
          </h3>
          <p class="text-xs text-[#888] max-w-xl leading-relaxed">
            Fermion Bec Productions crafts bespoke visual lookbooks, director's treatments, and commercial pitch decks for independent filmmakers, production houses, and luxury brands.
          </p>
        </div>
        <a 
          href="https://calendar.app.google/PMCtX5rRvdCpoVPQ6" 
          target="_blank" 
          class="btn-hire text-xs whitespace-nowrap"
        >
          Book Packaging Session
        </a>
      </div>

    </section>
  `;
}

if (typeof window !== 'undefined') {
  window.renderConceptsGallery = renderConceptsGallery;
}
