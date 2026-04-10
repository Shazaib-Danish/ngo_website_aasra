const fs = require("fs");

const pages = [
  "",
  "about",
  "programs",
  "gallery",
  "donate",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>https://www.aasra-welfare.org/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync("dist/sitemap.xml", sitemap);
console.log("Sitemap generated!");