document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = header ? header.querySelector('nav') : null;

  if (!header || !nav) return;

  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to content';
  document.body.prepend(skipLink);

  const main = document.querySelector('main');
  if (main) {
    main.id = 'main-content';
  }

  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.className = 'nav-toggle';
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-controls', 'site-nav');
  toggleButton.setAttribute('aria-label', 'Toggle navigation');
  toggleButton.innerHTML = '<span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>';

  nav.id = 'site-nav';
  nav.classList.add('nav-links');
  nav.setAttribute('aria-label', 'Primary navigation');
  header.prepend(toggleButton);

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  const closeMenu = () => {
    header.classList.remove('nav-open');
    toggleButton.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    header.classList.add('nav-open');
    toggleButton.setAttribute('aria-expanded', 'true');
  };

  toggleButton.addEventListener('click', () => {
    const isOpen = header.classList.contains('nav-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 900 && !header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});
