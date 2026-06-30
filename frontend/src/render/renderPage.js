import { faqItems } from "../data/faq.js";
import { schedule, scheduleTimeSlots } from "../data/schedule.js";
import { siteConfig, isPlaceholder, isVerifiedUrl } from "../data/siteConfig.js";
import { trainingTypes } from "../data/trainingTypes.js";
import { whyBeostarBlocks } from "../data/whyBeostar.js";

const sectionLabels = {
  trainings: "GRUPNI I PERSONALNI RAD",
  schedule: "RASPORED",
  why: "ZAŠTO BEOSTAR",
  location: "LOKACIJA",
  contact: "KONTAKT",
  faq: "FAQ"
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderMetaTag(name, content, property = false) {
  const key = property ? "property" : "name";
  return `<meta ${key}="${escapeHtml(name)}" content="${escapeHtml(content)}">`;
}

function serializeJsonForScript(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function renderHead() {
  const siteUrlIsVerified = isVerifiedUrl(siteConfig.siteUrl);
  const ogImage = siteUrlIsVerified
    ? `${siteConfig.siteUrl}/logo_orange_background_white_text.jpg`
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: siteConfig.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.countryCode
    },
    url: siteConfig.siteUrl,
    sameAs: [siteConfig.tiktokUrl]
  };

  if (isVerifiedUrl(siteConfig.instagramUrl)) {
    jsonLd.sameAs.push(siteConfig.instagramUrl);
  }

  const jsonLdString = serializeJsonForScript(jsonLd);

  return `<!doctype html>
<html lang="sr-Latn-RS">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(siteConfig.title)}</title>
    ${renderMetaTag("description", siteConfig.metaDescription)}
    ${renderMetaTag("theme-color", "#111111")}
    ${renderMetaTag("og:title", siteConfig.ogTitle, true)}
    ${renderMetaTag("og:description", siteConfig.ogDescription, true)}
    ${renderMetaTag("og:type", "website", true)}
    ${renderMetaTag("og:locale", "sr_RS", true)}
    ${siteUrlIsVerified ? renderMetaTag("og:url", siteConfig.siteUrl, true) : "<!-- TODO: add production domain to enable og:url -->"}
    ${siteUrlIsVerified ? renderMetaTag("og:image", ogImage, true) : ""}
    ${renderMetaTag("twitter:card", "summary_large_image")}
    ${siteUrlIsVerified ? `<link rel="canonical" href="${escapeHtml(siteConfig.siteUrl)}">` : "<!-- TODO: set siteUrl in src/data/siteConfig.js before production launch -->"}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles/global.css">
    <script type="application/ld+json">${jsonLdString}</script>
  </head>
  <body>
${renderBody()}
  </body>
</html>`;
}

function renderBody() {
  return `    <a class="skip-link" href="#glavni-sadrzaj">Preskoči na sadržaj</a>
    <div class="site-shell" id="vrh">
      ${renderHeader()}
      <main id="glavni-sadrzaj">
        ${renderHero()}
        ${renderTrainingTypes()}
        ${renderSchedule()}
        ${renderWhyBeostar()}
        ${renderLocation()}
        ${renderSocialContact()}
        ${renderFaq()}
      </main>
      ${renderFooter()}
    </div>
    ${renderMiniBoardScript()}`;
}

function renderHeader() {
  return `      <header class="site-header">
        <div class="top-stamp" aria-hidden="true">${renderStampLine()}</div>
        <div class="header-bar">
          <a class="brand-lockup" href="#vrh" aria-label="Beostar Gym početna sekcija">
            <img src="${siteConfig.images.logo.src}" alt="${escapeHtml(siteConfig.images.logo.alt)}" width="54" height="54">
            <span>
              <strong>${escapeHtml(siteConfig.name)}</strong>
              <small>${escapeHtml(siteConfig.motto)}</small>
            </span>
          </a>
          <nav class="desktop-nav" aria-label="Glavna navigacija">
            <a href="#raspored">Raspored</a>
            <a href="#treninzi">Treninzi</a>
            <a href="#lokacija">Lokacija</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <a class="header-cta" href="#kontakt">Piši nam</a>
          <details class="mobile-nav">
            <summary>Menu</summary>
            <nav aria-label="Mobilna navigacija">
              <a href="#raspored">Raspored</a>
              <a href="#treninzi">Treninzi</a>
              <a href="#lokacija">Lokacija</a>
              <a href="#kontakt">Kontakt</a>
              <a href="#kontakt">Piši nam</a>
            </nav>
          </details>
        </div>
      </header>`;
}

