document.addEventListener('DOMContentLoaded', () => {
  const primarySidebar = document.getElementById('pst-primary-sidebar');
  const pageToc = document.getElementById('pst-page-toc-nav');
  const currentItem = primarySidebar?.querySelector('.bd-docs-nav li.current.active');

  if (pageToc && currentItem && pageToc.querySelector('a')) {
    const panel = document.createElement('details');
    const summary = document.createElement('summary');
    panel.className = 'ff-inline-page-toc';
    panel.open = true;
    summary.textContent = '本页目录';
    pageToc.setAttribute('aria-label', '本页目录');
    pageToc.removeAttribute('aria-labelledby');
    panel.append(summary, pageToc);
    currentItem.append(panel);
    document.documentElement.classList.add('ff-page-toc-merged');
  }

  document.querySelectorAll('.secondary-toggle').forEach(button => {
    button.hidden = true;
    button.setAttribute('aria-hidden', 'true');
  });

  const buttons = [...document.querySelectorAll('.primary-toggle')];
  const original = buttons[0];
  const dialog = document.getElementById('pst-primary-sidebar-modal');
  if (!original || !dialog || !primarySidebar) return;

  const desktop = matchMedia('(min-width: 992px)');
  const sync = () => buttons.forEach(button => button.setAttribute(
    'aria-expanded',
    String(desktop.matches ? !primarySidebar.classList.contains('pst-sidebar-hidden') : dialog.open),
  ));

  buttons.forEach(button => {
    button.setAttribute('aria-label', '打开或关闭章节目录');
    button.setAttribute('aria-controls', dialog.id);
  });
  for (const button of buttons.slice(1)) {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (dialog.open) {
        dialog.close();
        return;
      }
      if (!desktop.matches) {
        button.focus({ preventScroll: true });
        dialog.addEventListener('close', () => button.focus({ preventScroll: true }), { once: true });
      }
      original.click();
      sync();
    }, true);
  }

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'ff-sidebar-close';
  close.textContent = '关闭章节目录 ×';
  close.addEventListener('click', () => dialog.close());
  dialog.prepend(close);

  new MutationObserver(sync).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  new MutationObserver(sync).observe(primarySidebar, { attributes: true, attributeFilter: ['class'] });
  desktop.addEventListener('change', () => {
    if (desktop.matches && dialog.open) dialog.close();
    sync();
  });
  sync();
});
