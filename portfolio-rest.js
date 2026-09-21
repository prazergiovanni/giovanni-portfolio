(() => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.site-nav');
  if (!header || !nav) return;
  const links = [...nav.querySelectorAll('a:not(.action):not(.language)')];
  const map = [
    ['remote-work', '#remote-work'], ['capabilities', '#capabilities'], ['practice-areas', '#practice-areas'],
    ['journey', '#journey'], ['highlights', '#highlights'], ['about', '#about'], ['resume', '#resume'], ['contact', '#contact']
  ];
  const byHref = href => links.find(a => a.getAttribute('href') === href);
  const setActive = href => links.forEach(a => a.classList.toggle('active', a === byHref(href)));
  const update = () => {
    const marker = innerHeight * .34;
    let current = null;
    for (const [id, href] of map) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= marker) current = href;
    }
    setActive(current);
  };
  addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();

  const toggle = document.createElement('button');
  toggle.className = 'mobile-nav-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation'); toggle.innerHTML = '<span></span><span></span><span></span>';
  header.insertBefore(toggle, nav);
  const close = () => { nav.classList.remove('mobile-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('mobile-open'); toggle.setAttribute('aria-expanded', String(open)); });
  links.forEach(a => a.addEventListener('click', close));
  addEventListener('resize', () => { if (innerWidth > 980) close(); });
})();
