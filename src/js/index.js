document.addEventListener("DOMContentLoaded", function() {

  // Lazyload
  document.querySelectorAll('img').forEach( (e) => {
    e.classList.add('lazy');
  })
  let lazyLoadInstance = new LazyLoad();


  // Select
  const regionSelect = document.querySelector('.region-form__select');
  const choicesRegion = new Choices(regionSelect, {
    silent: true,
    searchEnabled: false,
    itemSelectText: '',
    duplicateItemsAllowed: false
  });

  // Dropdown
  const params = {
    btnClassName: "dropdown-btn",
    dropClassName: "dropdown-content",
    activeClassName: "active"
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName) || current.classList.contains(params.dropClassName)) {
            current.classList.remove(params.activeClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
        } else {
          drop.classList.remove(params.activeClassName);
        }
      }
    });
  }
  setMenuListener();

  // Hero swiper
  const swiperHero = new Swiper('.section-hero__swiper', {
  // Optional parameters
    loop: true,
    speed: 900,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    // autoplay
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.banner-swiper__pagination',
      clickable: true,
        renderBullet: function (index, className) {
          return '<button class="' + className + '"><svg class="' + className +'-icon" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="transparent" stroke="#fff" stroke-width="2"/><circle cx="10" cy="10" r="8" transform="rotate(-90 10 10)" fill="none" stroke-dashoffset="50.24" stroke-dasharray="50.24" stroke="#ff862f" stroke-width="2"></svg></button>';
        }
    },

    a11y: false,
    keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    slideVisibleClass: 'slide-visible',

    on: {
      init: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.querySelector('.banner-swiper__btn').tabIndex = '-1';
          } else {
            slide.querySelector('.banner-swiper__btn').tabIndex = '';
          }
        });
      },
      slideChange: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.querySelector('.banner-swiper__btn').tabIndex = '-1';
          } else {
            slide.querySelector('.banner-swiper__btn').tabIndex = '';
          }
        });
      }
    }
  });

  // Spec-offer swiper
  const swiperSpecOffer = new Swiper('.spec-offer-swiper', {
    // Optional parameters
      loop: false,
      speed: 450,
      watchSlidesProgress: true,
      slidesPerView: 1,
      spaceBetween: 32,
      breakpoints: {
        // when window width is >= 576px
        576: {
          slidesPerView: 2
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 3
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 'auto',
          spaceBetween: 32,
          slidesPerGroup: 3,
        },
      },
      navigation: {
        nextEl: '.spec-offer-swiper__btn-next',
        prevEl: '.spec-offer-swiper__btn-prev',
      },

      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            // if (slide.classList.contains('product-card-sheme')) {
            //   slide.previousElementSibling.classList.add('product-card-sheme-prev');
            // }
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.product-card__btn').tabIndex = '-1';
            } else {
              slide.querySelector('.product-card__btn').tabIndex = '';
            }
            // if (!slide.classList.contains('slide-visible')) {
            //   slide.tabIndex = '-1';
            // } else {
            //   slide.tabIndex = '';
            // };
          });
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.product-card__btn').tabIndex = '-1';
            } else {
              slide.querySelector('.product-card__btn').tabIndex = '';
            }
          });
        },
        resize: function () {
          this.update();
        }
      }
    });


  // Whatch more BTN
  const watchMoreBtn = document.querySelector('.section-high-rating__btn');
  const highRateProducts = document.querySelectorAll('.high-rating-products__item');
  const highRateProductsArr = Array.from(highRateProducts);

  function highProductsInit () {
    if (window.innerWidth >= 1200) {
      if (highRateProductsArr.length > 8) {
        let hiddenHighRateProductsArr = highRateProductsArr.slice(8);
        hiddenHighRateProductsArr.forEach(product => {
          product.classList.add('is-hidden');
        });
      } else if (watchMoreBtn != null) {
        watchMoreBtn.style.display = 'none';
      }
    } else {
      if (highRateProductsArr.length > 6) {
        let hiddenHighRateProductsArr = highRateProductsArr.slice(6);
        hiddenHighRateProductsArr.forEach(product => {
          product.classList.add('is-hidden');
        });
      } else if (watchMoreBtn != null) {
        watchMoreBtn.style.display = 'none';
      }
    }
  };

  function showHiddenProducts () {
    if (window.innerWidth >= 1200) {
      if (highRateProductsArr.length > 8) {
        let hiddenHighRateProductsArr = highRateProductsArr.slice(8);
        if (hiddenHighRateProductsArr.length >= 4) {
          hiddenHighRateProductsArr.slice(0, 4).forEach(product => {
            product.classList.remove('is-hidden');
          });
          watchMoreBtn.style.display = 'none';
        } else {
          hiddenHighRateProductsArr.slice(0).forEach(product => {
            product.classList.remove('is-hidden');
          });
          watchMoreBtn.style.display = 'none';
        }
      }
    } else {
      if (highRateProductsArr.length > 6) {
        let hiddenHighRateProductsArr = highRateProductsArr.slice(6);
        if (hiddenHighRateProductsArr.length >= 4) {
          hiddenHighRateProductsArr.slice(0, 4).forEach(product => {
            product.classList.remove('is-hidden');
          });
          watchMoreBtn.style.display = 'none';
        } else {
          hiddenHighRateProductsArr.slice(0).forEach(product => {
            product.classList.remove('is-hidden');
          });
          watchMoreBtn.style.display = 'none';
        };
      };
    };
  };
  highProductsInit ();

  if (watchMoreBtn != null) {
    watchMoreBtn.addEventListener('click', (e) => {
      e.preventDefault;
      showHiddenProducts();
    });
  }


  // Useful swiper
  const swiperUseful = new Swiper('.useful-swiper', {
    // Optional parameters
      loop: false,
      speed: 600,
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      spaceBetween: 32,
      breakpoints: {
        // when window width is >= 576px
        576: {
          slidesPerView: 2
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 3
        },
        // when window width is >= 1200px
        1200: {
          slidesPerView: 2,
          spaceBetween: 32
        },
      },
      navigation: {
        nextEl: '.useful-swiper__btn-next',
        prevEl: '.useful-swiper__btn-prev',
      },

      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.useful-card__link').tabIndex = '-1';
            } else {
              slide.querySelector('.useful-card__link').tabIndex = '';
            }
          });
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.useful-card__link').tabIndex = '-1';
            } else {
              slide.querySelector('.useful-card__link').tabIndex = '';
            }
          });
        }
      }
  });

  // Mobile menu
  const menuBtnOpen = document.querySelector('.header-menu__btn');
  const menuBtnClose = document.querySelector('.main-menu__btn-close');

  menuBtnOpen.addEventListener('click', () => {
    if (window.innerWidth < 576 ) {
      document.querySelector('.header-menu_adap_mob .header-menu__wrap').classList.add('active');
      document.querySelector('.main-menu_adap_mob').classList.remove('active');
    } else {
      document.querySelector('.main-menu_adap_mob').style.transition = "opacity .3s ease, visibility .3s ease";
      document.querySelector('.main-menu_adap_mob').classList.add('active');
      document.querySelector('.header-menu_adap_mob .header-menu__wrap').classList.remove('active');
    }

  });
  menuBtnClose.addEventListener('click', () => {
    document.querySelector('.header-menu_adap_mob .header-menu__wrap').classList.remove('active');
    document.querySelector('.main-menu_adap_mob').classList.remove('active');

  });
  document.querySelector('.main-menu_adap_mob').addEventListener('transitionend', () => {
    if (!document.querySelector('.main-menu_adap_mob').classList.contains('active')) {
      document.querySelector('.main-menu_adap_mob').style.transition = "none";
    }
  });

  // Tooltips
  tippy('.section-feedback__tooltip', {
    content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.',
    trigger: 'mouseenter click',
    duration: [500, 250],
  });

  // Modals

    // Modal gallery
    const swiperModalWindowBtn = document.querySelectorAll(".single-product-swiper-top__swiper-slide");
    const swiperModalWindow = document.querySelector(".modal-window-swiper-gallery");
    const body = document.querySelector("body");

    function existVerticalScroll() {
      return document.body.offsetHeight > window.innerHeight
    }

    function getBodyScrollTop() {
      return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
    }

    // Gallery swipers

    const swiperModalWindowThumbs = new Swiper('.modal-window-swiper-top', {
      // Optional parameters
        loop: false,
        speed: 400,
        spaceBetween: 16,
        watchSlidesProgress: true,
        touchRatio: 0,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
        thumbs: {
          swiper: {
            el: '.modal-window-swiper-thumbs',
            loop: false,
            speed: 400,
            slidesPerView: 1,
            watchSlidesProgress: true,
            spaceBetween: 16,
            clickable: true,
            touchRatio: 0.5,
            slideToClickedSlide: true,
            breakpoints: {
              // when window width is >= 576px
              576: {
                slidesPerView: 2
              },
              // when window width is >= 992px
              992: {
                slidesPerView: 3
              },
              // when window width is >= 1200px
              1200: {
                slidesPerView: 4
              }
            },
            navigation: {
              nextEl: '.modal-window-swiper-thumbs-nav__btn-next',
              prevEl: '.modal-window-swiper-thumbs-nav__btn-prev',
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            a11y: false,
            keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

            // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
            watchSlidesProgress: true,
            slideVisibleClass: 'slide-visible',

            on: {
              init: function () {
                this.slides.forEach(slide => {
                  if (!slide.classList.contains('slide-visible')) {
                    slide.tabIndex = '-1';
                  } else {
                    slide.tabIndex = '';
                  };
                });
              },
              slideChange: function () {
                this.slides.forEach(slide => {
                  if (!slide.classList.contains('slide-visible')) {
                    slide.tabIndex = '-1';
                  } else {
                    slide.tabIndex = '';
                  }
                });

              },
              resize: function () {
                this.update();
              }
            }
          }
        },

        a11y: false,
        keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

        // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
        watchSlidesProgress: true,
        slideVisibleClass: 'slide-visible',

        on: {
          // init: function () {
          //   this.slides.forEach(slide => {
          //     if (!slide.classList.contains('slide-visible')) {
          //       slide.tabIndex = '-1';
          //     } else {
          //       slide.tabIndex = '';
          //     };
          //   });
          // },
          // slideChange: function () {
          //   this.slides.forEach(slide => {
          //     if (!slide.classList.contains('slide-visible')) {
          //       slide.tabIndex = '-1';
          //     } else {
          //       slide.tabIndex = '';
          //     }
          //   });
          // },
          resize: function () {
            this.update();
          }
        }
      });

      swiperModalWindowBtn.forEach( (btn) => {
        btn.addEventListener('click', () => {
          body.dataset.scrollY = getBodyScrollTop();
          swiperModalWindow.classList.add('show');
          if (existVerticalScroll()) {
            body.classList.add('lock');
            body.style.top = `-${body.dataset.scrollY}px`;
          }
        })
      });

      document.addEventListener('click', () => {
        const activeModalWindow = document.querySelector(".modal-window.show");
        if (activeModalWindow) {
          let modalWindowBtnClose = activeModalWindow.querySelector(".modal-window__btn-close");
          let modalWindowOverlay = activeModalWindow.querySelector(".modal-window__overlay");
          modalWindowBtnClose.addEventListener('click', () => {
            activeModalWindow.classList.remove('show');
            if (existVerticalScroll()) {
                body.classList.remove('lock');
                window.scrollTo(0,body.dataset.scrollY)
            }
          });
          modalWindowOverlay.addEventListener('click', () => {
            activeModalWindow.classList.remove('show');
            if (existVerticalScroll()) {
              body.classList.remove('lock');
              window.scrollTo(0,body.dataset.scrollY)
            }
          });
        }
      });

    // Buy one click form validate and thanks modal, no-reload sending

      const preloader = document.querySelector('.preloader');
      const buyOneClickBtn = document.querySelector('.single-product-info__btn');
      const buyOneClickForm = document.querySelector('.buy-one-click-form');
      const modalWindowBuyOneClick = document.querySelector('.modal-window-buy-one-click');
      const modalWindowThanks = document.querySelector('.modal-window-thanks');

      const sendData = async (url, data) => {
        const response = await fetch (url, {
          method: 'POST',
          body: data,
        });
        if (!response.ok) {
          throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
        }
        return await response.json();
      }

      // Phones inputmask
      const tels = document.querySelectorAll('.input-val-phone');
      tels.forEach(tel => {
        const im = new Inputmask({
          mask: "+7(999)999-99-99",
          showMaskOnHover: false
        }).mask(tel);
      });

      if(buyOneClickBtn) {
        buyOneClickBtn.addEventListener('click', (e) => {
          body.dataset.scrollY = getBodyScrollTop();
          modalWindowBuyOneClick.classList.add('show');
          if (existVerticalScroll()) {
            body.classList.add('lock');
            body.style.top = `-${body.dataset.scrollY}px`;
          }
        })
      }

      if (buyOneClickForm && document.querySelector('.single-product-parameters__value-article')) {
        const productArticle = document.querySelector('.single-product-parameters__value-article').innerHTML;
        const articleInput = document.querySelector('.buy-one-click-form__input-article');

        if (productArticle && articleInput) {
          articleInput.value = productArticle;
        }
        const buyOneClickFormValidate = new JustValidate(buyOneClickForm, {
          errorFieldCssClass: 'is-invalid',
          successFieldCssClass: 'is-success',
          validateBeforeSubmitting: true,
          focusInvalidField: true,
          errorLabelCssClass: 'input-error',
          errorLabelStyle: {
            color: '#ff6972',
          },
        });

        buyOneClickFormValidate
        .addField('.buy-one-click-form .input-val-name', [
          {
            rule: 'required',
            errorMessage: 'Поле является обязательным',
          },
          {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Имя слишком короткое'
          },
          {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Имя слишком длинное'
          },
          {
            rule: 'customRegexp',
            value: '[A-Za-zА-Яа-яёЁ]',
            errorMessage: 'Неверный формат'
          },

        ])
        .addField('.buy-one-click-form .input-val-phone', [
          {
            rule: 'required',
            errorMessage: 'Поле является обязательным',
          },
          {
            validator: (value) => {
              const phone = document.querySelector('.buy-one-click-form .input-val-phone').inputmask.unmaskedvalue();
              if (phone != 0) {
                return (Number(phone) && phone.length === 10);
              };
              return true;
            },
            errorMessage: 'Неверный номер телефона!',
          }
        ])
        .addField('.buy-one-click-form .checkbox__input', [
          {
            rule: 'required',
            errorMessage: 'Необходимо разрешение на обработку данных',
          },
        ])
        .onSuccess((e) => {
          e.preventDefault();
          const buyOneClickFormData = new FormData(buyOneClickForm);
          sendData ('https://jsonplaceholder.typicode.com/posts', buyOneClickFormData)
          .then(() => {
            buyOneClickForm.reset();
            preloader.classList.add('active');
            setTimeout(() => {
              preloader.classList.remove('active');
              modalWindowBuyOneClick.classList.remove('show');
              modalWindowThanks.classList.add('show');
            }, 1500);
            setTimeout(() => {
              modalWindowThanks.classList.remove('show');
              if (existVerticalScroll()) {
                body.classList.remove('lock');
                window.scrollTo(0,body.dataset.scrollY)
              }
            }, 4000);
          })
          .catch((err) => {
            alert(err);
          });
        });
      }

  // Feedback form-validation

  const formFeedback = document.querySelector('.feedback-form');

  if (formFeedback) {
    const formFeedbackValidate = new JustValidate(formFeedback, {
      errorFieldCssClass: 'is-invalid',
      successFieldCssClass: 'is-success',
      validateBeforeSubmitting: true,
      focusInvalidField: true,
      errorLabelCssClass: 'input-error',
      errorLabelStyle: {
        color: '#ff6972',
      },
    });

    formFeedbackValidate
    .addField('.feedback-form .input-val-name', [
      {
        rule: 'required',
        errorMessage: 'Поле является обязательным',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Имя слишком короткое'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Имя слишком длинное'
      },
      {
        rule: 'customRegexp',
        value: '[A-Za-zА-Яа-яёЁ]',
        errorMessage: 'Неверный формат'
      },

    ])
    .addField('.feedback-form .input-val-phone', [
      {
        rule: 'required',
        errorMessage: 'Поле является обязательным',
      },
      {
        validator: (value) => {
          const phone = document.querySelector('.feedback-form .input-val-phone').inputmask.unmaskedvalue();
          if (phone != 0) {
            return (Number(phone) && phone.length === 10);
          };
          return true;
        },
        errorMessage: 'Неверный номер телефона!',
      }
    ])
    .addField('.feedback-form .input-val-email', [
      {
        rule: 'required',
        errorMessage: 'Поле является обязательным',
      },
      {
        rule: 'email',
        errorMessage: 'Неверный e-mail!',
      },
    ])
    .addField('.feedback-form .checkbox__input', [
      {
        rule: 'required',
        errorMessage: 'Необходимо разрешение на обработку данных',
      },
    ])
    .onSuccess((e) => {
      e.preventDefault();
      const formFeedbackData = new FormData(formFeedback);
      sendData ('https://jsonplaceholder.typicode.com/posts', formFeedbackData)
      .then(() => {
        body.dataset.scrollY = getBodyScrollTop();
        if (existVerticalScroll()) {
          body.classList.add('lock');
          body.style.top = `-${body.dataset.scrollY}px`;
        }
        formFeedback.reset();
        preloader.classList.add('active');
        setTimeout(() => {
          preloader.classList.remove('active');
          modalWindowThanks.classList.add('show');
        }, 1500);
        setTimeout(() => {
          modalWindowThanks.classList.remove('show');
          if (existVerticalScroll()) {
            body.classList.remove('lock');
            window.scrollTo(0,body.dataset.scrollY);
          }
        }, 4000);
      })
      .catch((err) => {
        alert(err);
      });
    });
  }

  // Price filter

  const priceSlider = document.querySelector('.product-filter__price-range');

  if (priceSlider) {
    noUiSlider.create(priceSlider, {
      start: [2000, 150000],
      connect: true,
      step: 1000,
      margin: 15000,
      range: {
          'min': [0],
          'max': [300000]
      }
    });

    const input0 = document.querySelector('.product-filter__price-input-min');
    const input1 = document.querySelector('.product-filter__price-input-max');
    const inputs = [input0, input1];

    priceSlider.noUiSlider.on('update', function(values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    });

    const setPriceSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;
      priceSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        setPriceSlider(index, e.currentTarget.value);
      });
    });
  }

  // Catalog swiper
  const swiperCatalog = new Swiper('.catalog-products', {
    // Optional parameters
      loop: false,
      speed: 300,
      grid: {
        rows: 3,
        fill: "row",
      },
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 16,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      breakpoints: {
        // when window width is >= 576px
        576: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 32,
        },
        // when window width is >= 992px
        992: {
          spaceBetween: 32,
          slidesPerView: 3,
          slidesPerGroup: 3,
        }
      },
      pagination: {
        el: '.catalog-products__pagination',
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) {
          return '<button class="' + className + '">' + (index + 1) + '</button>';
        }
      },

      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.product-card__btn').tabIndex = '-1';
            } else {
              slide.querySelector('.product-card__btn').tabIndex = '';
            };
          });
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.product-card__btn').tabIndex = '-1';
            } else {
              slide.querySelector('.product-card__btn').tabIndex = '';
            }
          });
        },
        resize: function () {
          this.el.classList.add('swiper-grid');
        }
      }
    });

    // Single-product swipers
    const swiperSingleProductThumbs = new Swiper('.single-product-swiper-thumbs', {
      // Optional parameters
        loop: false,
        speed: 400,
        spaceBetween: 37,
        slidesPerView: 'auto',
        initialSlide: 1,
        freeMode: true,
        slideToClickedSlide: true,
        direction: getDirection(),
        breakpoints: {
          576: {
            spaceBetween: 37
          },
          767: {
            spaceBetween: 20
          },
          992: {
            spaceBetween: 37
          }
        },
        a11y: false,
        keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

        // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
        watchSlidesProgress: true,
        slideVisibleClass: 'slide-visible',

        on: {
          init: function () {
            this.slides.forEach(slide => {
              if (!slide.classList.contains('slide-visible')) {
                slide.tabIndex = '-1';
              } else {
                slide.tabIndex = '';
              };
            });
          },
          slideChange: function () {
            this.slides.forEach(slide => {
              if (!slide.classList.contains('slide-visible')) {
                slide.tabIndex = '-1';
              } else {
                slide.tabIndex = '';
              }
            });
          },
          resize: function () {
            this.changeDirection(getDirection());
            this.update();
          }
        }
      });

      function getDirection() {
        let windowWidth = window.innerWidth;
        let direction = 0;
        if (windowWidth >= 576 && windowWidth <= 991) {
          direction = 'vertical';
        } else {
          direction = 'horizontal';
        }
        return direction;

      }

    const swiperSingleProductTop = new Swiper('.single-product-swiper-top', {
    // Optional parameters
      loop: false,
      speed: 400,
      effect: 'fade',
      touchRatio: 0,
      fadeEffect: {
        crossFade: true
      },
      spaceBetween: 16,
      thumbs: {
        swiper: swiperSingleProductThumbs,
      },

      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            };
          });
          swiperModalWindowThumbs.thumbs.swiper.slideTo(this.realIndex + 1);
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        },
        resize: function () {
          this.update();
        }
      }
    });

    swiperSingleProductTop.on('slideChange', () => {
      let activeIndex = swiperSingleProductTop.realIndex;
      swiperModalWindowThumbs.slideTo(activeIndex);
      swiperModalWindowThumbs.thumbs.swiper.slideTo(activeIndex + 1);
    });


  // Related-products swiper
  const swiperRelatedProducts = new Swiper('.related-products-swiper', {
    // Optional parameters
      loop: false,
      speed: 600,
      slidesPerView: 2,
      spaceBetween: 16,
      breakpoints: {
        // when window width is >= 576px
        576: {
          slidesPerView: 2,
          spaceBetween: 32
        },
        // when window width is >= 992px
        992: {
          spaceBetween: 32,
          slidesPerView: 3
        },
        // when window width is >= 1200px
        1200: {
          spaceBetween: 32,
          slidesPerView: 4
        }
      },
      navigation: {
        nextEl: '.related-products-swiper__btn-next',
        prevEl: '.related-products-swiper__btn-prev',
      },

      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.product-card__btn').tabIndex = '-1';
            } else {
              slide.querySelector('.product-card__btn').tabIndex = '';
            };
          });
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.product-card__btn').tabIndex = '-1';
            } else {
              slide.querySelector('.product-card__btn').tabIndex = '';
            }
          });
        },
        resize: function () {
          this.update();
        }
      }
    });

})


