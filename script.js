const slides = [
  'images/corporate2.jpg',
  'images/stone-dress.jpg',
  'images/blouse&skirt 2.jpg'
];

let currentSlide = 0;
const hero = document.querySelector('.hero');
const counter = document.querySelector('.hero-counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function setHeroSlide(index) {
  const nextIndex = (index + slides.length) % slides.length;
  hero.style.backgroundImage = `linear-gradient(90deg, rgba(12, 10, 13, 0.72), rgba(12, 10, 13, 0.34)), url('${slides[nextIndex]}')`;
  currentSlide = nextIndex;
  const count = String(currentSlide + 1).padStart(2, '0');
  counter.textContent = `${count} / 03`;
}

function moveSlide(direction) {
  setHeroSlide(currentSlide + direction);
}

prevBtn.addEventListener('click', () => moveSlide(-1));
nextBtn.addEventListener('click', () => moveSlide(1));

let slideTimer = setInterval(() => moveSlide(1), 5000);
hero.addEventListener('mouseenter', () => clearInterval(slideTimer));
hero.addEventListener('mouseleave', () => {
  slideTimer = setInterval(() => moveSlide(1), 5000);
});

setHeroSlide(0);

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach((faqItem) => {
      faqItem.classList.remove('active');
      faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      faqItem.querySelector('.faq-question span').textContent = '+';
      faqItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('span').textContent = '−';
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/2347043784426?text=${encoded}`, '_blank', 'noopener');
}

document.querySelector('.custom-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const message = [
    'Hello Yemi Appeals, I would like to start a custom order.',
    `Full Name: ${formData.get('fullName') || ''}`,
    `WhatsApp/Phone Number: ${formData.get('phone') || ''}`,
    `Email: ${formData.get('email') || ''}`,
    `Type of Outfit: ${formData.get('outfit') || ''}`,
    `Event/Occasion: ${formData.get('occasion') || ''}`,
    `Preferred Date: ${formData.get('date') || ''}`,
    `Design Details: ${formData.get('details') || ''}`
  ].join('\n');
  openWhatsApp(message);
  this.reset();
});

document.querySelector('.enquiry-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const message = [
    'Hello Yemi Appeals, I would like to send an inquiry.',
    `Full Name: ${formData.get('fullName') || ''}`,
    `Email: ${formData.get('email') || ''}`,
    `Phone Number: ${formData.get('phone') || ''}`,
    `Inquiry/Service: ${formData.get('service') || ''}`,
    `Message: ${formData.get('message') || ''}`
  ].join('\n');
  openWhatsApp(message);
  this.reset();
});
