# План вёрстки главной страницы

Проект: лаунж-бар, Москва. Стек: Webpack 5, SASS (indented), jQuery, Bootstrap 5, Slick Carousel.
Все команды и файлы — в папке `html/`.

---

## Шаг 1. Очистка проекта

### 1.1 Удалить файлы целиком

| Файл/папка | Причина |
|---|---|
| `src/fonts/Roboto-Regular.ttf` | Шрифт не подключён нигде, проект использует Inter через Google Fonts |
| `src/uploads/test.jpg` | Тестовый заглушка |
| `src/html/views/second.html` | Страница-заглушка, не нужна |
| `src/scss/pages/cabinet/` | Каталог с панелью кабинета — не нужен |

### 1.2 Полностью очистить содержимое (оставить пустой файл)

| Файл | Что удалить |
|---|---|
| `src/scss/elements/_ui.sass` | Весь файл: `daterangepicker`, `badge-status`, PrimeVue-стили, `pagination`, `drop-select`, `progress-bar`, `.mobile-table`, `.table` и т.д. — всё это от другого проекта |
| `src/scss/pages/_login.sass` | Страница входа — не нужна |
| `src/scss/pages/_faq.sass` | FAQ-страница — не нужна |
| `src/scss/pages/_reports.sass` | Страница отчётов — не нужна |
| `src/scss/pages/_prav-info.sass` | Правовая страница — не нужна |
| `src/scss/pages/_contact.sass` | Контактная страница (будет в секции главной) |
| `src/scss/pages/_404.sass` | 404-страница — не нужна на этом этапе |

### 1.3 Обновить `src/scss/pages/_pages.sass`

Убрать все импорты кроме `_main`:

```sass
@import "main"
```

### 1.4 Очистить `src/scss/pages/_main.sass`

Удалить весь текущий контент (`.lvl-first`, `.lvl1`–`.lvl7`, `.card3in`, `.card2in`, `.anons`, `.diagnostic`, `.banner-career`, `.faq`, `.questions`, `.info-box`, `.banner-portal` — всё от другого проекта). Оставить пустой файл — контент будет добавляться в шагах 5–17.

### 1.5 Очистить `src/scss/components/_header.sass`

Удалить всё содержимое — будет переписан с нуля.

### 1.6 Очистить `src/scss/components/_footer.sass`

Удалить всё содержимое — будет переписан с нуля.

### 1.7 Урезать `src/scss/components/_modals.sass`

Оставить только базовую систему `.just-modal` (анимации, оверлей, обёртка). Удалить специфические вариации других проектов:
- `.modal-covering-letter`
- `.modal-big`, `.modal-middle`
- `.modal-anons`
- `.just-modal--right` и весь блок модалки-ящика
- `.modal-data` и `.modal-data-*`
- `.modal-review`, `.review-list`, `.review-item`

### 1.8 Обновить `src/scss/layout/_general.sass`

Удалить:
- `.mode-admin` (панель администратора)
- `.dev-bp-debug` (отладочный элемент брейкпоинтов — убрать перед продакшном)

Обновить `.all` (контейнер): под дизайн используется `max-width: 1600px` (с `padding: 0 160px` на десктопе, `padding: 0 196px` на 1160px, `padding: 0 20px` на 360px).

### 1.9 Обновить `src/scss/utilities/_variables.sass`

Полностью заменить цветовую схему под тёмный дизайн лаунж-бара:

```sass
// Базовые цвета — тёмная тема
$colorBg: #0D0D0D          // основной тёмный фон
$colorBgSecond: #1A1A1A    // вторичный фон секций
$colorText: #FFFFFF         // основной текст
$colorTextMuted: rgba(255,255,255, .6)  // приглушённый текст
$colorAccent: #C9A96E       // акцент (золотой/бронза — под дизайн)
$colorAccentHover: #B8925A

// Кнопки — светлые на тёмном
$clrPrimaryMain: $colorAccent
$clrPrimaryHover: $colorAccentHover

// Шрифты
$baseFont: 'Geist', sans-serif        // основной текст (Google Fonts)
$fontDisplay: 'Yeseva One', serif     // заголовки H1–H2 (Google Fonts)
```

> Точные цвета акцента уточнить при работе с кнопками — в Figma видны слои Glow/Blur/Fill (glassmorphism-эффект). Текстовый градиент заголовков: от `#FFFFFF` до `#B4A379`.

