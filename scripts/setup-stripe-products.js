#!/usr/bin/env node
/**
 * Fermion Bec Productions — Automated Stripe Catalog & Price Provisioning Script
 * Creates (or reuses existing) 7 Commercial Milestone & Partnership Ladder Retainer
 * Products/Prices plus the 3 Digital Billboard & Connected TV (DOOH) Add-On Products/Prices
 * in Stripe, outputs the .env block, and optionally updates .env when run with --write-env.
 *
 * Usage:
 *   node scripts/setup-stripe-products.js
 *   node scripts/setup-stripe-products.js --write-env
 *   node scripts/setup-stripe-products.js --force --write-env
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey || apiKey === 'sk_test_...' || apiKey.includes('...')) {
  console.error(
    '\n[ERROR] Valid STRIPE_SECRET_KEY not found in .env.\n' +
      'Please set STRIPE_SECRET_KEY in /Users/levibethel/Desktop/LeviBethel_Portfolio/.env to your Stripe test or live key\n' +
      '(with Products & Prices write permission) before running this script.\n'
  );
  process.exit(1);
}

const stripe = new Stripe(apiKey, {
  apiVersion: '2026-03-25.dahlia',
});

const args = process.argv.slice(2);
const shouldWriteEnv = args.includes('--write-env');
const forceRecreate = args.includes('--force');

const FBP_CATALOG_SPECS = [
  {
    milestoneKey: 'launchpad_60',
    envVar: 'STRIPE_PRICE_LAUNCHPAD_60',
    name: 'Fermion Bec Productions — 01. Launchpad Sprint (60% Booking Deposit)',
    description:
      '60% ($5,100 USD) booking deposit to lock 30-day sprint window & Day-2 script lock under the 2-7-21 Production Standard.',
    unitAmount: 510000, // $5,100.00 USD
    currency: 'usd',
    recurring: null,
    engagementTier: '01. Launchpad Sprint ($8,500)',
  },
  {
    milestoneKey: 'launchpad_100',
    envVar: 'STRIPE_PRICE_LAUNCHPAD_100',
    name: 'Fermion Bec Productions — 01. Launchpad Sprint (100% Advance Pre-Pay)',
    description:
      '100% ($8,500 USD) full 30-day sprint advance pre-payment with prioritized post-production turnaround.',
    unitAmount: 850000, // $8,500.00 USD
    currency: 'usd',
    recurring: null,
    engagementTier: '01. Launchpad Sprint ($8,500)',
  },
  {
    milestoneKey: 'flagship_30',
    envVar: 'STRIPE_PRICE_FLAGSHIP_30',
    name: 'Fermion Bec Productions — 02. Flagship Campaign (Option A: 30% Signing Milestone)',
    description:
      '30% ($15,000 USD) signing milestone to lock production dates, 13-person cinema crew, & technical location scout.',
    unitAmount: 1500000, // $15,000.00 USD
    currency: 'usd',
    recurring: null,
    engagementTier: '02. Flagship Campaign ($50,000)',
  },
  {
    milestoneKey: 'flagship_50',
    envVar: 'STRIPE_PRICE_FLAGSHIP_50',
    name: 'Fermion Bec Productions — 02. Flagship Campaign (Option B: 50% Upfront Split)',
    description:
      '50% ($25,000 USD) upfront enterprise split upon contract signing and pre-production initiation.',
    unitAmount: 2500000, // $25,000.00 USD
    currency: 'usd',
    recurring: null,
    engagementTier: '02. Flagship Campaign ($50,000)',
  },
  {
    milestoneKey: 'retainer_4000',
    envVar: 'STRIPE_PRICE_RETAINER_TIER1',
    name: 'Fermion Bec Productions — Tier 01 // Content Infrastructure Retainer',
    description:
      'Monthly commercial retainer ($4,000/mo): 1 dedicated quarterly shoot day, 8 monthly multi-platform video assets, DaVinci Resolve Studio color mastering.',
    unitAmount: 400000, // $4,000.00 USD / month
    currency: 'usd',
    recurring: { interval: 'month' },
    engagementTier: 'The Partnership Ladder — Tier 01',
  },
  {
    milestoneKey: 'retainer_7000',
    envVar: 'STRIPE_PRICE_RETAINER_TIER2',
    name: 'Fermion Bec Productions — Tier 02 // Growth Media Partner Retainer',
    description:
      'Monthly commercial retainer ($7,000/mo): 1 dedicated monthly shoot day, 12 strategic monthly video assets, paid ad hook split-testing, quarterly master brand refresh.',
    unitAmount: 700000, // $7,000.00 USD / month
    currency: 'usd',
    recurring: { interval: 'month' },
    engagementTier: 'The Partnership Ladder — Tier 02',
  },
  {
    milestoneKey: 'retainer_12000',
    envVar: 'STRIPE_PRICE_RETAINER_TIER3',
    name: 'Fermion Bec Productions — Tier 03 // Studio Infrastructure Retainer',
    description:
      'Monthly commercial retainer ($12,000/mo): Complete outsourced video department, bi-weekly multi-camera cinema shoots, executive studio podcast, 72-hour turnaround guarantee.',
    unitAmount: 1200000, // $12,000.00 USD / month
    currency: 'usd',
    recurring: { interval: 'month' },
    engagementTier: 'The Partnership Ladder — Tier 03',
  },
  {
    milestoneKey: 'dooh_local_spotlight',
    envVar: 'STRIPE_PRICE_DOOH_LOCAL_SPOTLIGHT',
    name: 'Fermion Bec Productions — DOOH & Connected TV Add-On: Local Spotlight (1-Wk Flight)',
    description:
      'Programmatic Digital Billboard & Connected TV Outreach Add-On: 1x 30s core + 2x 15s social + 1x 10s DOOH across 2–3 boards (~1,500–2,500 plays).',
    unitAmount: 250000, // $2,500.00 USD
    currency: 'usd',
    recurring: null,
    engagementTier: '03 // Programmatic DOOH & Connected TV Outreach Bucket',
  },
  {
    milestoneKey: 'dooh_regional_takeover',
    envVar: 'STRIPE_PRICE_DOOH_REGIONAL_TAKEOVER',
    name: 'Fermion Bec Productions — DOOH & Connected TV Add-On: Regional Takeover (2-Wk Dayparted)',
    description:
      'Programmatic Digital Billboard & Connected TV Outreach Add-On: 1x 60s hero + 3x social + 2x DOOH ratios across 5–8 boards (~4,000–6,000 plays).',
    unitAmount: 550000, // $5,500.00 USD
    currency: 'usd',
    recurring: null,
    engagementTier: '03 // Programmatic DOOH & Connected TV Outreach Bucket',
  },
  {
    milestoneKey: 'dooh_multi_market',
    envVar: 'STRIPE_PRICE_DOOH_MULTI_MARKET',
    name: 'Fermion Bec Productions — DOOH & Connected TV Add-On: Multi-Market Campaign (30-Day Flight)',
    description:
      'Programmatic Digital Billboard & Connected TV Outreach Add-On: Full localized variants & unlimited live swaps across 15+ boards (~12,000–20,000+ plays).',
    unitAmount: 1200000, // $12,000.00 USD
    currency: 'usd',
    recurring: null,
    engagementTier: '03 // Programmatic DOOH & Connected TV Outreach Bucket',
  },
];

async function findExistingProductAndPrice(spec, existingProducts) {
  const matchedProduct = existingProducts.find(
    (p) => p.active && p.metadata && p.metadata.fbp_milestone_key === spec.milestoneKey
  );
  if (!matchedProduct) return null;

  const prices = await stripe.prices.list({
    product: matchedProduct.id,
    active: true,
    limit: 20,
  });

  const matchedPrice = prices.data.find((pr) => {
    const amountMatches = pr.unit_amount === spec.unitAmount && pr.currency === spec.currency;
    if (!amountMatches) return false;
    if (spec.recurring) {
      return pr.type === 'recurring' && pr.recurring?.interval === spec.recurring.interval;
    }
    return pr.type === 'one_time';
  });

  if (!matchedPrice) return { product: matchedProduct, price: null };
  return { product: matchedProduct, price: matchedPrice };
}

function updateEnvFile(resolvedVars) {
  const envPath = path.resolve(__dirname, '..', '.env');
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

  for (const [envVar, priceId] of Object.entries(resolvedVars)) {
    const regex = new RegExp(`^${envVar}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${envVar}=${priceId}`);
    } else {
      envContent += `\n${envVar}=${priceId}`;
    }
  }

  fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');
  console.log(`\n✓ Updated ${envPath} with all 10 Stripe Price IDs (7 milestones/retainers + 3 DOOH add-ons).`);
}

async function provisionCatalog() {
  console.log('================================================================================');
  console.log('FERMION BEC PRODUCTIONS // STRIPE PRODUCT & PRICE PROVISIONING');
  console.log('================================================================================\n');

  const existingProductsList = await stripe.products.list({ active: true, limit: 100 });
  const existingProducts = existingProductsList.data || [];

  const resolvedEnvVars = {};

  for (const spec of FBP_CATALOG_SPECS) {
    let product = null;
    let price = null;

    if (!forceRecreate) {
      const existing = await findExistingProductAndPrice(spec, existingProducts);
      if (existing?.product) product = existing.product;
      if (existing?.price) price = existing.price;
    }

    if (!product) {
      product = await stripe.products.create({
        name: spec.name,
        description: spec.description,
        metadata: {
          fbp_milestone_key: spec.milestoneKey,
          engagement_tier: spec.engagementTier,
          env_var: spec.envVar,
        },
      });
      console.log(`[CREATED PRODUCT] ${spec.name} (${product.id})`);
    } else {
      console.log(`[REUSED PRODUCT]  ${spec.name} (${product.id})`);
    }

    if (!price) {
      const pricePayload = {
        product: product.id,
        unit_amount: spec.unitAmount,
        currency: spec.currency,
        nickname: spec.name,
        metadata: {
          fbp_milestone_key: spec.milestoneKey,
          env_var: spec.envVar,
        },
      };
      if (spec.recurring) {
        pricePayload.recurring = spec.recurring;
      }
      price = await stripe.prices.create(pricePayload);
      const formattedAmt = `$${(spec.unitAmount / 100).toLocaleString()}${spec.recurring ? '/mo' : ''}`;
      console.log(`  └─ [CREATED PRICE] ${price.id} (${formattedAmt}) -> ${spec.envVar}\n`);
    } else {
      const formattedAmt = `$${(spec.unitAmount / 100).toLocaleString()}${spec.recurring ? '/mo' : ''}`;
      console.log(`  └─ [REUSED PRICE]  ${price.id} (${formattedAmt}) -> ${spec.envVar}\n`);
    }

    resolvedEnvVars[spec.envVar] = price.id;
  }

  console.log('================================================================================');
  console.log('COPY & PASTE THIS BLOCK INTO YOUR .env FILE (or run with --write-env):');
  console.log('================================================================================\n');
  for (const [envVar, priceId] of Object.entries(resolvedEnvVars)) {
    console.log(`${envVar}=${priceId}`);
  }
  console.log('\n================================================================================');

  if (shouldWriteEnv) {
    updateEnvFile(resolvedEnvVars);
  }
}

provisionCatalog().catch((err) => {
  console.error('\n[STRIPE PROVISIONING ERROR]:', err.message);
  process.exit(1);
});