function renderHero() {
  const fallbackDay = schedule[0];

  return `        <section class="hero section-frame" aria-labelledby="hero-title">
          <div class="hero-grid">
            <div class="hero-copy">
              <p class="section-label">${escapeHtml(siteConfig.heroLabel)}</p>
              <div class="stamp-chip">${escapeHtml(siteConfig.motto)} ★</div>
              <h1 id="hero-title">${escapeHtml(siteConfig.heroTitle)}</h1>
              <p class="hero-text">${escapeHtml(siteConfig.heroDescription)}</p>
              <div class="location-strip">
                <span class="slash-mark">//</span>
                <strong>${escapeHtml(siteConfig.address)}</strong>
                <span>${escapeHtml(siteConfig.city)}</span>
              </div>
              <div class="hero-actions">
                <a class="button button-primary" href="#raspored">Pogledaj raspored</a>
                <a class="button button-secondary" href="#kontakt">Piši nam za prvi trening</a>
              </div>
              <ul class="hero-meta" aria-label="Brze informacije">
                <li>GRUPNI TRENINZI</li>
                <li>PERSONALNI RAD</li>
                <li>NOVI BEOGRAD</li>
                <li>${escapeHtml(siteConfig.address)}</li>
              </ul>
            </div>
            <div class="hero-poster" aria-label="Vizuelni pregled Beostar Gym prostora">
              <div class="poster-panel poster-panel-main">
                <figure>
                  <img src="${siteConfig.images.heroMain.src}" alt="${escapeHtml(siteConfig.images.heroMain.alt)}" width="772" height="570" fetchpriority="high">
                </figure>
              </div>
              <div class="poster-panel poster-panel-inset">
                <figure>
                  <img src="${siteConfig.images.heroInset.src}" alt="${escapeHtml(siteConfig.images.heroInset.alt)}" width="815" height="567">
                </figure>
              </div>
              <div class="hero-tags" aria-label="Vrste treninga">
                ${siteConfig.trainingTags
                  .map((tag) => `<span>${escapeHtml(tag)}</span>`)
                  .join("")}
              </div>
              ${renderMiniBoard(fallbackDay)}
              <div class="hero-watermark" aria-hidden="true">★</div>
            </div>
          </div>
        </section>`;
}

function renderMiniBoard(activeDay) {
  return `<aside class="mini-board" aria-label="Današnji raspored" data-mini-board>
                <p class="mini-board__label">DANAŠNJI RITAM</p>
                <h2 data-mini-board-day>${escapeHtml(activeDay.day)}</h2>
                <ul data-mini-board-list>
                  ${activeDay.sessions
                    .map(
                      (session) =>
                        `<li><strong>${escapeHtml(session.time)}</strong><span>${escapeHtml(session.title)}</span></li>`
                    )
                    .join("")}
                </ul>
              </aside>`;
}

function renderTrainingTypes() {
  const layouts = [
    "training-card--accent",
    "training-card--tall",
    "",
    "training-card--diagonal",
    "",
    "training-card--accent",
    "training-card--wide",
    "training-card--wide training-card--paper"
  ];

  return `        <section class="section-frame trainings-section" id="treninzi" aria-labelledby="treninzi-title">
          <div class="section-copy">
            <p class="section-label">${sectionLabels.trainings}</p>
            <h2 id="treninzi-title">TRENINZI KOJI IMAJU RITAM</h2>
            <p>Trening nije prepušten slučaju. Dolaziš u termin, trener vodi ritam, a grupa drži energiju.</p>
          </div>
          <div class="trainings-grid">
            ${trainingTypes
              .map((training, index) => {
                const cardClass = layouts[index] || "";
                const ordinal = String(index + 1).padStart(2, "0");

                return `<article class="training-card ${cardClass}">
                  <p class="training-card__label">${ordinal} / ${escapeHtml(sectionLabels.trainings)}</p>
                  <h3>${escapeHtml(training.name)}</h3>
                  <p>${escapeHtml(training.description)}</p>
                  <div class="training-card__stamp">★ ${escapeHtml(siteConfig.motto)}</div>
                </article>`;
              })
              .join("")}
          </div>
        </section>`;
}

