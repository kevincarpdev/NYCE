# NYCE Knowledge Hub

A clickable Payload CMS prototype for The New York Climate Exchange. Professors and students leave climate-tech research they are not taking forward. Next semester can find it. Ownership and attribution stay on the record. People can iterate on a leftover together. An assistant can propose edits. A reviewer publishes.

This is a walkthrough of the approach, not the finished library, and not a rebuild of [nyce.org](https://nyce.org).

## Run it

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Payload admin is at [http://localhost:3000/admin](http://localhost:3000/admin).

The first boot seeds sample research. To reset:

```bash
pnpm seed
pnpm dev
```

Optional: set `OPENAI_API_KEY` in `.env` so the leftover assistant uses a hosted model. Without a key it still proposes edits, so the walkthrough works on a cheap Hetzner box.

## Five minutes

1. Open **Library**, filter **Water and coasts**, open *Leaving the reef to breathe*. Attribution, the handoff, leftover sections, and the PDF preview sit on the page.
2. Stay logged out and open *Term sheet language we were handed*. The page says it exists. The body and file stay closed.
3. Open **Sign in**. Choose **Amina Ruiz** (Student) and continue. That lands in the leftover workspace. Leave a note. Ask the assistant to tighten the summary. Accept the suggested edit.
4. Sign in as **Dr. Priya Raman** in another window. Both names show on the leftover. If you save at the same time, Payload keeps the first version.
5. Sign in as **Jordan Ellis** (Reviewer). That opens the Payload admin. Use **Open review queue**, **Publish** or **Send back**. Refresh the library. `/admin` also sends reviewers through this same branded sign-in.

## Demo accounts

Shared password: `nyce-demo-2026`

| Role | Email | What to do |
| --- | --- | --- |
| Student | student@nyce.demo | Submit, iterate, see sent-back notes |
| Professor | professor@nyce.demo | Edit a leftover with a student |
| Next semester | member@nyce.demo | Open invited work, comment, propose |
| Reviewer | reviewer@nyce.demo | Payload admin |

## What this shows

- Browse and search with a starting taxonomy
- Submit with a draft IP / attribution agreement and a stored record of who agreed and when
- Light review in Payload: publish or send back
- Files grouped in a course, a cohort, or a lab
- Public vs invited. Unpublished files have no public link
- Workspace: file preview, notes, suggested edits, versions, who is here
- Assistant that proposes field changes instead of silently overwriting

## Hetzner

A small Ubuntu VPS (CX22 is enough) plus a domain A record. From the repo:

```bash
cp .env.example .env
# Set PAYLOAD_SECRET, HUB_DOMAIN, NEXT_PUBLIC_SERVER_URL=https://your.domain
docker compose -f deploy/docker-compose.yml up -d --build
```

Caddy terminates HTTPS. SQLite and uploads live in a Docker volume. First boot seeds the sample library. Put that `https://` URL in the proposal to Shaina.

## Not in this prototype

University SSO, S3, and the final legal text. Month 1 with Shaina and Megha locks the in/out list, the taxonomy, and the agreement language.

Payload license is $0. A small Hetzner box, backups, and a domain is the $20–60/month path already quoted. A hosted model is only if you set an API key.
