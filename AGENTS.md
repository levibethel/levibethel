# AGENTS.md — Repository Operating Instructions & System Constraints

## 1. Project Overview & Identity
- **Repository**: `LeviBethel_Portfolio`
- **Entity Name**: Strictly **Fermion Bec Productions** or **FBP**.
  - **PROHIBITED**: Never append "LLC" anywhere in markup, documents, or titles.
  - **PROHIBITED**: Never use standalone "Fermion Bec" (which risks confusing clients into thinking it is an individual person).
- **Executive Founder**: **Peter Levi Bethel** (Commercial Director, DP, Colorist).
- **Core Mission**: Cinematic Video Infrastructure & Revenue Engine for high-ticket B2B and enterprise brands ($10M–$100M revenue, $50k+ customer lifetime value).

---

## 2. Accuracy, Experience & Hardware Guardrails
- **Founder Experience**:
  - Exactly **a decade (10+ years) of physical on-set production experience** spanning commercial, brand, and narrative cinema.
  - Exactly **8 years of specialized industry mentorship** refining directorial and cinematography craft.
  - **PROHIBITED**: Never claim "a decade of broadcast leadership" or fabricate executive positions at broadcast networks (e.g., Fox, FX, Apple).
- **Production Hardware & Optics**:
  - Adaptable, versatile cinema packages scaled to the campaign vision and budget. Experience across all camera bodies (ARRI, RED, Sony Cinema, Blackmagic, hybrid rigs) and spherical, vintage, and anamorphic optics.
  - **PROHIBITED**: Never claim "Owned Cinema Equity" or that specific cameras/anamorphic prime sets are owned studio inventory. All cinema gear is rented and tailored to project scale.
  - **PROHIBITED**: Never use rigid static gear labels like "LARGE-FORMAT SENSORS & ANAMORPHIC GLASS".
- **External Citations**:
  - **PROHIBITED**: Never cite "VAOS" or external playbook/mentor names (e.g., "Ayrton Sudholz") in user-facing copy, code comments, or CSS class names. Use generic, professional descriptors like "Productized Commercial Roadmap" or "Production Benchmark".

---

## 3. Design System & Typography Hierarchy
The site enforces a **strict 3-font typography system** across `index.html`, `proposal.html`, and `concepts.html`:

| Font | Google Fonts Weight | Utility Class | Usage |
| :--- | :--- | :--- | :--- |
| **Plus Jakarta Sans** | 400, 500, 600, 700, 800 | `.font-hero`, `.font-serif-title`, `.font-studio`, `.btn-hire`, `.btn-secondary` | Display headlines, brand titles, section headers, primary CTAs |
| **Inter** | 300, 400, 500, 600, 700 | `body`, `.font-serif-sub`, `.nav-pill-btn`, `.role-btn` | Body text, descriptive copy, bullet points, interactive navigation |
| **JetBrains Mono** | 400, 500, 700 | `.font-mono-hud`, `.font-mono-code` | Viewfinder HUD, timecode, SLAs, pricing tags, technical indicators |

- **PROHIBITED**: Do not load or reintroduce `Cinzel`, `Bebas Neue`, `Syncopate`, `Playfair Display`, `Space Mono`, `Outfit`, or `Cormorant Garamond`.
- **Palette**: Obsidian background (`#060807`), elevated surfaces (`#0E1210`, `#141A17`), borders (`#1C2420`, hover `#2D3A34`), studio amber accent (`#FF9800`).

---

## 4. Header & Responsive Layout Rules
- **Top Header**:
  - No portrait image and no founder name in the top header (both are featured in the Section 7 Founder Authority bio lower on the page).
  - Breakpoint: Use `flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6` to prevent collision with action buttons on screens narrower than 1280px (e.g., laptop screens with browser sidebars open).
  - Title formatting:
    ```html
    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-white font-hero tracking-wider leading-tight mb-2 sm:whitespace-nowrap">
      <span class="block sm:inline">FERMION BEC</span> <span class="block sm:inline">PRODUCTIONS</span>
    </h1>
    ```
    - **Desktop**: Strictly inline for uniformity.
    - **Mobile (< 640px)**: Cleanly stacked into two lines to prevent horizontal overflow or awkward word breaks.

---

## 5. Notification & Email Dispatch Standards
All lead capture, diagnostic, and contract execution forms must maintain dual-dispatch redundancy:
- **Primary Recipient**: `fermionbecproductions@gmail.com`
- **Executive Archive / CC**: `levibethel@gmail.com`
- **Immediate Mailto Trigger**: Interactive forms must invoke `window.location.href = mailtoUrl` upon submission to launch the native mail client pre-populated, while simultaneously transmitting data via background `fetch` to FormSubmit (`_template: table`, `_captcha: false`).

---

## 6. Development & Verification Commands
- **Local Dev Server**: `bash scripts/dev.sh` (or `npm run dev`)
  - Automatically resolves port conflicts starting at port `3000`.
- **Build & Verification**: `bash scripts/build.sh` (or `npm run build`)
  - Verifies JSON schema integrity, asset paths, video reel availability, IP protection rules, and form field IDs.
- **SQLite Database Backup**: `python3 scripts/backup_sqlite.py` (or `bash scripts/backup_sqlite.sh`)
  - Executes safe, zero-downtime online backup with timestamped rotation and diagnostic export.
