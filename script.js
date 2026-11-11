// Menu para celular. Os links de contato também funcionam sem JavaScript.
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
}
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('header')) closeMenu();
});
window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
// Filtros apenas para os quatro produtos em destaque.
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    document.querySelectorAll('[data-category]').forEach(product => {
      product.hidden = button.dataset.filter !== 'Todos' && product.dataset.category !== button.dataset.filter;
      if (!product.hidden) visible += 1;
    });
    document.querySelector('#filter-status').textContent = `${visible} ${visible === 1 ? 'produto exibido' : 'produtos exibidos'}.`;
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
