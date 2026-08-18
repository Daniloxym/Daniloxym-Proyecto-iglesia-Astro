interface RevealOptions {
  sectionSelector: string;
  elementSelector: string;
  revealClass: string;
  threshold?: number;
  rootMargin?: string;
}

export function setupRevealOnScroll({
  sectionSelector,
  elementSelector,
  revealClass,
  threshold = 0.15,
  rootMargin = '0px 0px -48px',
}: RevealOptions) {
  const section = document.querySelector(sectionSelector);
  const elements = document.querySelectorAll(elementSelector);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!section || reducedMotion || !('IntersectionObserver' in window)) return;

  section.classList.add(revealClass);

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold, rootMargin },
  );

  elements.forEach((element) => observer.observe(element));
}