require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
});

// Map each proposal.html contract package & milestone to its Stripe Price ID and billing mode
const MILESTONE_CATALOG = {
  launchpad_60: {
    mode: 'payment',
    priceId: process.env.STRIPE_PRICE_LAUNCHPAD_60 || 'price_...',
    label: '01. Launchpad Sprint — 60% Booking Deposit ($5,100)',
  },
  launchpad_100: {
    mode: 'payment',
    priceId: process.env.STRIPE_PRICE_LAUNCHPAD_100 || 'price_...',
    label: '01. Launchpad Sprint — 100% Advance Pre-Pay ($8,500)',
  },
  flagship_30: {
    mode: 'payment',
    priceId: process.env.STRIPE_PRICE_FLAGSHIP_30 || 'price_...',
    label: '02. Flagship Campaign — 30% Signing Milestone ($15,000)',
  },
  flagship_50: {
    mode: 'payment',
    priceId: process.env.STRIPE_PRICE_FLAGSHIP_50 || 'price_...',
    label: '02. Flagship Campaign — 50% Upfront Split ($25,000)',
  },
  retainer_4000: {
    mode: 'subscription',
    priceId: process.env.STRIPE_PRICE_RETAINER_TIER1 || 'price_...',
    label: 'Tier 01 // Content Infrastructure Retainer ($4,000/mo)',
  },
  retainer_7000: {
    mode: 'subscription',
    priceId: process.env.STRIPE_PRICE_RETAINER_TIER2 || 'price_...',
    label: 'Tier 02 // Growth Media Partner Retainer ($7,000/mo)',
  },
  retainer_12000: {
    mode: 'subscription',
    priceId: process.env.STRIPE_PRICE_RETAINER_TIER3 || 'price_...',
    label: 'Tier 03 // Studio Infrastructure Retainer ($12,000/mo)',
  },
};

// Map each Digital Billboard & Connected TV (DOOH) add-on from proposal.html to its Stripe Price ID
const DOOH_ADDON_CATALOG = {
  local_spotlight: {
    matchPrefix: 'Local Spotlight',
    priceId: process.env.STRIPE_PRICE_DOOH_LOCAL_SPOTLIGHT || 'price_...',
    unitAmount: 250000, // $2,500.00 USD base flight
    label: 'DOOH & Connected TV Add-On — Local Spotlight (2–3 Boards, 1-Wk Flight)',
  },
  regional_takeover: {
    matchPrefix: 'Regional Takeover',
    priceId: process.env.STRIPE_PRICE_DOOH_REGIONAL_TAKEOVER || 'price_...',
    unitAmount: 550000, // $5,500.00 USD base flight
    label: 'DOOH & Connected TV Add-On — Regional Takeover (5–8 Boards, 2-Wk Dayparted)',
  },
  multi_market: {
    matchPrefix: 'Multi-Market Campaign',
    priceId: process.env.STRIPE_PRICE_DOOH_MULTI_MARKET || 'price_...',
    unitAmount: 1200000, // $12,000.00 USD base flight
    label: 'DOOH & Connected TV Add-On — Multi-Market Campaign (15+ Boards, 30-Day Flight)',
  },
};

function resolveDoohAddon(selectedDooh) {
  if (!selectedDooh || selectedDooh === 'None') return null;
  const normalized = String(selectedDooh).trim();
  if (DOOH_ADDON_CATALOG[normalized]) {
    return { key: normalized, ...DOOH_ADDON_CATALOG[normalized] };
  }
  for (const [key, addon] of Object.entries(DOOH_ADDON_CATALOG)) {
    if (normalized.toLowerCase().includes(addon.matchPrefix.toLowerCase())) {
      return { key, ...addon };
    }
  }
  return null;
}

function fulfillContractMilestone(session, triggerEvent) {
  console.log(`[FULFILLMENT] Contract milestone settled (${triggerEvent}):`, {
    sessionId: session.id,
    paymentStatus: session.payment_status,
    contractSealRef: session.client_reference_id || session.metadata?.contract_seal_ref || null,
    clientCompany: session.metadata?.client_company || null,
    milestoneKey: session.metadata?.milestone_key || null,
    doohAddonKey: session.metadata?.dooh_addon_key || 'none',
    customerId: session.customer || null,
    subscriptionId: session.subscription || null,
  });
}

