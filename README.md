# NYCE Knowledge Hub

A clickable Payload CMS prototype for The New York Climate Exchange. Professors and students leave climate-tech research they are not taking forward. Next semester can find it. Ownership and attribution stay on the record.

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

## Five minutes

1. Open **Library**, filter **Water and coasts**, open *Leaving the reef to breathe*. Attribution and the agreement date sit with the file.
2. Stay logged out and open *Term sheet language we were handed*. The page says it exists. The body and file stay closed.
3. Sign in as **Amina Ruiz**, submit leftover research (Fill a sample memo), then open **My submissions**.
4. Sign in as **Jordan Ellis**, open **Admin**, use **Open review queue**, **Publish** or **Send back**.
5. Refresh the library.

## Demo accounts

Shared password: `nyce-demo-2026`

| Role | Email | What to do |
| --- | --- | --- |
| Student | student@nyce.demo | Submit, see sent-back notes |
| Professor | professor@nyce.demo | Browse and submit with a lab |
| Next semester | member@nyce.demo | Open invited work |
| Reviewer | reviewer@nyce.demo | Payload admin |

## What this shows

- Browse and search with a starting taxonomy
- Submit with a draft IP / attribution agreement and a stored record of who agreed and when
- Light review in Payload: publish or send back
- Files grouped in a course, a cohort, or a lab
- Public vs invited. Unpublished files have no public link

## Not in this prototype

Staff chat, Stony Brook / Cognito / Entra login, S3, and the final legal text. Month 1 with Shaina and Megha locks the in/out list, the taxonomy, and the agreement language.

Payload license is $0. After cloud credits, a small US server, database, and documents is about $20–60 a month. Chat only if you turn it on.
