const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'projects.json');
const outDir = path.join(__dirname, '..', 'projects');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const template = (p) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${p.title} — Charles Kiyo Muratha</title>
<link rel="stylesheet" href="/css/styles.css"/>
</head>
<body class="font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-text-primary-dark">
<header class="border-b py-4 px-6">
  <a href="/index.html" class="font-bold">Portfolio</a>
</header>
<main class="max-w-4xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-4">${p.title}</h1>
  <img src="/${p.hero}" alt="${p.title} hero" class="w-full rounded-lg mb-4"/>
  <p class="text-gray-700 mb-4">${p.shortDescription}</p>
  <div class="flex gap-2 mb-6">${p.tags.map(t=>`<span class=\"px-3 py-1 bg-gray-200 rounded-full text-sm\">${t}</span>`).join('')}</div>
  <p>Project details and case study content can go here. If you have longer content, we recommend linking to a Markdown-driven page.</p>
  <p class="mt-6"><a href="/projects_page.html" class="text-primary">Back to projects</a></p>
</main>
</body>
</html>`;

(async ()=>{
  try{
    const raw = fs.readFileSync(dataPath,'utf8');
    const projects = JSON.parse(raw);
    projects.forEach(p=>{
      const outPath = path.join(outDir, `${p.slug}.html`);
      fs.writeFileSync(outPath, template(p), 'utf8');
      console.log('Wrote', outPath);
    });
    console.log('Done generating project pages.');
  }catch(err){
    console.error('Failed to generate project pages:', err);
    process.exit(1);
  }
})();
