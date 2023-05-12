'use strict';

// Selecting elements
const emailInput = document.getElementById('email');
const submitBtn = document.querySelector('.btn__submit');
const emailError = document.querySelector('.error__message');
const emailEmpty = document.querySelector('.error__empty');
const nav = document.querySelector('.nav');
const header = document.getElementById('main__header');
const logo = document.querySelector('.logo');

// 1. Email validation (error messages for incorrect format or an empty field)
let validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

submitBtn.addEventListener('click', function () {
  emailEmpty.classList.add('hidden');
  emailError.classList.add('hidden');

  if (!emailInput.value.match(validRegex) && emailInput.value !== '') {
    emailError.classList.remove('hidden');
  } else if (emailInput.value === '') {
    emailEmpty.classList.remove('hidden');
  }
});

// 2. Refresh when the user clicks on logo image
logo.addEventListener('click', function () {
  window.location.reload();
});

// 3. Navigation bar smooth scrolling
nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const sectionID = e.target.getAttribute('href');
    document.querySelector(sectionID).scrollIntoView({ behavior: 'smooth' });
  }
});

// 4. Navigation bar fade animation
const hover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', hover.bind(0.5));
nav.addEventListener('mouseout', hover.bind(1));

// 5. Sticky navigation
const height = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const observer = new IntersectionObserver(stickyNav, {
  threshold: 0,
  rootMargin: `-${height}px`,
});

observer.observe(header);

// 6. A slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
