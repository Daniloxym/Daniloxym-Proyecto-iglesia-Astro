const currentPath = normalizePath(window.location.pathname);

const navigationLinks = document.querySelectorAll<HTMLAnchorElement>('.navegacion__link[href]');

const nosotrosButton = document.querySelector<HTMLButtonElement>('.nosotros');

const leadershipPaths = new Set(['/pastores', '/diaconos', '/creencias']);

function selectActiveNavigation(): void {
  clearActiveLinks();

  const activeLink = Array.from(navigationLinks).find((link) => {
    const href = link.getAttribute('href');

    return href && normalizePath(new URL(href, window.location.origin).pathname) === currentPath;
  });

  if (activeLink) {
    setActiveLink(activeLink);
  }

  if (leadershipPaths.has(currentPath)) {
    nosotrosButton?.classList.add('navegacion__link--active');
  }
}

function clearActiveLinks(): void {
  document.querySelectorAll('.navegacion__link--active').forEach((element) => {
    element.classList.remove('navegacion__link--active');
    element.removeAttribute('aria-current');
  });
}

function setActiveLink(link: HTMLAnchorElement): void {
  link.classList.add('navegacion__link--active');
  link.setAttribute('aria-current', 'page');
}

function normalizePath(path: string): string {
  if (path.length > 1) {
    return path.replace(/\/+$/, '');
  }

  return path;
}

selectActiveNavigation();
