document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') body.classList.add('dark');
  if (saved === 'light') body.classList.remove('dark');

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Reading progress
  const progress = document.getElementById('reading-progress');
  const article = document.getElementById('article');
  if(progress && article){
    const update = () => {
      const rect = article.getBoundingClientRect();
      const height = article.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - article.offsetTop, 0), height);
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      progress.style.width = pct + '%';
    };
    update();
    document.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
  }

  // TOC toggle for small screens
  const tocToggle = document.getElementById('toc-toggle');
  const toc = document.getElementById('toc');
  if(tocToggle && toc){
    tocToggle.addEventListener('click', ()=>{
      const expanded = tocToggle.getAttribute('aria-expanded') === 'true';
      tocToggle.setAttribute('aria-expanded', String(!expanded));
      toc.classList.toggle('open');
    });
  }

  // Reveal on scroll (light)
  if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('visible');
      });
    }, {threshold: 0.08});
    document.querySelectorAll('.section, .hero').forEach(el=>{
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
});
