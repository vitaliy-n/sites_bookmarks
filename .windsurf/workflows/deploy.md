---
description: Deploy Bookmark Hub to GitHub Pages
---

1. Переконайтесь що всі зміни закомічені.
// turbo
2. Запушіть в `main` гілку:
```bash
git push origin main
```
3. GitHub Actions автоматично запустить workflow `.github/workflows/gh-pages.yml`.
4. Дочекайтесь зеленої галочки ✔ у вкладці Actions на GitHub.
5. Сайт доступний за адресою `https://<username>.github.io/bookmark_master/`.
6. Для кастомного домену — створіть файл `CNAME` в корені з вашим доменом.
