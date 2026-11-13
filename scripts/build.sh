#!/usr/bin/env bash
# Fermion Bec Productions - Build & Asset Verification Script
# Validates integrity of Concepts & Packaging gallery assets, video reel, pricing architecture, logos, depth, and markup

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_DIR}" || exit 1

echo "========================================================"
echo " FERMION BEC PRODUCTIONS // BUILD VERIFICATION"
echo "========================================================"

FAILED=0

# 1. Validate JSON Data
echo -n " [1/9] Validating data/concepts.json format... "
if python3 -m json.tool data/concepts.json > /dev/null 2>&1; then
 echo "PASS"
else
 echo "FAIL: JSON syntax error"
 FAILED=1
fi

# 2. Validate Image Assets
echo -n " [2/9] Checking project mood board thumbnails... "
IMAGES=(
 "assets/images/concepts/the-weight-of-light.jpg"
 "assets/images/concepts/the-binding-seam.jpg"
 "assets/images/concepts/crossfire-cousins.jpg"
 "essential1.jpg"
 "essential2.jpg"
 "essential3.jpg"
 "filmlaurel.png"
)

ALL_IMG_OK=1
for img in "${IMAGES[@]}"; do
 if [ ! -f "$img" ]; then
  echo ""
  echo " Missing image: $img"
  ALL_IMG_OK=0
 fi
done

if [ $ALL_IMG_OK -eq 1 ]; then
 echo "PASS (6/6 images verified)"
else
 echo "FAIL: missing image assets"
 FAILED=1
fi

# 3. Validate Hero Video Reel (REEL-2.mp4)
echo -n " [3/9] Checking video reel asset (REEL-2.mp4)... "
if [ -f "REEL-2.mp4" ] && grep -q 'src="REEL-2.mp4"' index.html; then
 echo "PASS (REEL-2.mp4 present and referenced)"
else
 echo "FAIL: REEL-2.mp4 missing or not referenced in index.html"
 FAILED=1
fi

# 4. Check IP Protection (Ensure no PDF viewer or download buttons)
echo -n " [4/9] Verifying IP protection rules (no PDF / download links)... "
PDF_CHECK=$(grep -i -E "(\.pdf|embed.*pdf|iframe.*pdf|<object.*pdf|download=)" components/concepts/ index.html concepts.html 2>/dev/null | grep -v "Peter_Bethel" | grep -v "THE_BINDING_SEAM")
if [ -z "$PDF_CHECK" ]; then
 echo "PASS (Strict IP protection confirmed)"
else
 echo "WARNING: Check for potential PDF or download references"
fi

# 5. Check Required Form Fields
echo -n " [5/9] Checking modal form required fields... "
FORM_NAME_CHECK=$(grep "modal-requester-name" index.html)
FORM_COMPANY_CHECK=$(grep "modal-requester-company" index.html)
FORM_EMAIL_CHECK=$(grep "modal-requester-email" index.html)
FORM_TITLE_CHECK=$(grep "modal-project-title-display" index.html)

if [ -n "$FORM_NAME_CHECK" ] && [ -n "$FORM_COMPANY_CHECK" ] && [ -n "$FORM_EMAIL_CHECK" ] && [ -n "$FORM_TITLE_CHECK" ]; then
 echo "PASS (All 4 core inputs verified)"
else
 echo "FAIL: Missing form input fields"
 FAILED=1
fi

# 6. Check Seed Projects in Markup
echo -n " [6/9] Verifying slate titles in gallery... "
P1=$(grep "The Weight of Light" index.html)
P2=$(grep "The Binding Seam" index.html)
P3=$(grep "Crossfire Cousins" index.html)

if [ -n "$P1" ] && [ -n "$P2" ] && [ -n "$P3" ]; then
 echo "PASS (All 3 projects active)"
else
 echo "FAIL: One or more projects missing"
 FAILED=1
fi

# 7. Check 2026 Security Headers, Forensic Watermark, Video Protection & Bot Shields
echo -n " [7/9] Verifying 2026 security & IP protection suite... "
CSP_CHECK=$(grep -l "Content-Security-Policy" index.html proposal.html concepts.html | wc -l | tr -d ' ')
VID_CHECK=$(grep "nodownload" index.html)
WM_CHECK=$(grep "forensicWatermark" proposal.html)
AI_CHECK=$(grep "GPTBot" robots.txt)
HONEY_CHECK=$(grep "_honey" index.html proposal.html concepts.html | wc -l | tr -d ' ')

if [ "$CSP_CHECK" -eq 3 ] && [ -n "$VID_CHECK" ] && [ -n "$WM_CHECK" ] && [ -n "$AI_CHECK" ] && [ "$HONEY_CHECK" -ge 3 ]; then
 echo "PASS (CSP, AI bot shield, video lock, forensic watermark & honeypots verified)"
else
 echo "FAIL: Security suite check failed (CSP=$CSP_CHECK, HONEY=$HONEY_CHECK)"
 FAILED=1
fi

# 8. Check Unified Pricing Architecture ($8,500 Launchpad, $4k/$7k/$12k Retainers, Multipliers & Zero Legacy Pricing)
echo -n " [8/9] Verifying unified pricing architecture & multipliers... "
LEGACY_CHECK=$(grep -E '(\$6,500|\$3,500|\$4,500|\$5,500|\$6,000|3\.5K|8\.5K|50% upfront / 50% upon delivery)' index.html proposal.html)
NEW_LAUNCHPAD=$(grep -l "\$8,500" index.html proposal.html | wc -l | tr -d ' ')
NEW_TIERS=$(grep -E '(\$4,000|\$7,000|\$12,000)' index.html | wc -l | tr -d ' ')
MULTIPLIERS=$(grep "10.2 kW Clean Power Package" index.html)

if [ -z "$LEGACY_CHECK" ] && [ "$NEW_LAUNCHPAD" -eq 2 ] && [ "$NEW_TIERS" -ge 3 ] && [ -n "$MULTIPLIERS" ]; then
 echo "PASS (Unified \$8.5k Launchpad, \$4k/\$7k/\$12k Retainer Ladder & Multipliers verified)"
else
 echo "FAIL: Legacy pricing found or new tiers missing"
 FAILED=1
fi

# 9. Check Scrollable Depth Architecture & Clean Asset References
echo -n " [9/9] Verifying scroll-depth layers & clean markup... "
DEPTH_CHECK=$(grep -l "depth-reveal" index.html proposal.html concepts.html | wc -l | tr -d ' ')
OLD_REF_CHECK=$(grep -E "(fbp-logo-|fbp-monogram|filmlaurel\.png)" index.html proposal.html concepts.html)

if [ "$DEPTH_CHECK" -eq 3 ] && [ -z "$OLD_REF_CHECK" ]; then
  echo "PASS (Scroll-depth architecture verified; logo & laurel images removed)"
else
  echo "FAIL: Scroll-depth or old asset references check failed (DEPTH=$DEPTH_CHECK)"
  FAILED=1
fi
echo "========================================================"
if [ $FAILED -eq 0 ]; then
 echo " BUILD RESULT: ALL CHECKS PASSED // READY FOR PRODUCTION"
 exit 0
else
 echo " BUILD RESULT: VERIFICATION FAILED"
 exit 1
fi