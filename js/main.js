// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const nav = document.querySelector('.nav');

  if (nav) {
    const setScrolled = () => {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Generic form handler: prevent real submit, show success message, optional redirect
  document.querySelectorAll('form[data-mock-submit]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msgId = form.getAttribute('data-message-target');
      const msg = msgId ? document.getElementById(msgId) : null;
      if (msg) {
        msg.textContent = form.getAttribute('data-success-text') || 'Success.';
        msg.classList.remove('error');
        msg.classList.add('success', 'show');
      }
      const redirect = form.getAttribute('data-redirect');
      if (redirect) {
        setTimeout(() => { window.location.href = redirect; }, 900);
      } else {
        form.reset();
      }
    });
  });

  // Floating WhatsApp button, site-wide
  if (!document.querySelector('.whatsapp-float')) {
    const wa = document.createElement('a');
    wa.href = 'https://wa.me/2348135113960';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.className = 'whatsapp-float';
    wa.setAttribute('aria-label', 'Chat with us on WhatsApp');
    wa.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20.5 3.5A10.5 10.5 0 0 0 3.6 16.3L2 22l5.8-1.5A10.5 10.5 0 1 0 20.5 3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 8.7c.2-.6.6-.6 1-.6h.6c.2 0 .5 0 .7.5.3.6.9 2 1 2.1.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.4.4-.2.7.2.4 1 1.5 2.1 2.4 1.4 1.2 2 1.2 2.3 1.1.3-.1.6-.5.8-.8.2-.3.5-.3.8-.2l1.9.9c.3.1.5.2.6.4.1.2.1 1-.3 1.9-.4.9-2 1.7-2.8 1.8-.8.1-1.7.2-5.4-1.6C6.3 16.8 5 13 4.8 12.5c-.2-.5-1.2-1.9-.9-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    document.body.appendChild(wa);
  }

  // Nav scroll-spy: highlight the section link that matches the section in view
  const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'))
    .filter(a => a.getAttribute('href').length > 1);
  if (sectionLinks.length) {
    const sections = sectionLinks
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    if (sections.length) {
      const setActive = () => {
        const scrollPos = window.scrollY + 140;
        let current = sections[0];
        sections.forEach(sec => {
          if (sec.offsetTop <= scrollPos) current = sec;
        });
        sectionLinks.forEach(a => {
          const target = document.querySelector(a.getAttribute('href'));
          a.classList.toggle('active', target === current);
        });
      };
      setActive();
      window.addEventListener('scroll', setActive, { passive: true });
    }
  }
});