function renderScheduleTable() {
  return `<table class="schedule-table">
    <caption>Raspored Beostar Gym treninga po danima i terminima.</caption>
    <thead>
      <tr>
        <th scope="col">Vreme</th>
        ${schedule.map((day) => `<th scope="col">${escapeHtml(day.day)}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${scheduleTimeSlots
        .map(
          (slot) => `<tr>
            <th scope="row">${escapeHtml(slot)}</th>
            ${schedule
              .map((day) => {
                const session = day.sessions.find((item) => item.time === slot);

                return `<td>${session ? `<span class="session-pill">${escapeHtml(session.title)}</span>` : '<span class="session-empty">—</span>'}</td>`;
              })
              .join("")}
          </tr>`
        )
        .join("")}
    </tbody>
  </table>`;
}

function renderScheduleCards() {
  return `<div class="schedule-cards" aria-label="Mobilni raspored">
    ${schedule
      .map(
        (day) => `<article class="schedule-card">
          <p class="schedule-card__label">${escapeHtml(day.fullDay)}</p>
          <h3>${escapeHtml(day.day)}</h3>
          <ul>
            ${day.sessions
              .map(
                (session) =>
                  `<li><strong>${escapeHtml(session.time)}</strong><span>${escapeHtml(session.title)}</span></li>`
              )
              .join("")}
          </ul>
        </article>`
      )
      .join("")}
  </div>`;
}

function renderSchedule() {
  return `        <section class="section-frame schedule-section" id="raspored" aria-labelledby="raspored-title">
          <div class="schedule-header">
            <div class="section-copy">
              <p class="section-label">${sectionLabels.schedule}</p>
              <h2 id="raspored-title">RASPORED TRENINGA</h2>
              <p>Izaberi dan, proveri termin i dođi spreman. Centralni raspored ostaje u tekstu, ne u slici.</p>
            </div>
            <div class="schedule-side-stamp">
              <span>${escapeHtml(siteConfig.motto)}</span>
              <span>${escapeHtml(siteConfig.address)}</span>
            </div>
          </div>
          <div class="schedule-board">
            ${renderScheduleTable()}
            ${renderScheduleCards()}
          </div>
          <p class="schedule-disclaimer">${escapeHtml(siteConfig.scheduleDisclaimer)}</p>
        </section>`;
}

function renderWhyBeostar() {
  return `        <section class="section-frame why-section" aria-labelledby="zasto-title">
          <div class="why-copy">
            <p class="section-label">${sectionLabels.why}</p>
            <h2 id="zasto-title">${escapeHtml(siteConfig.whyTitle)}</h2>
            <p>${escapeHtml(siteConfig.whyDescription)}</p>
            <div class="brand-tape" aria-hidden="true">${renderStampLine()}</div>
          </div>
          <div class="why-layout">
            ${whyBeostarBlocks
              .map(
                (block, index) => `<article class="why-card why-card--${index + 1}">
                <p class="why-card__label">0${index + 1} / BEOSTAR</p>
                <h3>${escapeHtml(block.title)}</h3>
                <p>${escapeHtml(block.description)}</p>
              </article>`
              )
              .join("")}
            <figure class="why-image">
              <img src="${siteConfig.images.approach.src}" alt="${escapeHtml(siteConfig.images.approach.alt)}" width="780" height="567" loading="lazy" decoding="async">
              <figcaption>Vođeni ritam, crna baza, narandžasti detalji.</figcaption>
            </figure>
          </div>
        </section>`;
}

function renderLocation() {
  const hasVerifiedMap = isVerifiedUrl(siteConfig.googleMapsUrl);
  const mapUrl = hasVerifiedMap
    ? siteConfig.googleMapsUrl
    : siteConfig.googleMapsSearchUrl;
  const mapNote = hasVerifiedMap
    ? "Otvara potvrđeni link za lokaciju."
    : "Link vodi na Google Maps pretragu za “Beostar Gym Jurija Gagarina 78”.";

  return `        <section class="section-frame location-section" id="lokacija" aria-labelledby="lokacija-title">
          <div class="location-layout">
            <div class="location-copy">
              <p class="section-label">${sectionLabels.location}</p>
              <h2 id="lokacija-title">${escapeHtml(siteConfig.locationTitle)}</h2>
              <address>
                <strong>${escapeHtml(siteConfig.address)}</strong>
                <span>${escapeHtml(siteConfig.city)}</span>
              </address>
              <div class="location-strip location-strip--wide">
                <span class="slash-mark">//</span>
                <span>JURIJA GAGARINA 78</span>
                <span>BEOSTAR GYM</span>
              </div>
              <a class="button button-primary" href="${escapeHtml(mapUrl)}" target="_blank" rel="noreferrer noopener">Otvori mapu</a>
              <p class="supporting-note">${escapeHtml(mapNote)}</p>
            </div>
            <figure class="location-image">
              <img src="${siteConfig.images.location.src}" alt="${escapeHtml(siteConfig.images.location.alt)}" width="782" height="570" loading="lazy" decoding="async">
            </figure>
          </div>
        </section>`;
}

function renderSocialContact() {
  const hasInstagram = isVerifiedUrl(siteConfig.instagramUrl);
  const primaryContactUrl = hasInstagram
    ? siteConfig.instagramUrl
    : siteConfig.tiktokUrl;

  return `        <section class="section-frame social-section" id="kontakt" aria-labelledby="kontakt-title">
          <div class="social-copy">
            <p class="section-label">${sectionLabels.contact}</p>
            <h2 id="kontakt-title">PIŠI NAM ZA PRVI TRENING</h2>
            <p>Prati raspored i obaveštenja, pogledaj objave i javi se pre dolaska preko Instagrama ili TikTok-a.</p>
            <div class="social-actions">
              <a class="button button-primary" href="${escapeHtml(primaryContactUrl)}" target="_blank" rel="noreferrer noopener">Piši nam za prvi trening</a>
              <a class="button button-secondary" href="${escapeHtml(siteConfig.tiktokUrl)}" target="_blank" rel="noreferrer noopener">Pogledaj objave</a>
            </div>
          </div>
          <div class="social-board">
            <article class="social-card social-card--live">
              <p class="social-card__label">TIKTOK / AKTIVAN LINK</p>
              <h3>@beostargym</h3>
              <p>Prati raspored i obaveštenja preko zvaničnog TikTok profila.</p>
              <a href="${escapeHtml(siteConfig.tiktokUrl)}" target="_blank" rel="noreferrer noopener">Otvori TikTok</a>
            </article>
            ${hasInstagram
              ? `<article class="social-card social-card--todo">
              <p class="social-card__label">INSTAGRAM / PORUKE I OBJAVE</p>
              <h3>@beostar_gym</h3>
              <p>Zapratite profil, proverite objave i pošaljite poruku pre prvog dolaska.</p>
              <a href="${escapeHtml(siteConfig.instagramUrl)}" target="_blank" rel="noreferrer noopener">Otvori Instagram</a>
            </article>`
              : ""}
          </div>
        </section>`;
}

function renderFaq() {
  return `        <section class="section-frame faq-section" aria-labelledby="faq-title">
          <div class="section-copy">
            <p class="section-label">${sectionLabels.faq}</p>
            <h2 id="faq-title">PITANJA PRE DOLASKA</h2>
            <p>Odgovori su namerno kratki i zasnovani samo na potvrđenim informacijama.</p>
          </div>
          <div class="faq-list">
            ${faqItems
              .map(
                (item) => `<details class="faq-item">
                <summary>${escapeHtml(item.question)}</summary>
                <p>${escapeHtml(item.answer)}</p>
              </details>`
              )
              .join("")}
          </div>
        </section>`;
}

function renderFooter() {
  const hasInstagram = isVerifiedUrl(siteConfig.instagramUrl);

  return `      <footer class="site-footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <p class="section-label">BEOSTAR GYM</p>
            <h2>${escapeHtml(siteConfig.motto)}</h2>
            <p>${escapeHtml(siteConfig.footerCopy)}</p>
          </div>
          <div class="footer-block">
            <h3>ADRESA</h3>
            <address>
              <span>${escapeHtml(siteConfig.address)}</span>
              <span>${escapeHtml(siteConfig.city)}</span>
            </address>
          </div>
          <div class="footer-block">
            <h3>TRENINZI</h3>
            <p>CrossFit / Yoga / Pilates / Box</p>
          </div>
          <div class="footer-block">
            <h3>DRUŠTVENE MREŽE</h3>
            <a href="${escapeHtml(siteConfig.tiktokUrl)}" target="_blank" rel="noreferrer noopener">TikTok</a>
            ${hasInstagram ? `<a href="${escapeHtml(siteConfig.instagramUrl)}" target="_blank" rel="noreferrer noopener">Instagram</a>` : ""}
          </div>
        </div>
        <div class="footer-tape" aria-hidden="true">${renderStampLine()}</div>
      </footer>`;
}

function renderStampLine() {
  return `${siteConfig.motto} ★ ${siteConfig.motto} ★ ${siteConfig.name} ★ ${siteConfig.address}`;
}

function renderMiniBoardScript() {
  const scheduleJson = serializeJsonForScript(schedule);

  return `<script>
      (() => {
        const miniBoard = document.querySelector("[data-mini-board]");

        if (!miniBoard) {
          return;
        }

        const dayElement = miniBoard.querySelector("[data-mini-board-day]");
        const listElement = miniBoard.querySelector("[data-mini-board-list]");

        if (!dayElement || !listElement) {
          return;
        }

        const weeklySchedule = ${scheduleJson};
        const weekdayIndexMap = {
          Mon: 0,
          Tue: 1,
          Wed: 2,
          Thu: 3,
          Fri: 4,
          Sat: 5,
          Sun: 6
        };

        const todayKey = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          timeZone: "Europe/Belgrade"
        }).format(new Date());

        const activeDay =
          weeklySchedule[weekdayIndexMap[todayKey]] ?? weeklySchedule[0];

        dayElement.textContent = activeDay.day;
        miniBoard.setAttribute("aria-label", "Današnji raspored: " + activeDay.fullDay);

        const items = activeDay.sessions.map((session) => {
          const item = document.createElement("li");
          const time = document.createElement("strong");
          const title = document.createElement("span");

          time.textContent = session.time;
          title.textContent = session.title;
          item.append(time, title);

          return item;
        });

        listElement.replaceChildren(...items);
      })();
    </script>`;
}

export function renderPage() {
  return renderHead();
}

export function renderRobotsTxt() {
  const sitemapRoot = isVerifiedUrl(siteConfig.siteUrl)
    ? siteConfig.siteUrl
    : siteConfig.siteUrl;

  return `User-agent: *
Allow: /

# TODO: replace placeholder domain before production launch if still present.
Sitemap: ${sitemapRoot}/sitemap.xml
`;
}

export function renderSitemapXml() {
  const baseUrl = isVerifiedUrl(siteConfig.siteUrl)
    ? siteConfig.siteUrl
    : siteConfig.siteUrl;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(baseUrl)}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

export function getOutstandingLaunchTodos() {
  return [
    {
      label: "production domain",
      value: siteConfig.siteUrl
    },
    {
      label: "verified Instagram URL",
      value: siteConfig.instagramUrl
    },
    {
      label: "verified map URL",
      value: siteConfig.googleMapsUrl
    }
  ]
    .filter((item) => isPlaceholder(item.value))
    .map((item) => item.label);
}
