(function(){
  function normalize(str){
    return String(str||'').toLowerCase().trim().replace(/\s+/g,'-');
  }

  function setupBlogFilters(){
    const buttons = document.querySelectorAll('.blog-filter-btn');
    if(!buttons.length) return;
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const filter = btn.dataset.filter || 'all';
        buttons.forEach(b=>b.classList.remove('bg-primary','text-white'));
        btn.classList.add('bg-primary','text-white');
        applyBlogFilter(filter);
      });
    });
  }

  function applyBlogFilter(filter){
    const articles = document.querySelectorAll('article');
    if(filter === 'all'){
      articles.forEach(a=>a.style.display='');
      return;
    }
    const normalized = normalize(filter);
    articles.forEach(a=>{
      const timeEl = a.querySelector('time');
      let catEl = null;
      if(timeEl) catEl = timeEl.nextElementSibling;
      let catText = catEl ? catEl.textContent : '';
      if(normalize(catText) === normalized) a.style.display = '';
      else a.style.display = 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    setupBlogFilters();
  });
})();
