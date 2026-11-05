/* Expand the long review without stretching its neighbours. */
(() => {
  const button = document.querySelector('.review__toggle');
  if (!button) return;
  const text = document.getElementById(button.getAttribute('aria-controls'));
  let expanded = false;
  let generation = 0;
  let width = 0;
  const collapsedHeight = () => parseFloat(getComputedStyle(text).lineHeight) * 7;
  const sync = () => {
    text.style.height = expanded ? 'auto' : collapsedHeight() + 'px';
  };
  text.classList.add('is-expandable');
  button.hidden = false;
  sync();
  button.addEventListener('click', () => {
    const currentHeight = text.getBoundingClientRect().height;
    expanded = !expanded;
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Свернуть' : 'Читать далее';
    const version = ++generation;
    text.style.height = currentHeight + 'px';
    // Commit the current height before retargeting, including interrupted transitions.
    text.getBoundingClientRect();
    requestAnimationFrame(() => {
      if (version !== generation) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { sync(); return; }
      text.style.height = (expanded ? text.scrollHeight : collapsedHeight()) + 'px';
    });
  });
  text.addEventListener('transitionend', event => {
    if (event.propertyName === 'height' && expanded) text.style.height = 'auto';
  });
  new ResizeObserver(entries => {
    const nextWidth = entries[0].contentRect.width;
    if (Math.abs(nextWidth - width) < .5) return;
    width = nextWidth;
    sync();
  }).observe(text);
  document.fonts.ready.then(sync);
})();