### 1.10 Обновить `src/js/static-js.js`

Удалить строку `console.log($)`.

### 1.11 Обновить `src/html/views/index.html`

Удалить шаблонный контент (кнопка «Модальное окно», `<pre>` с инструкцией). Оставить только обёртку шаблона и импорты includes. Контент будет добавляться в шагах 4–17.

---

## Шаг 2. Установка зависимостей

```bash
npm install slick-carousel
```

В `src/js/index.js` добавить:
```js
import 'slick-carousel';
```

В `src/scss/style.scss` добавить после импортов компонентов:
```scss
@import '../../node_modules/slick-carousel/slick/slick.css';
@import '../../node_modules/slick-carousel/slick/slick-theme.css';
@import 'components/sliders';   // кастомные overrides — создать в шаге 2
```

Создать пустой файл `src/scss/components/_sliders.sass`.

---

## Шаг 3. Подключение шрифтов через Google Fonts

Оба шрифта — бесплатные Google Fonts, файлы скачивать не нужно.

В `src/html/includes/head.html` (или в `<head>` `index.html`) добавить:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600&family=Yeseva+One&display=swap" rel="stylesheet">
```

- **Yeseva One** (Regular 400) — заголовки H1–H2, одно начертание.
- **Geist** (400 + 600 SemiBold) — основной текст и подзаголовки.

Шаг 1.3 (`_fontstylesheet.scss`) остаётся без изменений — `@include font-face` для локальных файлов больше не нужен для этих шрифтов. Файл `src/fonts/` может оставаться пустым (или в нём останутся только иконочные шрифты, если появятся).

---

## Шаг 4. Header

**Файлы:** `src/html/includes/header.html`, `src/scss/components/_header.sass`

### HTML-структура
```html
<header class="header js-header">
  <div class="header__inner">
    <nav class="header__nav-left">
      <ul>
        <li><a href="#interior">Интерьер</a></li>
        <li><a href="#events">Афиша</a></li>
        <li><a href="#contacts">Контакты</a></li>
      </ul>
    </nav>

    <a class="header__logo" href="/">
      <img src="img/logo.png" alt="Логотип">
    </a>

    <nav class="header__nav-right">
      <ul>
        <li><a href="#menu">Меню</a></li>
        <li><a href="#hookah">Кальяны</a></li>
        <li><a href="#bar">Бар</a></li>
        <li><a href="#rental">Аренда</a></li>
        <li>
          <button class="btn js-btn-modal" data-modal="modal-booking">
            Забронировать
          </button>
        </li>
      </ul>
    </nav>

    <button class="header__burger js-burger" aria-label="Меню">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

### SCSS
- Фиксированная шапка, `position: fixed`, `z-index: 100`
- Прозрачный фон, переходящий в тёмный при скролле (JS-класс `is-scrolled`)
- На `+r($xxl)` — скрыть `.header__nav-left` и `.header__nav-right`, показать `.header__burger`
- Высота: 104px desktop, 60px на 1160px, 52px mobile

### JS (в `static-js.js`)
```js
// Затемнение header при скролле
$(window).on('scroll', function() {
  $('.js-header').toggleClass('is-scrolled', $(this).scrollTop() > 50);
});
```

---

## Шаг 5. Секция Hero (видео-фон)

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`

### HTML
```html
<section class="hero">
  <!-- <video class="hero__video" autoplay loop muted playsinline>
    <source src="uploads/hero.mp4" type="video/mp4">
  </video> -->
  <img class="hero__bg" src="img/hero.jpg" alt="">
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title">Лаунж-пространство в сердце Москвы</h1>
  </div>
</section>
```

> Изображение взято из Figma (node `1076:5024`), сохранить как `src/img/hero.jpg`. Когда будет готово видео — раскомментировать `<video>` и удалить `<img class="hero__bg">`.

### SCSS
- Высота: `890px` desktop, `1200px` на `$xxl` (1160px), `634px` на `$xss` (360px)
- Видео: `object-fit: cover`, абсолютное позиционирование, `z-index: 0`
- `.hero__overlay` — градиент снизу: `linear-gradient(to bottom, transparent 35%, rgba(0,0,0,.37) 63%, rgba(0,0,0,.45) 80%)`
- `.hero__content` — абсолютное, внизу (padding-bottom ~229px на desktop), выровнено по центру
- `.hero__title` — Yeseva One, 48px, uppercase, `letter-spacing: 1.5px`, белый, `max-width: 662px`, text-center

---

## Шаг 6. Секция «О заведении» (текст + фото)

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`

