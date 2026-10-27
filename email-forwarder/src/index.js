/**
 * Endive's "both founders" forwarder.
 *
 * Cloudflare Email Routing sends one address to one destination, so the
 * routing rules for hello@endive.ie, admin@endive.ie and
 * hello@softspotgifts.com send mail here, and this Worker forwards a copy to
 * each founder. Both addresses must stay verified under Email Routing >
 * Destination addresses in the Endive Cloudflare account, or forward() fails.
 *
 * Recovered from the deployed Worker (Endive Cloudflare account) on 27 Oct 2026.
 */

// ---------- Recipients ----------
const RECIPIENTS = ["markturley123@gmail.com", "thomaspaulharan@gmail.com"];

// ---------- Email handler ----------
export default {
  async email(message) {
    const results = await Promise.allSettled(
      RECIPIENTS.map((to) => message.forward(to)),
    );
    const failed = results.filter((r) => r.status === "rejected");
    // If nobody got it, bounce so the sender knows; if one copy failed, keep the other.
    if (failed.length === RECIPIENTS.length) {
      message.setReject("Delivery failed, please try again later.");
    }
  },
};
