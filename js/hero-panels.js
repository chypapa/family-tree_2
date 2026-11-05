/* Measure the homepage panel at the same width, keeping service covers in sync. */
(() => {
  const panel = document.querySelector('.service-hero .opening__content');
  if (!panel) return;
  const measure = document.createElement('div');
  measure.className = 'archive-hero hero-panel-measure';
  measure.setAttribute('aria-hidden', 'true');
  measure.inert = true;
  measure.innerHTML = "<div class=\"archive-hero__panel\">\n        <h1>\n          <span class=\"line\"><span>История вашей семьи</span></span>\n          <span class=\"line\"><span>по&nbsp;архивным документам</span></span>\n        </h1>\n        <p>Проведём генеалогическое исследование: найдём записи о&nbsp;ваших предках в&nbsp;метрических книгах, ревизских сказках и&nbsp;других архивных источниках и&nbsp;оформим результат в&nbsp;родословную книгу или&nbsp;архивный свиток.</p>\n        <a class=\"btn btn--white\" href=\"#contact\">Обсудить историю семьи</a>\n      </div>";
  document.body.append(measure);
  const sample = measure.firstElementChild;
  const sync = () => {
    measure.style.width = panel.getBoundingClientRect().width + 'px';
    panel.style.setProperty('--home-panel-height', sample.getBoundingClientRect().height + 'px');
  };
  new ResizeObserver(sync).observe(document.documentElement);
  document.fonts.ready.then(sync);
  sync();
})();