Figma: `4 / Афиша` (y=890, h=746)

### HTML
```html
<section class="about">
  <div class="about__container">
    <div class="about__content">
      <h2 class="about__title">ПОГРУЗИТЕСЬ В АТМОСФЕРУ УЮТА И СТИЛЯ</h2>
      <p class="about__text">Наш интерьер сочетает мягкие зоны...</p>
      <address class="about__address">
        <span>г.Москва ул.Новоостаповская д.20</span>
        <a href="tel:+70000000000">+7 (000) 000-00-00</a>
      </address>
      <button class="btn js-btn-modal" data-modal="modal-booking">Подробнее о нас</button>
    </div>
    <div class="about__image"></div>  <!-- bg-image через inline style или CSS -->
  </div>
</section>
```

> **Кнопка**: на 360px в Figma — «Подробнее о нас». Текст кнопки на desktop требует уточнения у клиента; до уточнения использовать то же.

### SCSS
- 2 колонки на desktop: текст слева (741px), изображение справа (825×624, `border-radius: 24px`)
- На `+r($xxl)` — 1 колонка, изображение снизу
- На `+r($xss)` — изображение убирается или уменьшается

---

## Шаг 7. Слайдер интерьера (Slick)

**Файлы:** `src/html/views/index.html`, `src/scss/components/_sliders.sass`, `src/js/static-js.js`

Figma: `2 / Интерьер` (y=1636, h=622) — «Слайдер для блока Интерьер»

### HTML
```html
<section class="interior" id="interior">
  <div class="interior__slider js-interior-slider">
    <div class="interior__slide">
      <img src="img/interior-1.jpg" alt="">
      <span class="interior__caption">Общий зал</span>
    </div>
    <div class="interior__slide">
      <img src="img/interior-2.jpg" alt="">
      <span class="interior__caption">Сцена</span>
    </div>
    <!-- Зона для работы, Общая зона и др. -->
  </div>
</section>
```

### Slick init (в `static-js.js`)
```js
$('.js-interior-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  centerMode: true,
  centerPadding: '80px',
  responsive: [
    { breakpoint: 1161, settings: { slidesToShow: 2, centerPadding: '40px' } },
    { breakpoint: 601,  settings: { slidesToShow: 1, centerMode: false, centerPadding: '0' } }
  ]
});
```

---

## Шаг 8. Секция «Гастрономическое удовольствие»

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`

Figma: `2 / Интерьер` (y=2258, h=854, node `1076:5037`) — полноширинная секция с тёмным фоновым изображением и двумя текстовыми блоками.

### HTML
```html
<section class="gastro">
  <div class="gastro__bg"></div><!-- фоновое фото + тёмный радиальный градиент-оверлей -->
  <div class="gastro__top">
    <p class="gastro__subtitle">ИЗЫСКАННЫЕ КОКТЕЙЛИ И БЛЮДА АВТОРСКОЙ КУХНИ</p>
    <h2 class="gastro__title">Гастрономическое удовольствие</h2>
  </div>
  <div class="gastro__bottom">
    <h3 class="gastro__label">Наше меню</h3>
  </div>
</section>
```

### SCSS
- `height: 854px` desktop, адаптируется
- `.gastro__bg` — абсолютный `inset: 0`, фото `object-fit: cover` + поверх радиальный SVG-градиент `rgba(0,0,0,0.82)` (тёмный вигнет от краёв к центру)
- `.gastro__top` — абсолютно, правая половина (от `left: 550px`), сверху; содержит `h2` + подпись
- `.gastro__bottom` — абсолютно, горизонтально по центру, снизу (`top: ~742px`)
- `.gastro__title`, `.gastro__label` — Yeseva One 40px, `letter-spacing: 1px`, uppercase, текст-градиент `#FFFFFF → #B4A379`
- `.gastro__subtitle` — Geist SemiBold 15px, белый `opacity: 0.6`, uppercase

> На 1160px и 360px: секция в Figma не раскрыта — уточнить компоновку при вёрстке (вероятно, стек вертикально).

---

