# Content inventory and open questions

Sources reviewed in full (`Desktop/pr data/adityashukla`): `CV Aditya.pdf` (4 pp, text), `Aditya_Shukla.pdf` (5 pp, scanned Hindi/English biodata), `ADITYA SHUKLA JI.pdf` (6 pp, scanned Hindi autobiography), and 53 photographs. No videos were supplied.

## Conflicts that need the client's confirmation

| # | Item | Version A | Version B | What the site shows now |
|---|------|-----------|-----------|--------------------------|
| 1 | LL.M. institution | CV: JNU | Biodata: Jagannath University, Jaipur | **Resolved by client:** Jagannath University, Jaipur |
| 2 | Ministry start date | CV: 7 July 2021 | Biodata: 8 July 2021 | "July 2021 – June 2024" (end: CV "June 2024", biodata 24 June 2024) |
| 3 | Ananya Foundation role | CV: Founder | Biodata: National Treasurer (राष्ट्रीय कोषाध्यक्ष) | **Resolved by client:** Founder |
| 4 | Email | A second personal address appears in the CV and autobiography (kept private) | dradityashuklaofficial@gmail.com (biodata) | **Resolved by client:** dradityashuklaofficial@gmail.com published (Contact page, footer) |
| 5 | Home address | CV/autobiography: MM D1, 520, J/276, LDA Colony | Biodata: C-10 B, Shri Ram Enclave, Sector D-1 | Not published |
| 6 | 3rd Amity Moot Court | CV item 4: 2018 | CV item 11: "2016 … 9–11 March 2018" | Shown as 9–11 March 2018 |
| 7 | Railway committee end | CV: Dec 2021 | Biodata: "2019–21" | "2019–2021" |

## To verify before launch
- Whether GMA Infra Pvt Ltd (Director) and Aarnaa Enterprises (Chief Legal Advisor) are still current. The CV lists them as current employment; the site states the roles without the word "current".
- The basis for the title "Dr." (the CV records an honorary doctorate, Honoris Causa, from B V University for Peace and Education). Confirm the preferred wording.
- The NAREDCO appointment (3 August 2025) is from the biodata only; the CV does not mention it.
- BJP Yuva Morcha: the biodata cover names it. The site states only party membership (2012) and legal-specialist work (2014 onward). Confirm if the Yuva Morcha role should be listed.

## Deliberately not published
Mobile number (client chose to keep it private), date of birth, parents' names, marital status, religion, residential address, the second email address, and the autobiography's personal statement of belief (not a message approved for this site). Photo #40 (house nameplate with address) is excluded.

## Still needed from the client
1. (Removed) The President's Message page was taken off the site on request. Its text and page can be restored from version history if it is wanted again.
2. Official office address, office telephone, social profiles, approved monogram or logo.
3. Ananya Foundation project records and approved photographs. None were in the material supplied.
4. NAREDCO Uttar Pradesh programme details.
5. A higher-resolution portrait. The hero portrait is 683×1024; a larger original will look sharper.
6. Videos, if any (add to `videos` in `src/content/media.ts`; the Video filter appears automatically).
7. Identified names and dates for photographs. Captions are descriptive only; nobody in a photo is named.
8. Contact form delivery: set `CONTACT_WEBHOOK_URL`. Until then the form reports that sending failed.
9. Set `SITE_URL` to the production domain (used for canonical, hreflang, sitemap, Open Graph).

## Photo inventory (53 supplied → 36 published)
- Hero/portraits: #02 (flags, chosen for hero), #09 (conference lobby), #43 (summit), #03–#06 (Supreme Court, advocate attire).
- Industry: #43, #44, #46, #47 (NAREDCO Maharashtra Real Estate & Infrastructure Investors' Summit 2026), #39 (expo ribbon-cutting).
- NAREDCO memento presentations: #08, #10, #51, #52.
- Conference/academic: #00 (convocation ceremony).
- Government offices, official meetings, party-office photographs: the remainder of the published set.
- Near-duplicates: #25/#32 (same moment), #03–#05 (same series), #43/#47 (same summit backdrop).
- Left out: #40 (private address), #28 (collage), #01 and #42 (temple visits), selfies and low-value frames.
- Scanned PDF pages were not used as photography; individual originals were used instead.

## Cross-check against naredcouttarpradesh.in (the chapter's own site)
- **Confirmed:** the Governance page lists Dr. Aditya Shukla as President under State Office Bearers. It gives **no appointment date**, so "3 August 2025" still rests on the biodata alone.
- **Used:** office bearers list (Leadership page), chapter office address, phone and two emails (Contact page), chapter social profiles (Contact page, Stay Connected), the "under the aegis of the Ministry of Housing and Urban Affairs" wording from the Governing Council backdrop, and four images in `scripts/naredco-source/` (official portrait, UP Real Estate Summit 2026, Mahi Convention, 2nd Governing Council Meeting).
- **Not used:** ET Government Infrastructure Conclave 2026 (he is not visible in its photograph and the event page does not name him).
- **Date conflict on their site:** the 5th NAREDCO Mahi Convention is listed as 19–20 June 2025 but its banner reads "June 2026". No date is shown on this site.
- **Verify before launch:** office bearers change; re-check the Governance page. The chapter's Facebook link is a profile ID URL, so the live-posts panel cannot embed it (link only). The official portrait is only 400×480 px; ask the chapter for a larger original.
- **Permission:** these images were downloaded from the chapter's website. Confirm NAREDCO Uttar Pradesh is happy for them to appear on this site.
