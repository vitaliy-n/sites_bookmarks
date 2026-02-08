---
description: General project workflow and conventions for Bookmark Hub
---

# Bookmark Hub — загальний воркфлоу

1. Проєкт — чистий static SPA (HTML/CSS/JS), без збірки.
2. Всі дані закладок у файлах `data*.js`, категорії в `categories.js`.
3. Логіка в `app.js`, стилі в `styles.css`, розмітка в `index.html`.
4. Деплой автоматичний через GitHub Actions на GitHub Pages.
5. Мова інтерфейсу — українська.
6. Дотримуйтесь правил із `.windsurf/rules.md`.