## Шаг 9. Карточки меню (3 шт.)

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`

Figma: `4 / Афиша` (y=3112, h=844) — Кальян, Основное меню, Барная карта

### HTML
```html
<section class="menu-section" id="menu">
  <div class="menu-section__grid">

    <article class="menu-card">
      <div class="menu-card__image" style="background-image:url(img/menu-hookah.jpg)"></div>
      <div class="menu-card__body">
        <h3 class="menu-card__title">Кальян</h3>
        <p class="menu-card__text">В нашем меню кальянов — только лучшие сочетания...</p>
        <a href="#" class="btn btn--ghost btn--sm">Меню</a>
      </div>
    </article>

    <!-- Основное меню, Барная карта -->
  </div>
</section>
```

### SCSS
- Desktop: 3 колонки одинаковой ширины, карточка `height: 720px`
- На `+r($xxl)` (1160px): горизонтальная карточка — фото слева (348px), текст справа, стек вертикальный
- На `+r($xss)` (360px): вертикальная карточка, фото сверху

---

## Шаг 10. Блок «Сервис / Приложение»

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`

Figma: `2 / Интерьер` (y=3956, h=576)

### HTML
```html
<section class="service">
  <div class="service__inner">
    <div class="service__info">
      <h2 class="service__title">Сервис</h2>
      <div class="service__tabs">
        <button class="service__tab is-active js-service-tab">Система лояльности</button>
        <button class="service__tab js-service-tab">Акции</button>
        <button class="service__tab js-service-tab">Аренда зала</button>
      </div>
      <p>скачайте приложение чтобы получать скидки...</p>
      <button class="btn">Скачать приложение</button>
    </div>
    <div class="service__image"></div>
  </div>
</section>
```

### JS — переключение активного таба (в `static-js.js`)
```js
$('.js-service-tab').on('click', function() {
  $('.js-service-tab').removeClass('is-active');
  $(this).addClass('is-active');
});
```

---

## Шаг 11. Блок «Афиша / Новости» со слайдером (Slick)

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`, `src/scss/components/_sliders.sass`, `src/js/static-js.js`

Figma: `4 / Афиша` (y=4532, h=645)

### HTML
```html
<section class="events" id="events">
  <div class="events__inner">

    <div class="events__intro">
      <h2 class="events__title">Скоро открытие лаунж-пространства</h2>
      <p>Авторские коктейли и атмосфера премиального комфорта...</p>
      <time>1 июня 2026</time>
      <button class="btn js-btn-modal" data-modal="modal-booking">Забронировать</button>
    </div>

    <div class="events__slider-wrap">
      <button class="events__arrow events__arrow--prev js-events-prev" aria-label="Назад"></button>
      <div class="events__slider js-events-slider">
        <article class="events__card">
          <div class="events__card-image"></div>
          <div class="events__card-body">
            <h4>ПРИМЕР ЗАГОЛОВКА НОВОСТИ</h4>
            <p>Короткое описание новости/мероприятия...</p>
            <a href="#" class="btn btn--ghost btn--sm">Подробнее</a>
          </div>
        </article>
        <!-- ещё карточки -->
      </div>
      <button class="events__arrow events__arrow--next js-events-next" aria-label="Вперёд"></button>
    </div>

  </div>
</section>
```

### Slick init (в `static-js.js`)
```js
$('.js-events-slider').slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow: $('.js-events-prev'),
  nextArrow: $('.js-events-next'),
  responsive: [
    { breakpoint: 1161, settings: { slidesToShow: 2 } },
    { breakpoint: 601,  settings: { slidesToShow: 1 } }
  ]
});
```

---

## Шаг 12. ВИП-залы (full-screen слайдер, Slick)

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`, `src/scss/components/_sliders.sass`, `src/js/static-js.js`

Figma: `2 / Интерьер` (y=5177, h=866)

### HTML
```html
<section class="vip">
  <div class="vip__slider-wrap">
    <button class="vip__arrow vip__arrow--prev js-vip-prev" aria-label="Назад"></button>
    <div class="vip__slider js-vip-slider">
      <div class="vip__slide" style="background-image: url(img/vip-1.jpg)"></div>
      <div class="vip__slide" style="background-image: url(img/vip-2.jpg)"></div>
    </div>
    <button class="vip__arrow vip__arrow--next js-vip-next" aria-label="Вперёд"></button>
  </div>
  <div class="vip__text">
    <h2>Вип-залы для вашего отдыха</h2>
    <p>Мы продумали каждую деталь, чтобы вам было комфортно</p>
  </div>
</section>
```

