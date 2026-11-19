/**
 * Fermion Bec Productions - ConceptsGallery Component
 * Renders the aligned 2x2 project grid and overarching 4-pillar results breakdown.
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
          Original feature film packages and commercial concepts built with locked scripts, line-item budgets, and clear production schedules before cameras roll.
        </p>

        <!-- Filter Bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#18181D]">
          <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" id="concepts-filter-bar">
            <button 
              type="button" 
              onclick="filterConcepts('all', this)" 
              class="concept-filter-btn active text-[11px] font-mono-hud uppercase tracking-wider px-3.5 py-1.5 rounded border border-amber-500/60 bg-amber-500/10 text-amber-400 transition"
            >
              All Projects (4)
            </button>
            <button 
              type="button" 
              onclick="filterConcepts('feature', this)" 
              class="concept-filter-btn text-[11px] font-mono-hud uppercase tracking-wider px-3.5 py-1.5 rounded border border-[#26262E] text-[#777] hover:text-white hover:border-[#444] transition"
            >
              Features (3)
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

      <!-- Aligned Equal-Height 2x2 Project Grid -->
      <div id="concepts-grid" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        ${cardsHtml}
      </div>

      <!-- Overarching Results-Oriented Production Pillars & Packaging Breakdown -->
      <div class="mt-16 bg-[#0A0D0B] border border-[#1F2923] rounded-2xl p-8 md:p-11 relative overflow-hidden">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-8 mb-8 border-b border-[#1A221D]">
          <div>
            <span class="text-[11px] font-mono-hud text-amber-400 uppercase tracking-widest block mb-2">
              // PRODUCTION PILLARS & PACKAGING ADVANTAGES
            </span>
            <h3 class="text-3xl md:text-5xl text-white font-hero tracking-wide leading-none">
              HOW OUR PRODUCTION PILLARS DELIVER MEASURABLE RESULTS
            </h3>
          </div>
          <p class="text-xs md:text-sm text-[#A5A299] max-w-xl leading-relaxed">
            Whether we are shooting a commercial campaign, operating as a white-label crew for an agency, or packaging an original feature film, every project runs on upfront planning, fixed costs, and repeatable delivery systems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-9">
          <!-- Pillar 1 -->
          <div class="bg-[#0E1310] border border-[#1E2822] hover:border-amber-500/40 rounded-xl p-6 transition-all">
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-[10px] font-mono-hud text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                01 // PRODUCTION PILLAR CONCEPTS
              </span>
              <span class="text-[10px] font-mono-hud text-emerald-400 uppercase tracking-wider">UPFRONT CERTAINTY</span>
            </div>
            <h4 class="text-xl text-white font-hero tracking-wide mb-2">
              LOCKED SCOPE, BUDGET & SCHEDULE BEFORE DAY ONE
            </h4>
            <p class="text-xs text-[#9C9990] leading-relaxed mb-4">
              Every project begins by locking the script, shot list, crew roster, and line-item budget before cameras roll. Clients and investors know the exact cost and exact deliverables up front—eliminating surprise overages and wasted shoot days.
            </p>
            <div class="grid grid-cols-3 gap-2 pt-3 border-t border-[#1A221D] text-[10px] font-mono-hud">
              <div>
                <span class="text-white font-bold block">2-7-21</span>
                <span class="text-[#78756E]">DELIVERY STANDARD</span>
              </div>
              <div>
                <span class="text-amber-400 font-bold block">100%</span>
                <span class="text-[#78756E]">UPFRONT COST CLARITY</span>
              </div>
              <div>
                <span class="text-white font-bold block">ZERO</span>
                <span class="text-[#78756E]">SURPRISE OVERAGES</span>
              </div>
            </div>
          </div>

          <!-- Pillar 2 -->
          <div class="bg-[#0E1310] border border-[#1E2822] hover:border-amber-500/40 rounded-xl p-6 transition-all">
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-[10px] font-mono-hud text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                02 // COMMERCIAL PACKAGE VERSATILITY
              </span>
              <span class="text-[10px] font-mono-hud text-amber-400 uppercase tracking-wider">1 SHOOT → 10X ADS</span>
            </div>
            <h4 class="text-xl text-white font-hero tracking-wide mb-2">
              MULTI-FORMAT AD INVENTORY FROM A SINGLE SHOOT
            </h4>
            <p class="text-xs text-[#9C9990] leading-relaxed mb-4">
              We design every commercial set to capture hero broadcast masters, 15s/30s cutdowns, 9:16 vertical social hooks, and clean product stills in the same lighting setup. Packages scale from $8,500 one-day sprints and monthly ad retainers to $50,000 13-person broadcast productions.
            </p>
            <div class="grid grid-cols-3 gap-2 pt-3 border-t border-[#1A221D] text-[10px] font-mono-hud">
              <div>
                <span class="text-amber-400 font-bold block">10X ADS</span>
                <span class="text-[#78756E]">TV, STREAMING & SOCIAL</span>
              </div>
              <div>
                <span class="text-white font-bold block">$8.5K–$50K</span>
                <span class="text-[#78756E]">SCALABLE TIERS</span>
              </div>
              <div>
                <span class="text-white font-bold block">48 HOURS</span>
                <span class="text-[#78756E]">FIRST HOOK CUTS</span>
              </div>
            </div>
          </div>

          <!-- Pillar 3 -->
          <div class="bg-[#0E1310] border border-[#1E2822] hover:border-amber-500/40 rounded-xl p-6 transition-all">
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-[10px] font-mono-hud text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                03 // WHITE-LABEL AGENCY SUPPORT
              </span>
              <span class="text-[10px] font-mono-hud text-[#C2BFB6] uppercase tracking-wider">UNDER YOUR BANNER</span>
            </div>
            <h4 class="text-xl text-white font-hero tracking-wide mb-2">
              SEAMLESS CREW & GEAR EXTENSION FOR AGENCIES
            </h4>
            <p class="text-xs text-[#9C9990] leading-relaxed mb-4">
              Creative agencies and production houses plug our Director/DP team, cinema camera package, and 10.2 kW silent mobile power directly into their client shoots. We operate strictly under your agency name with fixed day rates, full non-circumvention protection, and organized DaVinci Resolve project handoffs at wrap.
            </p>
            <div class="grid grid-cols-3 gap-2 pt-3 border-t border-[#1A221D] text-[10px] font-mono-hud">
              <div>
                <span class="text-white font-bold block">100% NDA</span>
                <span class="text-[#78756E]">CLIENT PROTECTION</span>
              </div>
              <div>
                <span class="text-amber-400 font-bold block">10.2 kW</span>
                <span class="text-[#78756E]">SILENT SET POWER</span>
              </div>
              <div>
                <span class="text-white font-bold block">SAME-DAY</span>
                <span class="text-[#78756E]">PROXY & PROJECT HANDOFF</span>
              </div>
            </div>
          </div>

          <!-- Pillar 4 -->
          <div class="bg-[#0E1310] border border-[#1E2822] hover:border-amber-500/40 rounded-xl p-6 transition-all">
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-[10px] font-mono-hud text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                04 // FILM PACKAGING & LOGISTICS
              </span>
              <span class="text-[10px] font-mono-hud text-emerald-400 uppercase tracking-wider">35%–39% NJ TAX CREDIT</span>
            </div>
            <h4 class="text-xl text-white font-hero tracking-wide mb-2">
              INVESTOR-READY PACKAGING & ON-THE-GROUND LOGISTICS
            </h4>
            <p class="text-xs text-[#9C9990] leading-relaxed mb-4">
              Our feature films are packaged as complete business plans: WGA-registered scripts paired with SAG-AFTRA budget top sheets, clustered shooting schedules, municipal permitting, and 35%–39% New Jersey Film Tax Credit structuring—reducing net investor exposure before principal photography begins.
            </p>
            <div class="grid grid-cols-3 gap-2 pt-3 border-t border-[#1A221D] text-[10px] font-mono-hud">
              <div>
                <span class="text-emerald-400 font-bold block">35%–39%</span>
                <span class="text-[#78756E]">NJEDA TAX REBATE</span>
              </div>
              <div>
                <span class="text-white font-bold block">CLUSTERED</span>
                <span class="text-[#78756E]">MULTI-CAM LOGISTICS</span>
              </div>
              <div>
                <span class="text-amber-400 font-bold block">TURNKEY</span>
                <span class="text-[#78756E]">SCRIPT TO WATERFALL</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Action Bar -->
        <div class="pt-6 border-t border-[#1A221D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="text-xs text-[#A5A299]">
            <span class="text-white font-semibold">Ready to scope a campaign, book a white-label crew, or review a feature dossier?</span> Get exact numbers and deliverables on a 15-minute call.
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <a href="proposal.html" class="px-4 py-2.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black text-xs font-mono-hud uppercase tracking-wider transition">
              View Commercial Packages
            </a>
            <a href="https://calendar.app.google/PMCtX5rRvdCpoVPQ6" target="_blank" class="btn-hire text-xs whitespace-nowrap">
              Book Production Call
            </a>
          </div>
        </div>
      </div>

    </section>
  `;
}

if (typeof window !== 'undefined') {
  window.renderConceptsGallery = renderConceptsGallery;
}
