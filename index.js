/* Minimal JS: nav toggle, scroll reveal, contact form mock */
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if(navToggle){
  navToggle.addEventListener('click', ()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.style.display = siteNav.style.display === 'flex' ? '' : 'flex';
  });
}

// Simple scroll reveal
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:0.12});
document.querySelectorAll('section, .card, .project-card, .timeline-item').forEach(el=>{
  el.setAttribute('data-animate','');
  observer.observe(el);
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Mock contact form submit (no backend)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data = new FormData(form);
    status.textContent = 'Sending message...';
    setTimeout(()=>{
      status.textContent = 'Thanks! I will reply within 48 hours.';
      form.reset();
    },900);
  });
}

// Accessibility: close mobile nav on link click
document.querySelectorAll('#site-nav a').forEach(a=>{
  a.addEventListener('click', ()=>{
    if(window.innerWidth<640 && navToggle){
      siteNav.style.display='';
      navToggle.setAttribute('aria-expanded','false');
    }
  });
});
