# endive-web

Endive Limited's company page and email forwarder, both Workers on the Endive Cloudflare account (`52e65a2366c205fa0ea36ef06adf6262`). Private repo; moves to the company GitHub organisation when it exists.

| Folder | Worker | What |
|---|---|---|
| `site/` | `endive-website` | The one-page company site on `endive.ie` and `www.endive.ie`: Tab and Soft Spot, the name story, the s.151 company particulars, contact hello@endive.ie |
| `email-forwarder/` | `endive-hello-forward` | Copies mail for hello@endive.ie, admin@endive.ie and hello@softspotgifts.com to both founders' Gmails |

## Deploy

- **Site:** automatic. Cloudflare Workers Builds is connected to this repo (27 Oct 2026): every push to `main` runs
  `npx wrangler deploy` in `site/` and updates `endive.ie` and `www.endive.ie`. Other branches only upload preview versions, and Preview URLs are off, so nothing but `main` reaches the domains.
- **Email forwarder:** by hand only, never on push, because it carries the founders' mail. From `email-forwarder/`:
  `npx wrangler login` as a member of the Endive account, then `npx wrangler deploy`. Send a test email to
  hello@endive.ie and admin@endive.ie straight after.

## Rules

- Only registered business names appear as brands or trading names on the site (Tab and Soft Spot; Foundry once its RBN1 is filed, decision 26 Oct 2026).
- The footer keeps the s.151 particulars: name, "private company limited by shares", registered in Ireland, number 828414, registered office.
- No secrets in this repo. The forwarder needs none; both destination Gmails must stay verified under Email Routing, Destination addresses.
- The forwarder source was recovered from the deployed Worker on 27 Oct 2026; Mark wrote it.