### Slick init (в `static-js.js`)
```js
$('.js-vip-slider').slick({
  slidesToShow: 1,
  fade: true,
  cssEase: 'linear',
  prevArrow: $('.js-vip-prev'),
  nextArrow: $('.js-vip-next')
});
```

### SCSS
- `height: 866px` desktop → адаптируется
- `.vip__text` — абсолютное позиционирование, внизу слайдера, поверх изображения
- Тёмный полупрозрачный градиент снизу

---

## Шаг 13. Форма бронирования

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`, `src/js/static-js.js`

Figma: `5 / Блок с фото` (y=6043, h=725)

### HTML
```html
<section class="booking" id="booking">
  <div class="booking__inner">
    <h2 class="booking__title">Забронируйте пространство в центре столицы</h2>
    <form class="booking-form">
      <div class="booking-form__row">
        <input class="booking-form__input" name="name"     placeholder="Ваше имя"       required>
        <input class="booking-form__input" name="phone"    placeholder="Номер телефона"  required>
      </div>
      <div class="booking-form__row">
        <input class="booking-form__input" name="datetime" placeholder="Дата и время"    required>
        <div class="booking-form__input booking-form__counter">
          <span class="booking-form__counter-label">Количество персон</span>
          <div class="persons-counter js-persons-counter">
            <button type="button" class="js-counter-minus">−</button>
            <span class="js-counter-value">1</span>
            <button type="button" class="js-counter-plus">+</button>
          </div>
        </div>
      </div>
      <input class="booking-form__input booking-form__input--full" name="comment" placeholder="Комментарий">
      <label class="booking-form__agree">
        <input type="checkbox" required>
        <span>Нажимая «забронировать стол», я подтверждаю согласие с политикой конфиденциальности</span>
      </label>
      <button type="submit" class="btn booking-form__submit">Забронировать стол</button>
    </form>
  </div>
</section>
```

### JS — PersonsCounter класс (в `static-js.js`)
```js
class PersonsCounter {
  constructor(el) {
    this.$wrap  = $(el);
    this.$value = this.$wrap.find('.js-counter-value');
    this.min    = 1;
    this.max    = 30;
    this._bind();
  }
  _bind() {
    this.$wrap.find('.js-counter-minus').on('click', () => this._change(-1));
    this.$wrap.find('.js-counter-plus').on('click',  () => this._change(+1));
  }
  _change(delta) {
    const next = parseInt(this.$value.text()) + delta;
    if (next >= this.min && next <= this.max) this.$value.text(next);
  }
}

// Инициализация (может быть несколько: в секции и в модалке)
$('.js-persons-counter').each(function() { new PersonsCounter(this); });
```

---

## Шаг 14. Карта

**Файлы:** `src/html/views/index.html`, `src/scss/pages/_main.sass`

Figma: `8 / Контакты` (y=6768, h=514)

### HTML
```html
<section class="contacts" id="contacts">
  <div class="contacts__map">
    <iframe
      src="https://yandex.ru/map-widget/v1/?..."
      width="100%"
      height="514"
      frameborder="0"
      allowfullscreen>
    </iframe>
  </div>
  <a class="contacts__link" href="https://yandex.ru/maps/..." target="_blank">
    Проспект Вернадского
  </a>
</section>
```

### SCSS
- Карта: `width: 100%`, `height: 514px` desktop, `height: 323px` mobile (`+r($xss)`)
- `.contacts__link` — абсолютное позиционирование поверх карты

---

## Шаг 15. Footer

**Файлы:** `src/html/includes/footer.html`, `src/scss/components/_footer.sass`

Figma: `Footer` instance (y=7282, h=391) и `Footer 1600` (1160px)

### HTML
```html
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__top">
      <a class="footer__logo" href="/"><img src="img/logo.png" alt=""></a>

      <div class="footer__contacts">
        <a href="..."><svg><!-- pin icon --></svg> г.Москва ул.Новоостаповская д.20</a>
        <a href="tel:+70000000000"><svg><!-- phone icon --></svg> +7 (000) 000-00-00</a>
        <a href="mailto:..."><svg><!-- mail icon --></svg> email@example.com</a>
        <div class="footer__socials">
          <a href="#" aria-label="Telegram"><img src="img/telegram.svg"></a>
          <a href="#" aria-label="VK"><img src="img/vk.svg"></a>
        </div>
      </div>

      <nav class="footer__nav">
        <ul class="footer__nav-col">
          <li><a href="#">Ссылка 1</a></li>
          <li><a href="#">Ссылка 2</a></li>
          <li><a href="#">Ссылка 3</a></li>
          <li><a href="#">Ссылка 4</a></li>
        </ul>
        <ul class="footer__nav-col">
          <li><a href="#">Ссылка 5</a></li>
          <li><a href="#">Ссылка 6</a></li>
          <li><a href="#">Ссылка 7</a></li>
        </ul>
      </nav>
    </div>

    <hr class="footer__divider">

    <div class="footer__bottom">
      <div class="footer__docs">
        <a href="#">Политика обработки персональных данных</a>
        <a href="#">Согласие на получение рассылки</a>
        <a href="#">Файлы Cookie</a>
      </div>
    </div>
  </div>
