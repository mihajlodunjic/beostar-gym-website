import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { faqItems } from "../src/data/faq.js";
import { schedule } from "../src/data/schedule.js";
import { siteConfig, isPlaceholder, isVerifiedUrl } from "../src/data/siteConfig.js";
import { trainingTypes } from "../src/data/trainingTypes.js";
import { renderPage } from "../src/render/renderPage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const errors = [];

async function ensureFile(relativePath) {
  try {
    await access(path.join(rootDir, relativePath));
  } catch {
    errors.push(`Missing file: ${relativePath}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

async function run() {
  await Promise.all([
    ensureFile("public/gym-interior-1.png"),
    ensureFile("public/gym-interior-2.png"),
    ensureFile("public/gym-interior-3.png"),
    ensureFile("public/gym-interior-4.png"),
    ensureFile("public/logo_orange_background_white_text.jpg"),
    ensureFile("src/styles/global.css")
  ]);

  assert(trainingTypes.length === 8, "Expected 8 training types.");
  assert(schedule.length === 7, "Expected schedule for 7 days.");
  assert(faqItems.length >= 4, "Expected at least 4 FAQ items.");
  assert(Boolean(siteConfig.title), "Missing site title.");
  assert(Boolean(siteConfig.metaDescription), "Missing meta description.");
  assert(
    isVerifiedUrl(siteConfig.tiktokUrl),
    "TikTok URL must be a verified public URL."
  );
  assert(
    isVerifiedUrl(siteConfig.googleMapsUrl) || isPlaceholder(siteConfig.googleMapsUrl),
    "Google Maps URL must be verified or kept as a TODO placeholder."
  );
  assert(
    isVerifiedUrl(siteConfig.instagramUrl) || isPlaceholder(siteConfig.instagramUrl),
    "Instagram URL must be verified or kept as a TODO placeholder."
  );
  assert(
    isVerifiedUrl(siteConfig.siteUrl) || isPlaceholder(siteConfig.siteUrl),
    "Site URL must be verified or kept as a TODO placeholder."
  );

  const html = renderPage();

  [
    "Beostar Gym",
    "WE TRAIN AS ONE",
    "Jurija Gagarina 78",
    "TRENIRAMO KAO JEDAN",
    "RASPORED TRENINGA",
    "PIŠI NAM ZA PRVI TRENING",
    "https://www.tiktok.com/@beostargym"
  ].forEach((token) => assert(html.includes(token), `Rendered HTML missing: ${token}`));

  if (errors.length > 0) {
    console.error("Lint failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log("Lint checks passed.");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
