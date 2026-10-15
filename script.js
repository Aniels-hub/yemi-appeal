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
  if (!hero || !counter) return;

  const nextIndex = (index + slides.length) % slides.length;
  hero.style.backgroundImage = `linear-gradient(90deg, rgba(12, 10, 13, 0.72), rgba(12, 10, 13, 0.34)), url('${slides[nextIndex]}')`;
  currentSlide = nextIndex;
  const count = String(currentSlide + 1).padStart(2, '0');
  counter.textContent = `${count} / 03`;
}

if (prevBtn && nextBtn) {
  function moveSlide(direction) {
    setHeroSlide(currentSlide + direction);
  }

  prevBtn.addEventListener('click', () => moveSlide(-1));
  nextBtn.addEventListener('click', () => moveSlide(1));

  let slideTimer = setInterval(() => moveSlide(1), 5000);

  hero?.addEventListener('mouseenter', () => clearInterval(slideTimer));
  hero?.addEventListener('mouseleave', () => {
    slideTimer = setInterval(() => moveSlide(1), 5000);
  });
}

setHeroSlide(0);

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

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

function showFormStatus(form, type, message) {
  const status = form.querySelector('.form-status');
  if (!status) return;

  status.textContent = message;
  status.className = `form-status ${type}`;
}

function validateRequiredText(value, fieldName) {
  if (!String(value || '').trim()) {
    return `${fieldName} is required.`;
  }
  return '';
}

const enquiryForm = document.querySelector('.enquiry-form');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const fullName = formData.get('fullName') || '';
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const messageText = String(formData.get('message') || '').trim();

    const fieldChecks = [
      validateRequiredText(fullName, 'Full Name'),
      validateRequiredText(email, 'Email'),
      validateRequiredText(phone, 'Phone Number'),
      validateRequiredText(service, 'Type of Outfit'),
      validateRequiredText(messageText, 'Message')
    ].filter(Boolean);

    if (fieldChecks.length > 0) {
      showFormStatus(this, 'error', fieldChecks[0]);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showFormStatus(this, 'error', 'Please enter a valid email address.');
      return;
    }

    if (phone.length < 7) {
      showFormStatus(this, 'error', 'Please enter a valid phone number.');
      return;
    }

    const whatsappMessage = [
      'Hello Yemi Appeals, I would like to send an inquiry.',
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone Number: ${phone}`,
      `Type of Outfit: ${service}`,
      `Message: ${messageText}`
    ].join('\n');

    openWhatsApp(whatsappMessage);
    showFormStatus(this, 'success', 'Your inquiry is ready to send on WhatsApp.');
    this.reset();
  });
}