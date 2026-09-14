// Payment backend base URL for the 近期事件推演 (NT$99) unlock.
//
// Leave this EMPTY until the Cloudflare Worker in worker/ has been
// deployed AND verified end-to-end against real NewebPay test
// credentials (see worker/README.md). While empty, the site shows its
// current honest "not yet available" state and nothing is charged.
//
// Once ready, set it to your deployed Worker URL or custom domain, e.g.:
//   window.PAYMENT_API_BASE = 'https://bazi-payments-api.<your-subdomain>.workers.dev';
window.PAYMENT_API_BASE = '';
// Public Apps Script receiver: anyone may submit; the connected Sheet remains private.
window.GOOGLE_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwQays7VXDfBcezyhTaNSZOu9rnLautHD_edsp-HoyFv9yCGR5wQxqxIunbpq_tVQgh/exec';