</footer>
```

### SCSS
- Desktop: flex-row, 3 блока (лого+контакты слева, навигация справа)
- `+r($xxl)`: 2 колонки
- `+r($xss)`: 1 колонка, стек

---

## Шаг 16. Мобильное меню

**Файлы:** `src/html/includes/mobile-menu.html`, `src/scss/components/_header.sass`

Figma: `Мобильное меню` (360x616)

### HTML
```html
<div class="mobile-menu js-mobile-menu">
  <div class="mobile-menu__overlay js-mobile-menu-close"></div>
  <div class="mobile-menu__inner">
    <div class="mobile-menu__header">
      <a class="mobile-menu__logo" href="/"><img src="img/logo.png" alt=""></a>
      <button class="mobile-menu__close js-mobile-menu-close" aria-label="Закрыть"></button>
    </div>
    <div class="mobile-menu__info">
      <a href="...">г.Москва ул.Новоостаповская д.20</a>
      <a href="tel:+70000000000">+7 (000) 000-00-00</a>
    </div>
    <nav class="mobile-menu__nav">
      <ul>
        <li><a href="#interior" class="js-mobile-menu-close">Интерьер</a></li>
        <li><a href="#menu"     class="js-mobile-menu-close">Меню</a></li>
        <li><a href="#hookah"   class="js-mobile-menu-close">Кальяны</a></li>
        <li><a href="#bar"      class="js-mobile-menu-close">Барная карта</a></li>
        <li><a href="#events"   class="js-mobile-menu-close">Афиша</a></li>
        <li><a href="#contacts" class="js-mobile-menu-close">Контакты</a></li>
      </ul>
    </nav>
    <a class="mobile-menu__book js-btn-modal js-mobile-menu-close" data-modal="modal-booking" href="#">
      <svg><use xlink:href="#icon-arrow-right"></use></svg>
      Бронь
    </a>
  </div>
</div>
```

> В Figma «Бронь» оформлена как ссылка с иконкой-стрелкой, а не как кнопка. Использовать `<a>`, стилизовать как inline-link с иконкой справа.

### JS — MobileMenu класс (в `static-js.js`)
```js
class MobileMenu {
  constructor() {
    this.$menu   = $('.js-mobile-menu');
    this.$burger = $('.js-burger');
    this._bind();
  }
  _bind() {
    this.$burger.on('click', () => this.open());
    $('.js-mobile-menu-close').on('click', () => this.close());
  }
  open()  { this.$menu.addClass('is-open'); $('body').addClass('lock'); }
  close() { this.$menu.removeClass('is-open'); $('body').removeClass('lock'); }
}
```

---

## Шаг 17. Модальное окно бронирования

**Файлы:** `src/html/includes/booking-modal.html`, `src/scss/components/_modals.sass`

Figma: `Бронирование` (800×639) + `Бронирование моб` (340×599)

Использует существующую систему JustModal.

### HTML (в `booking-modal.html`, импортируется в `index.html`)
```html
<div class="just-modal booking-modal" id="modal-booking">
  <div class="just-modal__overlay js-just-modal__close"></div>
  <div class="just-modal__wrapper">
    <div class="just-modal__container">
      <div class="just-modal__body">
        <button class="just-modal__close js-just-modal__close" aria-label="Закрыть"></button>
        <h2 class="booking-modal__title">Забронируйте пространство</h2>
        <!-- Та же форма .booking-form что в шаге 13 -->
      </div>
    </div>
  </div>
