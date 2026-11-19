/**
 * Fermion Bec Productions - ConceptsGallery Component
 * Renders the aligned 2x2 project grid and concise 3-pillar conversion capabilities section.
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

      <!-- Concise Conversion-Driving Production & Packaging Capabilities -->
      <div class="mt-16 pt-12 border-t border-[#1F1F26]">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-8">
          <div>
            <span class="text-xs font-mono-hud text-amber-500 uppercase tracking-widest block mb-2">
              // PRODUCTION & PACKAGING CAPABILITIES
            </span>
            <h3 class="text-2xl sm:text-3xl md:text-4xl text-white font-serif-title">
              Built for Political Campaigns, Commercial Brands & Feature Films
            </h3>
          </div>
          <p class="text-xs sm:text-sm text-[#8C8C92] max-w-xl leading-relaxed">
            One disciplined production unit delivering fast field deployment, fixed-scope commercial packages, and investor-ready film packaging.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
          <!-- 01: Political Campaign Media & Logistical Fortitude -->
          <div class="depth-card bg-[#0A0A0E] border border-[#1F1F26] rounded-xl p-6 md:p-7 flex flex-col justify-between h-full hover:border-amber-500/50">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="text-[11px] font-mono-hud font-bold text-amber-400 uppercase tracking-wider">01 // POLITICAL CAMPAIGN MEDIA</span>
                <span class="text-[10px] font-mono-hud text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded uppercase">RAPID DEPLOYMENT</span>
              </div>
              <h4 class="text-xl text-white font-serif-title mb-2.5">
                Political Campaign Media & Logistical Fortitude
              </h4>
              <p class="text-xs sm:text-sm text-[#8C8C92] leading-relaxed mb-5">
                Broadcast, OTT, and rapid-response campaign ads backed by disciplined field logistics—built to move fast and hit strict media-buy deadlines.
              </p>
              <ul class="text-xs font-mono-hud text-[#D1D5DB] space-y-2.5 pt-4 border-t border-[#18181F] mb-6">
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold">✓</span>
                  <span><strong>Self-Powered Field Mobility:</strong> 10.2 kW silent mobile studio power and multi-cam town hall rigs ready for any district location.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold">✓</span>
                  <span><strong>Rapid Broadcast Turnaround:</strong> 30s/15s TV, OTT, and digital spots cut, graded, and compliant for immediate air.</span>
                </li>
              </ul>
            </div>
            <a href="https://calendar.app.google/PMCtX5rRvdCpoVPQ6" target="_blank" class="block w-full text-center text-xs font-mono-hud font-semibold uppercase tracking-wider py-2.5 px-4 rounded border border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black transition">
              Scope Campaign Media →
            </a>
          </div>

          <!-- 02: Brand-Specific Commercial Packages -->
          <div class="depth-card bg-[#0A0A0E] border border-[#1F1F26] rounded-xl p-6 md:p-7 flex flex-col justify-between h-full hover:border-amber-500/50">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="text-[11px] font-mono-hud font-bold text-amber-400 uppercase tracking-wider">02 // COMMERCIAL PACKAGES</span>
                <span class="text-[10px] font-mono-hud text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded uppercase">1 SHOOT → 10X ADS</span>
              </div>
              <h4 class="text-xl text-white font-serif-title mb-2.5">
                Brand-Specific Commercial Packages
              </h4>
              <p class="text-xs sm:text-sm text-[#8C8C92] leading-relaxed mb-5">
                Fixed-scope commercial production tailored to your industry—capturing hero spots, vertical social hooks, and campaign stills in a single shoot.
              </p>
              <ul class="text-xs font-mono-hud text-[#D1D5DB] space-y-2.5 pt-4 border-t border-[#18181F] mb-6">
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold">✓</span>
                  <span><strong>Upfront Pricing & 2-7-21 Delivery:</strong> From $8,500 30-day Launchpad Sprints and monthly retainers to $50,000 broadcast campaigns.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold">✓</span>
                  <span><strong>Direct or White-Label Execution:</strong> Full creative production for brands or turnkey crew and gear under your agency banner.</span>
                </li>
              </ul>
            </div>
            <a href="index.html#offers" class="block w-full text-center text-xs font-mono-hud font-semibold uppercase tracking-wider py-2.5 px-4 rounded border border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black transition">
              Compare Commercial Packages →
            </a>
          </div>

          <!-- 03: Film Production & Packaging Services -->
          <div class="depth-card bg-[#0A0A0E] border border-[#1F1F26] rounded-xl p-6 md:p-7 flex flex-col justify-between h-full hover:border-amber-500/50">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="text-[11px] font-mono-hud font-bold text-amber-400 uppercase tracking-wider">03 // FILM PACKAGING & PRODUCTION</span>
                <span class="text-[10px] font-mono-hud text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded uppercase">35%–39% NJ TAX CREDIT</span>
              </div>
              <h4 class="text-xl text-white font-serif-title mb-2.5">
                Film Production & Packaging Services
              </h4>
              <p class="text-xs sm:text-sm text-[#8C8C92] leading-relaxed mb-5">
                Complete feature packaging and physical line production that turns screenplays into finance-ready business plans before Day 1 on set.
              </p>
              <ul class="text-xs font-mono-hud text-[#D1D5DB] space-y-2.5 pt-4 border-t border-[#18181F] mb-6">
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold">✓</span>
                  <span><strong>Investor-Ready Dossiers:</strong> WGA screenplays, visual lookbooks, SAG-AFTRA budget top sheets, and clustered multi-camera schedules.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold">✓</span>
                  <span><strong>NJEDA Tax Credit Structuring:</strong> 35%–39% New Jersey Film Tax Credit recovery and permitting to reduce net investor risk.</span>
                </li>
              </ul>
            </div>
            <a href="https://calendar.app.google/PMCtX5rRvdCpoVPQ6" target="_blank" class="block w-full text-center text-xs font-mono-hud font-semibold uppercase tracking-wider py-2.5 px-4 rounded border border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black transition">
              Discuss Film Packaging →
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
