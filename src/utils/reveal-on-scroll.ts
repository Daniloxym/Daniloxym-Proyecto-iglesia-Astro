interface RevealOptions {
  sectionSelector: string;
  elementSelector: string;
  revealClass: string;
  sectionVisibleClass?: string;
  revealOnIntersect?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function setupRevealOnScroll({
  sectionSelector,
  elementSelector,
  revealClass,
  sectionVisibleClass,
  revealOnIntersect = false,
  threshold = 0.15,
  rootMargin = '0px 0px -48px',
}: RevealOptions) {
  const section = document.querySelector(sectionSelector);
  const elements = document.querySelectorAll(elementSelector);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!section || reducedMotion || !('IntersectionObserver' in window)) return;

  if (!revealOnIntersect) section.classList.add(revealClass);

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (revealOnIntersect) section.classList.add(revealClass);
        if (sectionVisibleClass) section.classList.add(sectionVisibleClass);
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold, rootMargin },
  );

  elements.forEach((element) => observer.observe(element));
}