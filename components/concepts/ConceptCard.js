/**
 * Fermion Bec Productions - ConceptCard Component
 * Generates an A24-inspired, indie-prestige project card with IP protection.
 */
function createConceptCard(project) {
  const paletteHtml = project.colorPalette
    ? project.colorPalette
        .map(
          color =>
            `<span class="w-2.5 h-2.5 rounded-full inline-block border border-white/20" style="background-color: ${color};" title="Tone: ${color}"></span>`
        )
        .join('')
    : '';

  const tagsHtml = project.tags
    ? project.tags
        .slice(0, 3)
        .map(
          tag =>
            `<span class="text-[10px] font-mono-hud text-[#888] bg-[#121216] border border-[#222226] px-2 py-0.5 rounded tracking-wider uppercase">${tag}</span>`
        )
        .join('')
    : '';

  return `
    <article class="concept-card bg-[#0A0A0D] border border-[#1F1F24] rounded-xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/60 transition-all duration-500 hover:shadow-[0_0_35px_rgba(217,119,6,0.15)] relative" data-project-id="${project.id}">
      
      <!-- Top Image Frame (Darkened / Blurred Mood Board Thumbnail) -->
      <div class="relative w-full aspect-[2.39/1] overflow-hidden bg-black border-b border-[#1A1A1F]">
        
        <!-- Blurred & Stylized Cinematic Thumbnail -->
        <img 
          src="${project.thumbnail}" 
          alt="${project.title} Mood Board" 
          onerror="this.onerror=null; this.src='${project.fallbackThumbnail}';" 
          class="w-full h-full object-cover filter brightness-[0.75] contrast-[1.15] saturate-[0.85] group-hover:scale-105 group-hover:brightness-[0.9] group-hover:saturate-100 transition-all duration-700 ease-out"
          loading="lazy"
        />

        <!-- Subtle Vignette & Scrim Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-black/60 pointer-events-none"></div>

        <!-- Top Left: Scope & Slides HUD -->
        <div class="absolute top-3 left-3 flex items-center gap-2">
          <span class="text-[9px] font-mono-hud uppercase tracking-widest text-amber-400/90 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/30">
            ${project.aspectRatio || '2.39:1'} SCOPE
          </span>
          <span class="text-[9px] font-mono-hud uppercase tracking-wider text-[#AAA] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
            ${project.deckSlides}
          </span>
        </div>

        <!-- Top Right: IP Security Badge -->
        <div class="absolute top-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-red-500/30 text-red-400 text-[9px] font-mono-hud tracking-widest uppercase">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>RESTRICTED IP</span>
        </div>

        <!-- Bottom Left overlay: Tonal Palette swatch -->
        <div class="absolute bottom-2.5 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5">
          <span class="text-[9px] font-mono-hud text-[#777] uppercase tracking-wider mr-1">TONE:</span>
          ${paletteHtml}
        </div>
      </div>

      <!-- Card Content -->
      <div class="p-6 md:p-8 flex flex-col flex-grow justify-between">
        <div>
          <!-- Format Category Header -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-[11px] font-mono-hud text-amber-500 tracking-[0.2em] uppercase">
              // ${project.format}
            </span>
          </div>

          <!-- Project Title (A24-inspired refined Serif) -->
          <h3 class="font-serif-title text-2xl md:text-3xl text-white tracking-wide mb-3 group-hover:text-amber-100 transition-colors font-semibold">
            ${project.title}
          </h3>

          <!-- Visual Description (strictly tone & visual proposal, no plot mechanics) -->
          <p class="text-xs md:text-sm text-[#8C8C92] font-light leading-relaxed mb-6">
            ${project.description}
          </p>

          <!-- Tonal Landscape Sub-Meta -->
          <div class="text-[10px] font-mono-hud text-[#686870] border-l-2 border-amber-500/30 pl-3 mb-6 space-y-1">
            <p><span class="text-[#888]">ATMOSPHERE:</span> ${project.visualTone}</p>
            <p><span class="text-[#888]">PROTECTION:</span> ${project.confidentialityLevel}</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-8">
            ${tagsHtml}
          </div>
        </div>

        <!-- Card Footer: IP Protection Guarantee & Request Full Deck CTA -->
        <div class="pt-5 border-t border-[#1C1C22] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div class="text-[10px] font-mono-hud text-[#555] flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span>CONFIDENTIAL DECK</span>
          </div>

          <!-- The Crucial CTA: Triggers Request Modal -->
          <button 
            type="button"
            onclick="openDeckRequestModal('${project.id}', '${encodeURIComponent(project.title)}', '${encodeURIComponent(project.format)}')"
            class="btn-deck-request text-xs font-mono-hud font-semibold uppercase tracking-wider py-2.5 px-5 rounded border border-amber-500/60 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_0_15px_rgba(217,119,6,0.1)]"
          >
            <span>Request Full Deck</span>
            <svg class="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>

      </div>
    </article>
  `;
}

if (typeof window !== 'undefined') {
  window.createConceptCard = createConceptCard;
}
