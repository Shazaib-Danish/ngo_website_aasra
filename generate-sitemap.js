import fs from "fs";

const SITE_URL = "https://www.aasra-welfare.org";
const today = new Date().toISOString().split("T")[0];

const pages = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "about", priority: "0.8", changefreq: "monthly" },
  { path: "programs", priority: "0.9", changefreq: "weekly" },
  { path: "programs/orphan-care", priority: "0.7", changefreq: "monthly" },
  { path: "programs/clean-water", priority: "0.7", changefreq: "monthly" },
  { path: "programs/flood-relief", priority: "0.7", changefreq: "monthly" },
  { path: "programs/relief-work", priority: "0.7", changefreq: "monthly" },
  { path: "gallery", priority: "0.7", changefreq: "weekly" },
  { path: "donate", priority: "0.9", changefreq: "monthly" },
  { path: "sponsorship", priority: "0.9", changefreq: "monthly" },
  { path: "zakat", priority: "0.8", changefreq: "monthly" },
  { path: "volunteer", priority: "0.7", changefreq: "monthly" },
  { path: "contact", priority: "0.6", changefreq: "yearly" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}/${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/sitemap.xml", sitemap);
console.log("Sitemap generated with", pages.length, "URLs.");
