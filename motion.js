(() => {
  if (!window.gsap || !window.ScrollTrigger || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const small = matchMedia('(max-width: 680px)').matches;
  const context = gsap.context(() => {
    const curtain = document.querySelector('.opening-curtain');
    const header = document.querySelectorAll('.header nav > a, .site-header > *');
    document.documentElement.classList.add('motion-running');
    gsap.set(curtain, {clipPath: 'inset(0 0 0 0)'});
    const opening = gsap.timeline({defaults: {ease: 'power4.out'}, onComplete: () => {
      curtain.remove();
      document.documentElement.classList.remove('motion-running');
      ScrollTrigger.refresh();
    }});
    opening.to(curtain, {clipPath: 'inset(0 0 100% 0)', duration: .82, ease: 'expo.inOut'}, .08)
      .from(header, {y: -18, opacity: 0, duration: .72, stagger: .055, clearProps: 'all'}, .45);
    if (document.body.classList.contains('page-home')) {
      opening.from('.giant > span', {yPercent: 115, clipPath: 'inset(0 0 100% 0)', scaleY: .76, transformOrigin: 'bottom center', duration: 1.15, stagger: .12, clearProps: 'all'}, .34)
        .from('.profile-object', {clipPath: 'inset(100% 0 0 0)', y: 85, rotation: -12, duration: 1.25, clearProps: 'all'}, .84)
        .from('.hero-side, .hero-bottom', {y: 30, opacity: 0, duration: .8, stagger: .12, clearProps: 'all'}, 1.3);
    } else {
      opening.from('.page-hero > .eyebrow', {y: 20, opacity: 0, duration: .6, clearProps: 'all'}, .55)
        .from('.page-hero h1', {yPercent: 35, clipPath: 'inset(0 0 100% 0)', scaleY: .82, transformOrigin: 'bottom', duration: 1.15, clearProps: 'all'}, .68)
        .from('.page-hero-bottom > *', {y: 38, opacity: 0, duration: .8, stagger: .13, clearProps: 'all'}, 1.22);
    }

    const once = (trigger, targets, vars, start = 'top 84%') => {
      if (!document.querySelector(trigger)) return;
      gsap.from(targets, {scrollTrigger: {trigger, start, once: true}, ...vars, clearProps: 'all'});
    };
    once('.home-about', '.home-about .eyebrow', {x: -35, opacity: 0, duration: .8});
    once('.home-about', '.home-about h2', {yPercent: 32, clipPath: 'inset(0 0 100% 0)', duration: 1.15}, 'top 74%');
    once('.home-about', '.home-about p', {y: 35, opacity: 0, stagger: .18, duration: .85}, 'top 67%');
    once('.explore-section', '.explore-section .section-heading > *', {y: 45, opacity: 0, stagger: .12, duration: .9});
    document.querySelectorAll('.entry').forEach((entry, index) => {
      gsap.from(entry.querySelector('.entry-art'), {scrollTrigger: {trigger: entry, start: 'top 88%', once: true}, clipPath: index ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)', duration: 1.25, ease: 'expo.out', clearProps: 'all'});
      gsap.from(entry.querySelectorAll('.entry-caption, .entry > p'), {scrollTrigger: {trigger: entry, start: 'top 72%', once: true}, y: 32, opacity: 0, stagger: .15, duration: .8, clearProps: 'all'});
    });
    document.querySelectorAll('.section-heading').forEach(heading => {
      if (heading.closest('.explore-section')) return;
      gsap.from(heading.querySelectorAll('.eyebrow, .section-label, h2, p'), {scrollTrigger: {trigger: heading, start: 'top 83%', once: true}, y: 48, clipPath: 'inset(0 0 100% 0)', stagger: .11, duration: 1.1, ease: 'power3.out', clearProps: 'all'});
    });
    once('.skills-section', '.tabs', {y: 30, opacity: 0, duration: .7});
    once('.skills-section', '.skill-panel:not([hidden]) > *', {y: 45, opacity: 0, duration: .85, stagger: .14}, 'top 65%');
    document.querySelectorAll('.timeline-item').forEach((row, i) => {
      gsap.from(row, {scrollTrigger: {trigger: row, start: 'top 87%', once: true}, x: i % 2 ? 45 : -45, opacity: 0, duration: .9, ease: 'power3.out', clearProps: 'all'});
    });
    once('.education', '.education > *', {y: 35, opacity: 0, duration: .8, stagger: .12});
    once('.contact', '.contact > *', {y: 60, opacity: 0, duration: 1, stagger: .18});
    once('.life-intro', '.life-portrait', {clipPath: 'inset(100% 0 0 0)', y: 60, duration: 1.25, ease: 'expo.out'});
    once('.life-intro', '.life-intro > div:last-child > *', {y: 35, opacity: 0, duration: .9, stagger: .12}, 'top 68%');
    document.querySelectorAll('.car-photo').forEach((photo, i) => {
      gsap.from(photo.querySelector('img'), {scrollTrigger: {trigger: photo, start: 'top 89%', once: true}, clipPath: i % 2 ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)', scale: 1.1, duration: 1.35, ease: 'expo.out', clearProps: 'all'});
      if (!small && photo.closest('.car-grid')) gsap.to(photo.querySelector('img'), {yPercent: i === 0 ? -4 : -7, ease: 'none', scrollTrigger: {trigger: photo, start: 'top bottom', end: 'bottom top', scrub: .7}});
    });
    document.querySelectorAll('.story').forEach((story, i) => {
      gsap.from(story.querySelector('.story-art'), {scrollTrigger: {trigger: story, start: 'top 83%', once: true}, clipPath: i % 2 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', duration: 1.2, ease: 'expo.out', clearProps: 'all'});
      gsap.from(story.querySelectorAll('.story-copy > *'), {scrollTrigger: {trigger: story, start: 'top 68%', once: true}, y: 40, opacity: 0, duration: .9, stagger: .11, clearProps: 'all'});
    });
    document.querySelectorAll('.exploration').forEach((project, i) => {
      gsap.from(project.querySelector('.project-mark'), {scrollTrigger: {trigger: project, start: 'top 82%', once: true}, clipPath: i % 2 ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)', duration: 1.2, ease: 'expo.out', clearProps: 'all'});
      gsap.from(project.querySelectorAll(':scope > div:last-child > *'), {scrollTrigger: {trigger: project, start: 'top 70%', once: true}, y: 35, opacity: 0, duration: .8, stagger: .08, clearProps: 'all'});
    });
    once('.life-end', '.life-end > *', {y: 40, opacity: 0, duration: .95, stagger: .14});
  });
  addEventListener('pagehide', () => context.revert(), {once: true});
})();