// Webhook endpoint must use raw body before express.json() middleware
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      if (session.payment_status === 'paid') {
        fulfillContractMilestone(session, 'checkout.session.completed');
      } else {
        console.log(
          `[ACH PENDING] Checkout Session ${session.id} submitted for contract ${session.client_reference_id || 'N/A'}; awaiting async bank clearing.`
        );
      }
      break;
    }
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object;
      fulfillContractMilestone(session, 'checkout.session.async_payment_succeeded');
      break;
    }
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      console.error('Async ACH payment failed for contract session:', {
        sessionId: session.id,
        contractSealRef: session.client_reference_id || null,
      });
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

app.use(express.static('.'));
app.use(express.json());

// Expose publishable key safely to proposal.html client
app.get('/api/stripe-config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_...',
  });
});

// Part 1 — Server-side Checkout Session creation endpoint wired to proposal.html contract state
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const {
      milestoneKey = 'flagship_30',
      auditRef,
      clientEmail,
      clientCompany,
      signatoryName,
      signatoryTitle,
      selectedDooh,
    } = req.body || {};

    const selectedTier = MILESTONE_CATALOG[milestoneKey] || MILESTONE_CATALOG.flagship_30;
    const mode = selectedTier.mode;
    const doohAddon = resolveDoohAddon(selectedDooh);

    // Primary milestone or retainer line item
    const lineItems = [
      {
        price: selectedTier.priceId,
        quantity: 1,
      },
    ];

    // Append Digital Billboard & Connected TV (DOOH) package as a second line_item when selected
    if (doohAddon) {
      if (doohAddon.priceId && doohAddon.priceId !== 'price_...') {
        lineItems.push({
          price: doohAddon.priceId,
          quantity: 1,
        });
      } else {
        // Fallback inline price_data so DOOH line item works immediately even before a dedicated Price ID is set
        lineItems.push({
          price_data: {
            currency: 'usd',
            unit_amount: doohAddon.unitAmount,
            product_data: {
              name: doohAddon.label,
            },
          },
          quantity: 1,
        });
      }
    }

    const sessionParams = {
      ui_mode: 'form',
      mode,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: false,
      },
      automatic_tax: {
        enabled: true,
      },
      submit_type: 'auto',
      name_collection: {
        individual: {
          enabled: true,
        },
        business: {
          enabled: true,
        },
      },
      saved_payment_method_options: {
        payment_method_save: 'enabled',
      },
      integration_identifier: 'custom_embedded_web_0001',
      line_items: lineItems,
      metadata: {
        contract_seal_ref: auditRef || 'FBP-CSA-PENDING',
        client_company: clientCompany || 'Client Organization',
        signatory_name: signatoryName || '',
        signatory_title: signatoryTitle || '',
        milestone_key: milestoneKey,
        milestone_label: selectedTier.label,
        dooh_addon: selectedDooh || 'None',
        dooh_addon_key: doohAddon ? doohAddon.key : 'none',
      },
    };

    // Only include payment_method_collection when mode is "subscription"
    if (mode === 'subscription') {
      sessionParams.payment_method_collection = 'always';
    }

    // Bind signed Creative Services Agreement audit reference & client email
    if (auditRef) {
      sessionParams.client_reference_id = String(auditRef).replace(/[^a-zA-Z0-9_-]/g, '_');
    }
    if (clientEmail && clientEmail !== 'On File' && clientEmail.includes('@')) {
      sessionParams.customer_email = clientEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return res.json({
      client_secret: session.client_secret,
      mode,
      milestoneKey,
      doohAddonKey: doohAddon ? doohAddon.key : null,
      lineItemCount: lineItems.length,
    });
  } catch (error) {
    console.error('Error creating Checkout Session:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Stripe Checkout server running on ${process.env.DOMAIN || `http://localhost:${PORT}`}`);
});
