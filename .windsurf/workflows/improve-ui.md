---
description: How to improve UI/UX of Bookmark Hub
---

1. Визначте що саме потрібно покращити (spacing, кольори, анімації, responsive).
2. Всі стилі знаходяться в `styles.css`. Ключові секції:
   - **CSS-змінні** — `:root` (light) та `[data-theme="dark"]` (dark)
   - **Toolbar** — `.toolbar`, `.search-box`, `.tb-btn`
   - **Sidebar** — `.sidebar`, `.tree-node`, `.tag-list`
   - **Main content** — `.cat-sec`, `.cat-hdr`, `.subcat-group`, `.bm-row`
   - **Controls** — `.controls-bar`, `.cat-nav`, `.sort-opt`, `.view-opt`
   - **Spotlight** — `.spot-ov`, `.spot-box`, `.spot-item`
   - **Modals** — `.modal-ov`, `.modal`, `.fm-group`
   - **Responsive** — `@media(max-width:860px)` та `@media(max-width:540px)`
3. Правила:
   - Використовуйте тільки CSS-змінні для кольорів (`var(--bg)`, `var(--t1)` тощо).
   - Кожен елемент має працювати в light і dark темах.
   - Compact view (`.compact-view`) — окремі стилі для зменшених рядків.
   - Subcategory rows (`.subcat-body .bm-row`) — компактніші за основні.
// turbo
4. Перевірте результат у браузері в обох темах та на мобільному розмірі.
