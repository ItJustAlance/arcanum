# План: страница «Новость» (news.html)

Источник дизайна: Figma node `1077:5884`
Статус: **реализовано**

---

## 1. Созданные файлы

| Файл | Статус |
|------|--------|
| `src/html/views/news.html` | ✅ создан |
| `src/scss/pages/_news.sass` | ✅ создан |
| `src/scss/pages/_pages.sass` | ✅ добавлен `@import "news"` |
| `src/scss/layout/_general.sass` — класс `.all` | ✅ обновлены брейкпоинты |

---

## 2. Класс `.all` (контейнер)

Определён в `src/scss/layout/_general.sass`. Переиспользуется на всех страницах.

```sass
.all
  width: 100%
  max-width: 1600px
  padding: 0 160px
  margin: 0 auto
  +r($xxl)   // 1160px
    padding: 0 40px
  +r($sm)    // 600px
    padding: 0 20px
```

---

## 3. HTML-структура (`news.html`)

```
[Header include]
[Mobile-menu (через footer include)]

<main class="news-page">
  <section class="news-article">
    <div class="news-article__inner all">   ← CSS Grid + .all контейнер
      <div class="news-article__aside">     ← колонка: фото (sticky)
        <img class="news-article__image" src="img/news.png">
      </div>
      <div class="news-article__head">      ← breadcrumb + H1
        <nav class="breadcrumb">...</nav>
        <h1 class="news-article__title">...</h1>
      </div>
      <div class="news-article__body-text"> ← текст + дата + разделитель
        <div class="news-article__text">...</div>
        <p class="news-article__date">...</p>
      </div>
      <div class="news-other">              ← «Другие новости» + карточки
        <h2 class="news-other__title">Другие новости</h2>
        <div class="news-other__cards">
          <article class="news-card">...</article>
          <article class="news-card">...</article>
        </div>
      </div>
    </div>
  </section>
</main>

[Footer include]
[#modal-booking — inline, идентично index.html]
```

---

## 4. CSS Grid — логика адаптива

### Desktop (базовый, > 1160px)
```
grid-template-columns: minmax(0, 50%) 1fr
grid-template-areas:
  "aside head"
  "aside body"
  "aside other"
column-gap: 60px
```
Фото: `position: sticky; top: 104px; height: calc(100vh - 104px); max-height: 800px`
Максимальная ширина колонки с фото: **50%** (не фиксированные 958px как в Figma)

### Tablet `+r($xxl)` — 1160px
```
grid-template-columns: 1fr
grid-template-areas: "head" "aside" "body" "other"
```
Фото: `position: static; height: 412px` — встаёт между H1 и текстом благодаря grid-areas

### Mobile `+r($sm)` — 600px
Фото: `height: 266px`
`.news-other__cards`: `flex-direction: column` (карточки в столбик)

---

## 5. Типографика (из Figma)

| Класс | Font | Size | Weight | LH | LS | Особое |
|-------|------|------|--------|-----|-----|--------|
| `.news-article__title` | Yeseva One | 34px | 400 | 48px | 1px | uppercase |
| `.news-article__text p` | Geist | 15px | 400 | 26px | — | opacity: 0.8 |
| `.news-article__date` | Geist | 13px | 600 | 24px | 1px | uppercase, opacity: 0.8 |
| `.breadcrumb__item` | Geist | 14px | 400 | 25px | — | opacity: 0.25 (inactive) / 1 (active) |
| `.news-other__title` | Geist | 22px | 600 | 29px | — | uppercase |
| `.news-card__title` | Geist | 18px | 600 | 29px | — | uppercase |
| `.news-card__desc` | Geist | 16px | 400 | 25px | — | opacity: 0.6 |
| `.news-card__link` | Geist | 16px | 400 | 25px | — | arrow SVG |

---

## 6. Карточка `.news-card`

```
background: #1a1a1a
border: 1px solid rgba(255,255,255,0.06)
border-radius: 2px
padding: 28px 28px 20px 22px
flex: 1 (равные колонки)
```

Кнопка «Подробнее» — inline SVG стрелка `→`

---

## 7. Изображение

Файл: `src/img/news.png` (уже существует)
На десктопе: `position: sticky`, прилипает к верху при прокрутке контента
На планшете: `height: 412px`, статичный поток
На мобильном: `height: 266px`
