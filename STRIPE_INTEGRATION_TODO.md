# Stripe Checkout Embedded Form Integration TODO

This file is the single source of truth for completing your **Stripe Checkout Embedded Form** (`ui_mode: "form"`, API version `2026-03-25.dahlia`) integration across `server.js`, `js/stripe-checkout.js`, `scripts/setup-stripe-products.js`, and `proposal.html`.

## Values to Replace

Replace every `sample_only` placeholder and environment variable in `.env` with your real values from the [Stripe Dashboard](https://dashboard.stripe.com) (or auto-generate all 10 Price IDs using `npm run stripe:setup:write`) before going live:

| Parameter / Variable | File | Location | Current Placeholder | How to Get the Real Value |
| :--- | :--- | :--- | :--- | :--- |
| `STRIPE_PUBLISHABLE_KEY` | `.env` | Line 3 | `pk_test_...` | Copy your Publishable Key (`pk_test_...` or `pk_live_...`) from **Developers → API keys** in the [Stripe Dashboard](https://dashboard.stripe.com/apikeys). `server.js` exposes this safely at `GET /api/stripe-config`. |
| `STRIPE_SECRET_KEY` | `.env` | Line 4 | `sk_test_...` | Copy your Restricted API Key (`rk_test_...` / `rk_live_...`, recommended per Stripe security best practices) or Secret Key (`sk_test_...` / `sk_live_...`) from **Developers → API keys** in the [Stripe Dashboard](https://dashboard.stripe.com/apikeys). Never commit real secret keys to git. |
| `STRIPE_WEBHOOK_SECRET` | `.env` | Line 5 | `whsec_...` | Copy the signing secret from `stripe listen --forward-to localhost:4242/api/webhook` for local testing, or from **Developers → Webhooks** in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks). |
| `STRIPE_PRICE_LAUNCHPAD_60` | `.env` / `server.js` | `MILESTONE_CATALOG.launchpad_60` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$5,100 USD** one-time Price for **01. Launchpad Sprint — 60% Booking Deposit** (`mode: 'payment'`), or copy from [Stripe Products](https://dashboard.stripe.com/products). |
| `STRIPE_PRICE_LAUNCHPAD_100` | `.env` / `server.js` | `MILESTONE_CATALOG.launchpad_100` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$8,500 USD** one-time Price for **01. Launchpad Sprint — 100% Advance Pre-Pay** (`mode: 'payment'`). |
| `STRIPE_PRICE_FLAGSHIP_30` | `.env` / `server.js` | `MILESTONE_CATALOG.flagship_30` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$15,000 USD** one-time Price for **02. Flagship Campaign — 30% Signing Milestone** (`mode: 'payment'`). |
| `STRIPE_PRICE_FLAGSHIP_50` | `.env` / `server.js` | `MILESTONE_CATALOG.flagship_50` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$25,000 USD** one-time Price for **02. Flagship Campaign — 50% Upfront Split** (`mode: 'payment'`). |
| `STRIPE_PRICE_RETAINER_TIER1` | `.env` / `server.js` | `MILESTONE_CATALOG.retainer_4000` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$4,000 USD / month** recurring Price for **Tier 01 // Content Infrastructure Retainer** (`mode: 'subscription'`). |
| `STRIPE_PRICE_RETAINER_TIER2` | `.env` / `server.js` | `MILESTONE_CATALOG.retainer_7000` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$7,000 USD / month** recurring Price for **Tier 02 // Growth Media Partner Retainer** (`mode: 'subscription'`). |
| `STRIPE_PRICE_RETAINER_TIER3` | `.env` / `server.js` | `MILESTONE_CATALOG.retainer_12000` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$12,000 USD / month** recurring Price for **Tier 03 // Studio Infrastructure Retainer** (`mode: 'subscription'`). |
| `STRIPE_PRICE_DOOH_LOCAL_SPOTLIGHT` | `.env` / `server.js` | `DOOH_ADDON_CATALOG.local_spotlight` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$2,500 USD** one-time Price for **DOOH Local Spotlight (1-Wk Flight)** (falls back to inline `price_data` if unset). |
| `STRIPE_PRICE_DOOH_REGIONAL_TAKEOVER` | `.env` / `server.js` | `DOOH_ADDON_CATALOG.regional_takeover` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$5,500 USD** one-time Price for **DOOH Regional Takeover (2-Wk Dayparted)** (falls back to inline `price_data` if unset). |
| `STRIPE_PRICE_DOOH_MULTI_MARKET` | `.env` / `server.js` | `DOOH_ADDON_CATALOG.multi_market` | `price_...` | Run `npm run stripe:setup:write` to auto-create the **$12,000 USD** one-time Price for **DOOH Multi-Market Campaign (30-Day Flight)** (falls back to inline `price_data` if unset). |

## Configured Parameters

The following `fixed_by_ui` parameters and client-side appearance settings were configured in Checkout Studio and are wired directly into `server.js`, `js/stripe-checkout.js`, and `proposal.html`:

| Parameter | Scope | Configured Value |
| :--- | :--- | :--- |
| `apiVersion` | Server (`server.js` & `scripts/setup-stripe-products.js`) | `'2026-03-25.dahlia'` |
| `ui_mode` | Server (`server.js`) | `'form'` |
| `billing_address_collection` | Server (`server.js`) | `'required'` |
| `phone_number_collection` | Server (`server.js`) | `{ enabled: false }` |
| `automatic_tax` | Server (`server.js`) | `{ enabled: true }` |
| `payment_method_collection` | Server (`server.js`) | `'always'` (automatically included when `mode === 'subscription'` for Partnership Ladder retainers; omitted when `mode === 'payment'`) |
| `submit_type` | Server (`server.js`) | `'auto'` |
| `name_collection` | Server (`server.js`) | `{ individual: { enabled: true }, business: { enabled: true } }` |
| `saved_payment_method_options` | Server (`server.js`) | `{ payment_method_save: 'enabled' }` |
| `integration_identifier` | Server (`server.js`) | `'custom_embedded_web_0001'` |
| `line_items` (Dynamic 2nd Line Item) | Server (`server.js`) | Primary milestone/retainer Price (`line_items[0]`) plus optional DOOH & Connected TV Add-On (`line_items[1]`) when selected in `proposal.html` |
| `client_reference_id` & `metadata` | Server (`server.js`) | Dynamically binds the signed contract's `auditRef` (`FBP-CSA-...`), `client_company`, `signatory_name`, `milestone_key`, `dooh_addon`, and `dooh_addon_key` |
| `layout` | Client (`proposal.html` / `js/stripe-checkout.js`) | `'expanded'` (`checkout.createForm({ layout: 'expanded' })`) |
| `appearance` | Client (`proposal.html` / `js/stripe-checkout.js`) | `theme: 'night'`, `labels: 'auto'`, `inputs: 'spaced'`, `colorBackground: '#0a0000'`, `colorPrimary: '#0570de'`, `colorSuccess: '#00c853'`, `colorDanger: '#df1b41'`, `colorText: '#e5e5e5'`, `borderRadius: '4px'`, `fontSizeBase: '16px'`, `spacingUnit: '4px'` |

## Setup and Next Steps

### 1. Environment Variables & Automated Catalog Provisioning
1. Open `.env` in `/Users/levibethel/Desktop/LeviBethel_Portfolio/.env` and set `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` (ensure the key has **Products** and **Prices** write permissions if using a Restricted API Key).
2. Install dependencies and run the automated catalog provisioning script to create all 10 Products and Prices (7 milestones/retainers + 3 DOOH add-ons) in your Stripe account and write their `price_...` IDs directly into `.env`:
   ```bash
   npm install stripe express dotenv
   npm run stripe:setup:write
   ```
   *(To preview the `.env` output in the terminal without modifying `.env`, run `npm run stripe:setup`.)*

### 2. Stripe Tax & Dynamic Payment Method Verification
- **Stripe Tax (`automatic_tax: { enabled: true }`)**: In [Stripe Dashboard → Settings → Tax](https://dashboard.stripe.com/settings/tax), verify your head office origin address (`1206 Green View Way, Toms River, NJ 08753`) and active tax registrations in New Jersey and any other states where you have nexus.
- **Dynamic Payment Methods (ACH Direct Debit & Cards)**: `payment_method_types` is intentionally omitted from `stripe.checkout.sessions.create(...)` so Stripe dynamically renders eligible payment methods configured in [Stripe Dashboard → Settings → Payment methods](https://dashboard.stripe.com/settings/payment_methods). Enable **US bank account (ACH Direct Debit)** (0.8% fee capped at $5.00), **Cards**, and **Apple Pay** there.

### 3. Testing Locally with Stripe Test Cards
- Start the server with `npm start` (`node server.js` on `http://localhost:4242`).
- Forward webhooks locally:
  ```bash
  stripe listen --forward-to localhost:4242/api/webhook
  ```
- **Success test card**: `4242 4242 4242 4242` (any future expiration date, any 3-digit CVC).
- **Declined test card**: `4000 0000 0000 0002`
- **3D Secure authentication required**: `4000 0000 0000 3063`

### 4. Additional Resources
- **Stripe Support**: [https://support.stripe.com](https://support.stripe.com)
- **Stripe Docs & MCP Server**: [https://docs.stripe.com/mcp](https://docs.stripe.com/mcp)
