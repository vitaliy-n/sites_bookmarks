---
description: How to debug and fix bugs in Bookmark Hub
---

1. Відкрийте браузер і відтворіть баг.
2. Перевірте консоль DevTools (F12) на помилки.
3. Визначте файл і функцію де виникає проблема:
   - UI/рендер → `app.js` (`render()`, `rowHTML()`, `renderSubCatGroups()`)
   - Категорії → `categories.js` (`CAT_TREE`, `getCatDescendantIds()`)
   - Дані → `data*.js` (перевірте формат об'єктів)
   - Стилі → `styles.css` (перевірте CSS-змінні, dark theme)
4. Внесіть мінімальне виправлення в коді.
5. Після зміни даних — переконайтесь що `invalidateCache()` викликається.
// turbo
6. Перевірте що сайт працює без помилок у обох темах (light/dark).
7. Перевірте responsive на 540px та 860px.
