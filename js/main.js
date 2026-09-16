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
});
