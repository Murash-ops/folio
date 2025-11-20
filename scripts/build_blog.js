const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const postsDir = path.join(__dirname, '..', 'posts');
const outDir = path.join(__dirname, '..', 'blog', 'posts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.readdirSync(postsDir).forEach(file=>{
  if(!file.endsWith('.md')) return;
  const src = path.join(postsDir, file);
  const md = fs.readFileSync(src,'utf8');
  const htmlBody = marked(md);
  const slug = file.replace(/\.md$/, '');
  const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${slug}</title><link rel="stylesheet" href="/css/styles.css"/></head><body class=\"font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-text-primary-dark\"><main class=\"max-w-3xl mx-auto p-6\">${htmlBody}<p class=\"mt-6\"><a href=\"/blog_page.html\" class=\"text-primary\">Back to blog</a></p></main></body></html>`;
  fs.writeFileSync(path.join(outDir, `${slug}.html`), html, 'utf8');
  console.log('Wrote', slug);
});
console.log('Done building blog posts.');
