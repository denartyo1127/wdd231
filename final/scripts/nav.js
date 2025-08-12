// js/nav.js
export function navSetup(){
  const ham = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  ham && ham.addEventListener('click', ()=>{
    const open = mobileMenu.style.display === 'block';
    mobileMenu.style.display = open ? 'none' : 'block';
  });

  // wayfinding: mark active link
  const links = document.querySelectorAll('.navlinks a');
  links.forEach(a=>{
    if(window.location.pathname.endsWith(a.getAttribute('href')) || (a.getAttribute('href') === 'index.html' && window.location.pathname.endsWith('/'))){
      a.setAttribute('aria-current','page');
    }
  });
}
