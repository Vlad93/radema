window.addEventListener('DOMContentLoaded', () => {
  // Lazyload
  document.querySelectorAll('img').forEach( (e) => {
    e.classList.add('lazy');
  })
  let lazyLoadInstance = new LazyLoad();

  // Dropdowns
  toggleAutoInit();
  const dropdownMenuElements = document.querySelectorAll('.menu__item.toggle');
  for (const item of dropdownMenuElements) {
    item.setAttribute('aria-expanded', false);
    item.querySelector('.submenu').setAttribute('aria-hidden', true);
    item.querySelector('.submenu').classList.add('toggle-panel', 'toggle-panel--dropdown');
    Toggle({
      selector: item,
      target: item.querySelector('.submenu'),
      closeAuto: true,
      openAuto: true,
      closeAutoDelay: 300,
    });
  };

  document.querySelectorAll('.menu__item.toggle a').forEach((link) => {
    link.addEventListener('click', (e) => {
      window.location = link.href;
    })
  })

});