</div>
```

### SCSS
- `.booking-modal .just-modal__container` — `max-width: 800px`
- На `+r($xss)` — `max-width: 100%`, полноэкранный

---

## Шаг 18. Финальный JS: сборка инициализации

В `src/js/static-js.js` привести к итоговой структуре:

```js
import $ from 'jquery';

$(function() {
  // --- Существующий код JustModal ---
  $(".js-btn-modal").on("click", function() { /* ... */ });
  $(".just-modal__overlay, .js-just-modal__close").on("click", function() { /* ... */ });

  // --- Header scroll ---
  $(window).on('scroll', function() {
    $('.js-header').toggleClass('is-scrolled', $(this).scrollTop() > 50);
  });

  // --- Slick слайдеры ---
  $('.js-interior-slider').slick({ /* шаг 7 */ });
  $('.js-events-slider').slick({ /* шаг 11 */ });
  $('.js-vip-slider').slick({ /* шаг 12 */ });

  // --- Счётчик персон ---
  $('.js-persons-counter').each(function() { new PersonsCounter(this); });

  // --- Мобильное меню ---
  new MobileMenu();

  // --- Табы в секции Сервис ---
  $('.js-service-tab').on('click', function() {
    $('.js-service-tab').removeClass('is-active');
    $(this).addClass('is-active');
  });
});
```

---

## Шаг 19. Адаптив и финальная проверка

### Брейкпоинты для проверки

| Ширина | Переменная | Проверить |
|---|---|---|
| 1920px | — | Desktop: базовый вид |
| 1160px | `$xxl` | Tablet: перестройка сеток |
| 600px | `$sm` | Mobile landscape |
| 360px | `$xss` | Mobile portrait |

### Чеклист проверки
- [ ] Header фиксируется и не перекрывает контент
- [ ] Видео-герой воспроизводится без звука
- [ ] Все три Slick-слайдера работают и адаптируются
- [ ] Форма бронирования открывается в модалке по кнопкам «Забронировать»
- [ ] Счётчик персон работает в обоих местах (секция + модалка)
- [ ] Мобильное меню открывается и закрывается, ссылки ведут к секциям
- [ ] Карта отображается
- [ ] `body.lock` применяется при открытии меню и модалки
- [ ] `npm run build` проходит без ошибок

---

## Структура файлов по итогу

```
src/
├── fonts/
│   └── (пусто — шрифты Yeseva One и Geist подключены через Google Fonts в шаге 3)
├── img/
│   ├── logo.png
│   └── [фото интерьера, ВИП-залов и т.д.]
├── icons/
│   ├── logo.svg
│   └── check.svg
├── js/
│   ├── index.js                 ← + import slick
│   └── static-js.js            ← полная перезапись
├── html/
│   ├── views/
│   │   └── index.html           ← полная перезапись
│   └── includes/
│       ├── header.html          ← перезапись
│       ├── footer.html          ← перезапись
│       ├── mobile-menu.html     ← перезапись
│       └── booking-modal.html   ← новый файл
└── scss/
    ├── style.scss               ← добавить импорт slick + _sliders
    ├── utilities/
    │   ├── _variables.sass      ← обновить цвета (шаг 1.9)
    │   ├── _mixins.sass
    │   └── _utils.sass
    ├── modules/
    │   ├── _reset.scss
    │   ├── _mixin_font-face.scss
    │   ├── _fontstylesheet.scss  ← без изменений (шрифты через Google Fonts в HTML)
    │   └── _print.scss
    ├── elements/
    │   ├── _ui.sass              ← очищен (шаг 1.2)
    │   ├── _typography.sass
    │   ├── _buttons.sass
    │   ├── _inputs.sass
    │   ├── _forms.sass
    │   └── _icons.sass
    ├── layout/
    │   └── _general.sass        ← обновлён (шаг 1.8)
    ├── components/
    │   ├── _header.sass         ← перезапись (шаг 4)
    │   ├── _footer.sass         ← перезапись (шаг 15)
    │   ├── _modals.sass         ← урезан (шаг 1.7) + booking-modal (шаг 17)
    │   └── _sliders.sass        ← новый (шаг 2)
    └── pages/
        ├── _pages.sass          ← только @import "main"
        └── _main.sass           ← наполняется в шагах 5–15
```
