(() => {
  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 30);
  updateHeader();
  addEventListener('scroll', updateHeader, {passive: true});
  if (!window.gsap || !window.ScrollTrigger || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const anchor = document.getElementById(location.hash.slice(1));
  let mm;
  const context = gsap.context(() => {
    const curtain = document.querySelector('.opening-curtain');
    document.documentElement.classList.add('motion-running');
    gsap.set(curtain, {clipPath: 'inset(0 0 0 0)'});
    const opening = gsap.timeline({defaults: {ease: 'power4.out'}, onComplete: () => {
      curtain.remove();
      document.documentElement.classList.remove('motion-running');
      ScrollTrigger.refresh();
      if (anchor) requestAnimationFrame(() => anchor.scrollIntoView({behavior: 'instant', block: 'start'}));
    }});
    opening.to(curtain, {clipPath: 'inset(0 0 100% 0)', duration: .75, ease: 'expo.inOut'}, .05)
      .from('.site-header > *', {y: -22, opacity: 0, duration: .7, stagger: .08, clearProps: 'all'}, .42);
    if (document.querySelector('.universe-hero')) {
      opening.from('.universe-hero h1 > span', {yPercent: 115, clipPath: 'inset(0 0 100% 0)', scaleY: .78, transformOrigin: 'bottom', duration: 1.12, stagger: .13, clearProps: 'all'}, .38)
        .from('.arrival-portrait', {clipPath: 'inset(100% 0 0 0)', y: 90, rotation: 12, duration: 1.1, clearProps: 'all'}, .94)
        .from('.hero-meta > *, .arrival-bottom > *', {y: 25, opacity: 0, duration: .7, stagger: .11, clearProps: 'all'}, 1.26);
    } else {
      opening.from('.universe-page-hero .section-index', {y: 20, opacity: 0, duration: .6, clearProps: 'all'}, .55)
        .from('.universe-page-hero h1', {yPercent: 25, clipPath: 'inset(0 0 100% 0)', scaleY: .83, transformOrigin: 'bottom', duration: 1.15, clearProps: 'all'}, .68)
        .from('.page-hero-rule > *', {y: 28, opacity: 0, duration: .75, stagger: .14, clearProps: 'all'}, 1.18);
    }
    const reveal = (selector, vars, start = 'top 84%') => {
      document.querySelectorAll(selector).forEach(element => gsap.from(element, {
        scrollTrigger: {trigger: element, start, once: true},
        duration: 1, ease: 'power3.out', clearProps: 'all', ...vars
      }));
    };
    reveal('.person-section .kicker, .person-section h2', {y: 75, clipPath: 'inset(0 0 100% 0)'}, 'top 78%');
    reveal('.person-detail > *', {y: 38, opacity: 0}, 'top 85%');
    reveal('.moments-heading > *, .lab-intro > *', {y: 58, opacity: 0}, 'top 84%');
    document.querySelectorAll('.moment-photo').forEach((photo, index) => {
      gsap.from(photo.querySelector('img'), {scrollTrigger: {trigger: photo, start: 'top 88%', once: true}, clipPath: index % 2 ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)', scale: 1.08, duration: 1.2, ease: 'expo.out', clearProps: 'all'});
    });
    reveal('.obsessions-heading > *', {y: 60, opacity: 0}, 'top 85%');
    document.querySelectorAll('.obsession-list a').forEach((row, index) => {
      gsap.from(row, {scrollTrigger: {trigger: row, start: 'top 90%', once: true}, x: index % 2 ? 45 : -45, opacity: 0, duration: .85, ease: 'power3.out', clearProps: 'all'});
    });
    reveal('.home-projects a', {y: 45, opacity: 0}, 'top 88%');
    reveal('.ending-section h2, .ending-bottom', {y: 65, opacity: 0}, 'top 80%');
    reveal('.life-intro .life-portrait', {clipPath: 'inset(100% 0 0 0)', y: 60, duration: 1.25});
    reveal('.life-intro > div:last-child > *', {y: 35, opacity: 0}, 'top 83%');
    reveal('.chapter-banner strong', {yPercent: 28, clipPath: 'inset(0 0 100% 0)', duration: 1.2}, 'top 79%');
    document.querySelectorAll('.car-photo').forEach((photo, index) => {
      gsap.from(photo.querySelector('img'), {scrollTrigger: {trigger: photo, start: 'top 89%', once: true}, clipPath: index % 2 ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)', duration: 1.2, ease: 'expo.out', clearProps: 'all'});
    });
    reveal('.discipline-layout .story-art, .playground-layout .story-art', {clipPath: 'inset(0 0 100% 0)', y: 30, duration: 1.2});
    reveal('.discipline-layout .story-copy > *, .playground-layout .story-copy > *', {y: 38, opacity: 0}, 'top 88%');
    reveal('.archive-intro > *, .lab-ending > *', {y: 55, opacity: 0}, 'top 82%');
    reveal('.archive-item summary', {y: 38, opacity: 0}, 'top 88%');
    mm = gsap.matchMedia();
    mm.add('(min-width: 681px) and (prefers-reduced-motion: no-preference)', () => {
      document.querySelectorAll('.moment-photo img, .car-grid .car-photo img').forEach((img, index) => {
        gsap.to(img, {yPercent: index % 2 ? -4 : -7, ease: 'none', scrollTrigger: {trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: .7}});
      });
    });
    document.querySelectorAll('.archive-item').forEach(item => item.addEventListener('toggle', () => ScrollTrigger.refresh()));
    if (anchor) opening.progress(1);
  });
  addEventListener('pagehide', () => { mm?.revert(); context.revert(); }, {once: true});
})();
