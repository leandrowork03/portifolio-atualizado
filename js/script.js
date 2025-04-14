const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');
const themeToggle = document.getElementById('theme-toggle');
const btnTopo = document.getElementById('btnTopo');


menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  sideMenu.classList.toggle('open');
});

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    btnTopo.style.display = 'block';
  } else {
    btnTopo.style.display = 'none';
  }
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.checked = true;
  }

  const firstSection = document.querySelector('.first');
  const typewriterElements = firstSection.querySelectorAll('.typewriter h1, .typewriter p');
  const speed = 50;
  const delayBetween = 500; 

  typewriterElements.forEach(el => {
    el.style.opacity = '0';
  });

  function typeWriterEffect(element, text, index, callback) {
    const cursor = '<span class="cursor"></span>';
    if (index < text.length) {
      element.innerHTML = text.substring(0, index + 1) + cursor;
      setTimeout(() => {
        typeWriterEffect(element, text, index + 1, callback);
      }, speed);
    } else {
      element.innerHTML = text;
      if (callback) setTimeout(callback, delayBetween);
    }
  }

  function startTypewriter(index = 0) {
    if (index >= typewriterElements.length) return;

    const element = typewriterElements[index];
    const text = element.textContent;

    element.innerHTML = ''; 
    element.style.opacity = '1'; 
    typeWriterEffect(element, text, 0, () => startTypewriter(index + 1));
  }

  startTypewriter();
});

const sections = document.querySelectorAll('.reveal');

function checkReveal() {
  const triggerBottom = window.innerHeight * 0.95;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('active');
    }
  });
}
const aboutMe = document.querySelector('.about-me');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutMe.classList.add('appear');
      observer.unobserve(entry.target); 
    }
  });
}, { threshold: 0.5 });

observer.observe(aboutMe);


window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);
