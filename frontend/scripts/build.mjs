import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  getOutstandingLaunchTodos,
  renderPage,
  renderRobotsTxt,
  renderSitemapXml
} from "../src/render/renderPage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
const stylesDir = path.join(distDir, "styles");

async function build() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(stylesDir, { recursive: true });

  await cp(publicDir, distDir, { recursive: true });
  await cp(
    path.join(rootDir, "src", "styles", "global.css"),
    path.join(stylesDir, "global.css")
  );

  await writeFile(path.join(distDir, "index.html"), renderPage(), "utf8");
  await writeFile(path.join(distDir, "robots.txt"), renderRobotsTxt(), "utf8");
  await writeFile(path.join(distDir, "sitemap.xml"), renderSitemapXml(), "utf8");

  console.log("Build complete: frontend/dist");

  const outstandingLaunchTodos = getOutstandingLaunchTodos();

  if (outstandingLaunchTodos.length > 0) {
    console.log(
      `Launch TODOs remain in site config: ${outstandingLaunchTodos.join(", ")}.`
    );
  }
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
