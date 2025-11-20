(function(){
  async function loadProjects(){
    try{
      // Try both absolute and relative paths for GitHub Pages compatibility
      let res;
      try {
        res = await fetch('/data/projects.json');
        if (!res.ok) throw new Error('Not found at /data/projects.json');
      } catch (err) {
        res = await fetch('data/projects.json');
        if (!res.ok) throw new Error('Not found at data/projects.json');
      }
      const projects = await res.json();
      renderProjects(projects);
    }catch(e){
      const container = document.getElementById('projects-list');
      if(container) container.innerHTML = `<div class="text-red-500">Failed to load projects. Please check your data/projects.json path and try again.</div>`;
      console.error('Failed to load projects:', e);
    }
  }
  function renderProjects(projects){
    const container = document.getElementById('projects-list');
    if(!container) return;
    container.innerHTML = projects.map(p => `
      <article class="group rounded-xl overflow-hidden border p-4 bg-white dark:bg-[#16131D]">
        <a href="${p.contentUrl}" class="block">
          <img src="${p.thumb || 'assets/images/projects/tendawema/tendawema-thumb.png'}" alt="${p.title} thumbnail" class="w-full h-48 object-cover rounded-md mb-3" loading="lazy"/>
          <h3 class="text-lg font-bold">${p.title}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">${p.shortDescription}</p>
          <div class="mt-3 flex gap-2 flex-wrap">${p.tags.map(t=>`<span class="px-2 py-1 rounded-full text-xs bg-gray-200 dark:bg-gray-700">${t}</span>`).join('')}</div>
          <div class="mt-3 flex gap-2 flex-wrap">
            <img src="${p.poster}" alt="Poster" class="h-24 rounded" loading="lazy"/>
            <img src="${p.businessCard}" alt="Business Card" class="h-24 rounded" loading="lazy"/>
            <img src="${p.hero}" alt="Hero" class="h-24 rounded" loading="lazy"/>
          </div>
        </a>
      </article>
    `).join('');
  }
  // init
  document.addEventListener('DOMContentLoaded', loadProjects);
})();
