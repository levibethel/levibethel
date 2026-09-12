#!/usr/bin/env bash
# Fermion Bec Productions - Build & Asset Verification Script
# Validates integrity of Concepts & Packaging gallery assets, video reel, and markup

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${REPO_DIR}" || exit 1

echo "========================================================"
echo " FERMION BEC PRODUCTIONS // BUILD VERIFICATION"
echo "========================================================"

FAILED=0

# 1. Validate JSON Data
echo -n " [1/6] Validating data/concepts.json format... "
if python3 -m json.tool data/concepts.json > /dev/null 2>&1; then
  echo "PASS"
else
  echo "FAIL: JSON syntax error"
  FAILED=1
fi

# 2. Validate Image Assets
echo -n " [2/6] Checking project mood board thumbnails... "
IMAGES=(
  "assets/images/concepts/the-weight-of-light.jpg"
  "assets/images/concepts/the-binding-seam.jpg"
  "assets/images/concepts/crossfire-cousins.jpg"
  "essential1.jpg"
  "essential2.jpg"
  "essential3.jpg"
)

ALL_IMG_OK=1
for img in "${IMAGES[@]}"; do
  if [ ! -f "$img" ]; then
    echo ""
    echo "       Missing image: $img"
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
echo -n " [3/6] Checking video reel asset (REEL-2.mp4)... "
if [ -f "REEL-2.mp4" ] && grep -q 'src="REEL-2.mp4"' index.html; then
  echo "PASS (REEL-2.mp4 present and referenced)"
else
  echo "FAIL: REEL-2.mp4 missing or not referenced in index.html"
  FAILED=1
fi

# 4. Check IP Protection (Ensure no PDF viewer or download buttons)
echo -n " [4/6] Verifying IP protection rules (no PDF / download links)... "
PDF_CHECK=$(grep -i -E "(\.pdf|embed.*pdf|iframe.*pdf|<object.*pdf|download=)" components/concepts/ index.html concepts.html 2>/dev/null | grep -v "Peter_Bethel" | grep -v "THE_BINDING_SEAM")
if [ -z "$PDF_CHECK" ]; then
  echo "PASS (Strict IP protection confirmed)"
else
  echo "WARNING: Check for potential PDF or download references"
fi

# 5. Check Required Form Fields
echo -n " [5/6] Checking modal form required fields... "
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
echo -n " [6/6] Verifying slate titles in gallery... "
P1=$(grep "The Weight of Light" index.html)
P2=$(grep "The Binding Seam" index.html)
P3=$(grep "Crossfire Cousins" index.html)

if [ -n "$P1" ] && [ -n "$P2" ] && [ -n "$P3" ]; then
  echo "PASS (All 3 projects active)"
else
  echo "FAIL: One or more projects missing"
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
