/**
 * Fermion Bec Productions - Concepts & Packaging Seed Data
 * Curated for pitch presentation without exposing underlying IP, plot mechanics, or financial data.
 */
const CONCEPTS_DATA = [
  {
    id: "the-weight-of-light",
    title: "The Weight of Light",
    format: "Commercial Concept Deck (Lucid Motors)",
    formatCategory: "Commercial Concept",
    client: "Lucid Motors Spec",
    description: "A six-slide visual proposal exploring the intersection of raw cinematic environments and automotive engineering.",
    thumbnail: "assets/images/concepts/the-weight-of-light.jpg",
    fallbackThumbnail: "essential2.jpg",
    aspectRatio: "2.39:1",
    deckSlides: "6 Slides",
    confidentialityLevel: "CONFIDENTIAL // PROPRIETARY COMMERCIAL SPEC",
    visualTone: "Anamorphic Optics • Desert Dawn • High-Contrast Motivated Light",
    tags: ["Commercial Deck", "Lucid Motors", "Automotive", "Anamorphic", "6 Slides"],
    colorPalette: ["#D4AF37", "#1A1A1E", "#3A3A42", "#888890"]
  },
  {
    id: "the-binding-seam",
    title: "The Binding Seam",
    format: "Feature Film One-Pager",
    formatCategory: "Narrative Feature",
    client: "Fermion Bec Productions",
    description: "A proof-of-concept visual breakdown establishing the tonal landscape, color palette, and atmospheric tension for a grounded dramatic thriller.",
    thumbnail: "assets/images/concepts/the-binding-seam.jpg",
    fallbackThumbnail: "essential1.jpg",
    aspectRatio: "2.39:1",
    deckSlides: "One-Pager Dossier",
    confidentialityLevel: "CONFIDENTIAL // WGA REGISTERED IP • PROTECTED SLATE",
    visualTone: "Barnegat Fog • Obsidian Pitch Pines • Bog Iron Rust & Amber Flare",
    tags: ["Feature Film", "One-Pager", "Psychological Thriller", "A24 Aesthetic", "Proof of Concept"],
    colorPalette: ["#8B2500", "#FF8C00", "#0A0F0D", "#D8D8D8"]
  },
  {
    id: "crossfire-cousins",
    title: "Crossfire Cousins",
    format: "Feature Film Production Deck",
    formatCategory: "Narrative Feature",
    client: "Fermion Bec Productions",
    description: "A conceptual lookbook highlighting character dynamics, atmospheric scene breakdowns, and the overarching cinematic visual strategy for a character-driven feature.",
    thumbnail: "assets/images/concepts/crossfire-cousins.jpg",
    fallbackThumbnail: "essential3.jpg",
    aspectRatio: "2.39:1",
    deckSlides: "Full Lookbook",
    confidentialityLevel: "CONFIDENTIAL // FINANCING & PACKAGING SUITE",
    visualTone: "Character Dynamics • High-Friction Shadows • Urban Twilight & Tungsten",
    tags: ["Feature Film", "Production Deck", "Lookbook", "Character-Driven", "Packaging Suite"],
    colorPalette: ["#F59E0B", "#1C1917", "#44403C", "#78716C"]
  }
];

if (typeof window !== 'undefined') {
  window.CONCEPTS_DATA = CONCEPTS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONCEPTS_DATA;
}
