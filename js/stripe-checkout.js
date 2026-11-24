// Part 2 — Client-side Stripe Checkout Embedded Form (Dahlia 2026-03-25.dahlia)
// Synchronizes with proposal.html contract state (milestoneKey, selectedDooh, auditRef, clientEmail, clientCompany)

const STRIPE_EMBEDDED_FORM_APPEARANCE = {
  theme: 'night',
  labels: 'auto',
  inputs: 'spaced',
  variables: {
    borderRadius: '4px',
    colorBackground: '#0a0000',
    colorDanger: '#df1b41',
    colorPrimary: '#0570de',
    colorSuccess: '#00c853',
    colorText: '#e5e5e5',
    fontFamily: 'default',
    fontSizeBase: '16px',
    spacingUnit: '4px',
  },
};

let activeMountedSignature = null;

async function initializeStripeEmbeddedCheckoutForm(contractContext = {}) {
  const container = document.querySelector('#checkout-form');
  if (!container || typeof Stripe !== 'function') return;

  const contextSignature = JSON.stringify({
    milestoneKey: contractContext.milestoneKey || 'flagship_30',
    selectedDooh: contractContext.selectedDooh || 'None',
    auditRef: contractContext.auditRef || 'FBP-CSA-PENDING',
    clientEmail: contractContext.clientEmail || '',
  });

  // Avoid duplicate remounts if the exact same milestone + DOOH add-on + contract seal is already mounted
  if (activeMountedSignature === contextSignature) return;

  try {
    let publishableKey = 'pk_test_...';
    try {
      const cfgRes = await fetch('/api/stripe-config');
      if (cfgRes.ok) {
        const cfg = await cfgRes.json();
        if (cfg.publishableKey) publishableKey = cfg.publishableKey;
      }
    } catch (_) {}

    const stripe = Stripe(publishableKey);

    const fetchClientSecret = async () => {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractContext),
      });
      const { client_secret } = await response.json();
      return client_secret;
    };

    const clientSecret = await fetchClientSecret();
    if (!clientSecret) return;

    container.innerHTML = '';
    const appearance = STRIPE_EMBEDDED_FORM_APPEARANCE;

    const checkout = stripe.initCheckoutFormSdk({ clientSecret, appearance });
    const form = checkout.createForm({
      layout: 'expanded',
    });
    form.mount('#checkout-form');
    activeMountedSignature = contextSignature;

    const loadActionsResult = await checkout.loadActions();
    if (loadActionsResult.type === 'success') {
      form.on('confirm', async (event) => {
        await loadActionsResult.actions.confirm({
          formConfirmEvent: event,
        });
      });
    }
  } catch (err) {
    console.warn('Stripe Embedded Checkout Form awaiting live keys/Price IDs:', err);
  }
}

window.STRIPE_EMBEDDED_FORM_APPEARANCE = STRIPE_EMBEDDED_FORM_APPEARANCE;
window.initializeStripeEmbeddedCheckoutForm = initializeStripeEmbeddedCheckoutForm;
