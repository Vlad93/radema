window.addEventListener('DOMContentLoaded', () => {
  // Lazyload
  document.querySelectorAll('img').forEach( (e) => {
    e.classList.add('lazy');
  })
  let lazyLoadInstance = new LazyLoad();

  // Dropdowns
  document.querySelectorAll('.menu__item').forEach((item) => {
    if (item.querySelector('.submenu')) {
      item.classList.add('toggle', 'dropdown-wrap');
    }
  });
  toggleAutoInit();
  let dropdownMenuElements = document.querySelectorAll('.menu__item.toggle');
  const dropdownObjects = [];
  for (const item of dropdownMenuElements) {
    item.setAttribute('aria-expanded', false);
    item.querySelector('.submenu').setAttribute('aria-hidden', true);
    item.querySelector('.submenu').classList.add('toggle-panel', 'toggle-panel--dropdown');
    const dropdown = Toggle({
      selector: item,
      target: item.querySelector('.submenu'),
      closeAuto: true,
      openAuto: true,
      closeAutoDelay: 100,
    });
    dropdownObjects.push(dropdown);
    const windowWidth = window.innerWidth;
    const rightMarginSubmenu = windowWidth - Math.round(item.getBoundingClientRect().right);
    if (rightMarginSubmenu < 318) {
      const differSize = 318 - rightMarginSubmenu;
      item.querySelector('.submenu').style.left = `-${differSize}px`;
    }
  };
  document.querySelectorAll('.menu__item.toggle').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target === item.querySelector('.menu__link')) {
        e.preventDefault();
        item.classList.remove('is-active');
        item.querySelector('.submenu').classList.remove('is-active');
      } else {
        item.classList.toggle('is-active');
        item.querySelector('.submenu').classList.toggle('is-active');
      }
    })
  });
  document.querySelectorAll('.menu__item.toggle a').forEach((link) => {
    link.addEventListener('click', (e) => {
      link.closest('.menu__item.toggle').classList.remove('is-active');
      link.closest('.menu__item.toggle').querySelector('.submenu').classList.remove('is-active');
      window.location = link.href;
    })
  });
});




