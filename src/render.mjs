import { CONTACT, categories, faqs, formatAfghani, packages, services } from './content.mjs';

const navigation = [
  ['home', 'خانه', '/'],
  ['about', 'درباره ما', '/about/'],
  ['services', 'خدمات', '/services/'],
  ['packages', 'بسته‌ها', '/packages/'],
  ['contact', 'تماس با ما', '/contact/'],
];

const faDigit = (value) => String(value).replace(/[0-9]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const escapeScript = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
const whatsappUrl = (message) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
const packageMessage = (plan) => `سلام، برای خرید بستهٔ «${plan.name}» با مشخصات ${plan.details.join('، ')} و قیمت ${formatAfghani(plan.price)} راهنمایی می‌خواهم.`;

function socialLinks() {
  const handle = encodeURIComponent(CONTACT.socialHandle);
  const links = [
    { label: 'واتساپ', href: `https://wa.me/${CONTACT.whatsappNumber}`, icon: '<path d="M20.3 3.7A11.6 11.6 0 0 0 2 17.6L.5 23.5l6.1-1.6A11.6 11.6 0 0 0 23.5 10a11.5 11.5 0 0 0-3.2-6.3ZM12 21a9.6 9.6 0 0 1-4.9-1.3l-.4-.2-3.6.9 1-3.5-.2-.4A9.5 9.5 0 1 1 12 21Zm5.2-7.1c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.2-.8.9-1 .9-.4 0-.7-.2a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6.2-.5-.1-.5c-.1-.2-.7-1.7-1-2.3-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.6 1.2 3 1.3 3.2a11.8 11.8 0 0 0 4.6 4.1c.6.2 1.1.4 1.5.5.6.2 1.2.2 1.7.1.5-.1 1.7-.7 1.9-1.3.3-.6.3-1.1.2-1.3s-.2-.2-.5-.4Z"/>' },
    { label: 'اینستاگرام', href: `https://www.instagram.com/${handle}/`, icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/>' },
    { label: 'فیسبوک', href: `https://www.facebook.com/${handle}/`, icon: '<path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.7v3h2.7v8h3.1Z" fill="currentColor" stroke="none"/>' },
    { label: 'تلگرام', href: `https://t.me/${handle}`, icon: '<path d="m22 3-3.3 18c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1L18.2 7c.4-.4-.1-.6-.6-.2L5.1 14.7.2 13.2c-1.1-.3-1.1-1 .2-1.5L20 4.1C21 3.7 22.2 4.3 22 3Z" fill="currentColor" stroke="none"/>' },
  ];
  const cssNames = ['whatsapp', 'instagram', 'facebook', 'telegram'];
  return `<nav class="social-links" aria-label="صفحات اجتماعی">${links.map((item, index) => `<a class="social-link social-${cssNames[index]}" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}" title="${item.label}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${item.icon}</svg></a>`).join('')}</nav>`;
}

function header(activePage) {
  const links = navigation.map(([key, label, href]) => `<a class="nav-link${key === activePage ? ' is-current' : ''}" href="${href}"${key === activePage ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<a class="skip-link" href="#main-content">رفتن به محتوای اصلی</a>
    <header class="site-header"><div class="header-inner">
      <a class="brand" href="/" aria-label="خانه سراج جاغوریان">
        <img class="brand-logo" src="/assets/siraj-jaghorians-logo.png" alt="لوگوی سراج جاغوریان" width="76" height="76">
        <span class="brand-copy"><strong>سراج جاغوریان</strong><small>شرکت خدمات اینترنتی</small></span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span class="menu-icon" aria-hidden="true">☰</span><span class="sr-only">باز کردن فهرست</span></button>
      <nav class="primary-navigation" id="primary-navigation" aria-label="فهرست اصلی">${links}</nav>
      <a class="header-call" href="tel:${CONTACT.phone}">تماس با ما</a>
    </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-main">
    <div class="footer-brand"><a class="brand footer-logo" href="/" aria-label="خانه سراج جاغوریان"><img src="/assets/siraj-jaghorians-logo.png" alt="لوگوی سراج جاغوریان" width="90" height="90"><span class="brand-copy"><strong>سراج جاغوریان</strong><small>ICT · شرکت خدمات اینترنتی</small></span></a><p>همیشگی برای اینترنت، سریع‌تر و مطمئن‌تر. بسته‌ها و خدمات اینترنتی سراج جاغوریان را ببینید و برای سفارش با ما در تماس شوید.</p>
    <div class="footer-social"><span>شبکه‌های اجتماعی</span>${socialLinks()}</div></div>
    <div class="footer-column"><h2>پیوندها</h2>${navigation.map(([, label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>
    <div class="footer-column"><h2>ارتباط</h2><a href="tel:${CONTACT.phone}">${CONTACT.phone}</a><a href="mailto:${CONTACT.email}">${CONTACT.email}</a><a href="/contact/">فرستادن پیام</a></div>
  </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} سراج جاغوریان</span><span>تمامی حقوق محفوظ است.</span></div></footer>`;
}

function layout({ pageKey, title, description, body }) {
  return `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | سراج جاغوریان</title><meta name="description" content="${escapeHtml(description)}"><meta name="theme-color" content="#087cda">
    <link rel="icon" type="image/png" href="/assets/siraj-jaghorians-logo.png"><link rel="stylesheet" href="/assets/site.css">
    <script type="application/json" id="site-packages-data">${escapeScript(packages)}</script><script src="/assets/site.js" defer></script></head><body data-page="${pageKey}">${header(pageKey)}<main id="main-content">${body}</main>${footer()}</body></html>`;
}

function packageCard(plan, compact = false) {
  const details = plan.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('');
  const label = plan.category === 'monthly' ? 'بسته حجمی' : plan.categoryLabel;
  return `<article class="package-card${compact ? ' package-card-compact' : ''}" data-package-card data-category="${plan.category}" data-plan-id="${plan.id}">
    <span class="package-label">${escapeHtml(label)}</span><h3 class="package-name">${escapeHtml(plan.name)}</h3>
    <ul class="package-details">${details}<li class="package-duration">اعتبار: یک ماه</li></ul>
    <div class="package-price"><strong>${formatAfghani(plan.price)}</strong><span>قیمت</span></div>
    <a class="button button-outline package-action" href="${whatsappUrl(packageMessage(plan))}" target="_blank" rel="noopener noreferrer">شروع کنید</a>
  </article>`;
}

function serviceCards(items = services) {
  return `<div class="service-grid">${items.map((service) => `<article class="service-card"><span class="service-icon" aria-hidden="true">${service.icon}</span><h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.description)}</p><a class="text-link" href="/contact/">دریافت راهنمایی</a></article>`).join('')}</div>`;
}

function faqBlock(items = faqs) {
  return `<div class="faq-list">${items.map((faq) => `<details class="faq-item"><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join('')}</div>`;
}

function homePage() {
  const featured = [packages.find((plan) => plan.id === 'monthly-50'), packages.find((plan) => plan.id === 'home-1-3')];
  const previewPlan = packages.find((plan) => plan.id === 'monthly-150');
  const stats = [
    { key: 'package-count', value: packages.length, label: 'گزینهٔ بستهٔ اینترنت' },
    { key: 'category-count', value: categories.length, label: 'دستهٔ بسته' },
    { key: 'validity', value: 1, label: 'ماه اعتبار بسته‌ها' },
  ];
  return `<section class="home-hero container"><div class="home-hero-media"><img src="/assets/seraj-home-collage.png" alt="کارشناس خدمات اینترنتی، دفتر و نمونه‌ای از صفحهٔ حساب اینترنت" width="1248" height="1248"><div class="hero-float"><span class="wifi-mark" aria-hidden="true">⌁</span><span><strong>سراج جاغوریان</strong><small>شرکت خدمات اینترنتی</small></span></div></div>
    <div class="home-hero-copy"><span class="eyebrow">ارتباط بهتر برای خانه و کسب‌وکار</span><h1>اینترنت ساده‌تر با <span>سراج جاغوریان</span></h1><p>بسته‌های اینترنت را با سرعت، حجم و قیمت روشن مقایسه کنید. خدمات ما فعلاً فقط جاغوری را پوشش می‌دهد.</p><div class="hero-actions"><a class="button button-primary" href="/packages/">بسته‌های اینترنت</a><a class="button button-soft" href="https://wa.me/${CONTACT.whatsappNumber}" target="_blank" rel="noopener noreferrer">پیام واتساپ</a></div><div class="hero-contact"><span>تماس مستقیم</span><a href="tel:${CONTACT.phone}">${CONTACT.phone}</a></div></div></section>
    <section class="home-catalog-strip container" aria-label="نمای کلی بسته‌های اینترنت"><div class="catalog-strip-heading"><span class="eyebrow eyebrow-light">انتخاب آسان</span><strong>بستهٔ خود را در یک نگاه پیدا کنید</strong></div><div class="catalog-stats">${stats.map((stat) => `<div class="catalog-stat" data-catalog-stat="${stat.key}" data-value="${stat.value}"><strong>${faDigit(stat.value)}</strong><span>${stat.label}</span></div>`).join('')}</div></section>
    <section class="home-showcase section"><div class="container showcase-grid"><div class="showcase-copy"><span class="eyebrow">جزئیات روشن</span><h2>مشخصات و قیمت بسته‌ها کنار هم</h2><p>مقدار حجم، سرعت و قیمت را پیش از سفارش بررسی کنید و اگر برای انتخاب نیاز به راهنمایی داشتید، با ما در تماس شوید.</p><ul class="showcase-points"><li><span aria-hidden="true">✓</span> بسته‌های حجمی و نامحدود</li><li><span aria-hidden="true">✓</span> گزینه‌های خانگی و هات‌اسپات</li><li><span aria-hidden="true">✓</span> راه تماس مستقیم برای سفارش</li></ul><a class="text-link" href="/packages/">مقایسهٔ همهٔ بسته‌ها ←</a></div><div class="showcase-visual" data-home-order-preview aria-label="پیش‌نمایش جزئیات یک بسته"><div class="showcase-side-card showcase-side-card-left"><span class="showcase-icon" aria-hidden="true">⌁</span><strong>بسته‌های گوناگون</strong><small>انتخاب بر اساس نیاز</small></div><div class="showcase-phone"><div class="phone-speaker"></div><span class="phone-brand">سراج جاغوریان</span><small>پیش‌نمایش جزئیات بسته</small><div class="phone-plan"><span>${escapeHtml(previewPlan.name)}</span><strong>${formatAfghani(previewPlan.price)}</strong></div><div class="phone-details"><span>سرعت</span><strong>${escapeHtml(previewPlan.details[1]?.replace('سرعت ', '') ?? '')}</strong><span>اعتبار</span><strong>یک ماه</strong></div><a class="button button-primary" href="${whatsappUrl(packageMessage(previewPlan))}" target="_blank" rel="noopener noreferrer">سفارش در واتساپ</a><small class="phone-note">این پیش‌نمایش صفحهٔ وب است</small></div><div class="showcase-side-card showcase-side-card-right"><span class="showcase-icon" aria-hidden="true">◎</span><strong>ارتباط آسان</strong><small>پرسش و راهنمایی</small></div></div></div></section>
    <section class="home-featured section-tinted"><div class="container home-featured-layout"><div class="featured-intro"><span class="eyebrow">چند گزینه برای شروع</span><h2>بسته‌ای که با نیاز شما جور باشد</h2><p>جزئیات این بسته‌ها را ببینید یا همهٔ گزینه‌ها را با هم مقایسه کنید.</p><a class="button button-primary" href="/packages/">دیدن همهٔ بسته‌ها</a><a class="text-link featured-contact" href="/contact/">برای راهنمایی با ما در تماس شوید</a></div><div class="home-featured-cards" data-home-featured-packages>${featured.map((plan) => packageCard(plan, true)).join('')}</div></div></section>
    <section class="section container"><div class="section-heading"><span class="eyebrow">خدمات</span><h2>خدمات اینترنتی سراج جاغوریان</h2><p>برای بسته، هات‌اسپات و راه‌اندازی تجهیزات با ما در تماس شوید.</p></div>${serviceCards()}<div class="section-end"><a class="text-link" href="/services/">دیدن همهٔ خدمات</a></div></section>
    <section class="section container home-faq"><div class="section-heading"><span class="eyebrow">سوال بپرسید</span><h2>سوالات متداول</h2></div>${faqBlock()}<div class="section-end"><a class="text-link" href="/contact/">سوال دیگری دارید؟ با ما تماس بگیرید</a></div></section>`;
}

function aboutPage() {
  return `<section class="page-hero container"><span class="eyebrow">دربارهٔ ما</span><h1>ارتباطی روشن‌تر با سراج جاغوریان</h1><p>شرکت خدمات اینترنتی ICT سراج جاغوریان برای آشنایی آسان‌تر با بسته‌ها و خدمات اینترنتی در کنار شماست.</p></section>
    <section class="section container about-grid"><div class="about-photo"><img src="/assets/jaghori-home-hero.png" alt="نمای خانه و کوهستان در منطقه‌ای از افغانستان" width="1672" height="941"></div><div class="about-copy"><span class="eyebrow">سراج جاغوریان · ICT</span><h2>خدمات اینترنتی برای ارتباط هرروزه</h2><p>در این سایت می‌توانید بسته‌های اینترنت را با حجم، سرعت و قیمت‌شان ببینید، خدمات را بشناسید و برای خرید یا راهنمایی با ما تماس بگیرید.</p><p>فعلاً تنها جاغوری تحت پوشش خدمات ما است. برای بررسی پوشش در قریه یا ناحیهٔ خود در جاغوری، از فورم تماس استفاده کنید یا مستقیم پیام واتساپ بدهید.</p><a class="button button-primary" href="/contact/">با ما در ارتباط باشید</a></div></section>
    <section class="section section-tinted"><div class="container values-row"><div><span class="trust-icon">01</span><h2>اطلاعات روشن</h2><p>مشخصات و قیمت بسته‌ها در یک‌جا درج شده‌اند.</p></div><div><span class="trust-icon">02</span><h2>انتخاب بر اساس نیاز</h2><p>بسته‌های حجمی، نامحدود، خانگی و هات‌اسپات را مقایسه کنید.</p></div><div><span class="trust-icon">03</span><h2>پرسش و راهنمایی</h2><p>برای بررسی پوشش یا انتخاب بسته با ما در تماس شوید.</p></div></div></section>`;
}

function servicesPage() {
  return `<section class="page-hero container"><span class="eyebrow">خدمات سراج جاغوریان</span><h1>خدمات اینترنتی و راه‌اندازی تجهیزات</h1><p>برای خانه و محل کار، بسته‌های اینترنت را ببینید یا دربارهٔ تجهیزات مورد نیازتان از ما راهنمایی بخواهید.</p></section>
    <section class="section container">${serviceCards()}<div class="coverage-note"><strong>محدودهٔ خدمات</strong><span>فعلاً فقط جاغوری تحت پوشش است.</span></div><div class="service-panels"><article class="service-panel panel-blue"><div class="panel-symbol" aria-hidden="true">⌁</div><div><span class="eyebrow eyebrow-light">اتصال اینترنت</span><h2>بستهٔ مناسب خود را پیدا کنید</h2><p>مشخصات بسته‌های ماهانه، نامحدود و هات‌اسپات را بررسی کنید و برای سفارش با ما تماس بگیرید.</p><a class="button button-white" href="/packages/">دیدن بسته‌ها</a></div></article><article class="service-panel panel-navy"><div class="panel-symbol" aria-hidden="true">⌂</div><div><span class="eyebrow eyebrow-light">نصب و راه‌اندازی</span><h2>برای تجهیزات اینترنتی راهنمایی بگیرید</h2><p>برای گیرنده، روتر یا کابل مورد نیاز خود، جزئیات را برای ما بفرستید تا راهنمایی شوید.</p><a class="button button-white" href="/contact/">تماس با ما</a></div></article></div></section>`;
}

function packagesPage() {
  const filters = [{ id: 'all', label: 'همهٔ بسته‌ها' }, ...categories];
  return `<section class="page-hero container packages-heading"><span class="eyebrow">بسته‌های اینترنت</span><h1>بسته‌ای مطابق نیازتان انتخاب کنید</h1><p>سرعت، حجم، مدت و قیمت هر بسته را ببینید. برای شروع سفارش روی دکمهٔ همان بسته بزنید.</p></section>
    <section class="section container package-section"><div class="filter-row" role="group" aria-label="دسته‌بندی بسته‌ها">${filters.map((filter, index) => `<button class="filter-button${index === 0 ? ' is-active' : ''}" type="button" data-plan-filter="${filter.id}" aria-pressed="${index === 0}">${filter.label}</button>`).join('')}</div><p class="filter-status" data-filter-status aria-live="polite">همهٔ بسته‌ها نمایش داده شده‌اند.</p><div class="package-grid" data-package-grid>${packages.map((plan) => packageCard(plan)).join('')}</div>
    <div class="night-note"><span aria-hidden="true">◷</span><p>در بسته‌های نامحدود خانه، سرعت شبانه طبق مشخصات بسته از ساعت ۸ شب تا ۷ صبح دو برابر می‌شود.</p></div>
    <div class="package-help"><div><h2>برای انتخاب بسته راهنمایی می‌خواهید؟</h2><p>خدمات فعلاً فقط در جاغوری ارائه می‌شود. برای بررسی نشانی در جاغوری به ما پیام بدهید.</p></div><a class="button button-primary" href="https://wa.me/${CONTACT.whatsappNumber}" target="_blank" rel="noopener noreferrer">پیام در واتساپ</a></div></section>`;
}

function orderPage() {
  return `<section class="page-hero container"><span class="eyebrow">درخواست بسته</span><h1>به اینترنت پرسرعت بپیوندید</h1><p>مشخصات را وارد کنید تا پیش‌نویس ایمیل سفارش برایتان آماده شود. ارسال نهایی از طریق ایمیل خودتان انجام می‌شود.</p></section>
    <section class="section container form-layout"><div class="form-card"><div class="form-heading"><span class="eyebrow">اطلاعات سفارش</span><h2>مشخصات خود را بنویسید</h2></div><form data-order-form data-plan="" novalidate>
      <input type="hidden" name="package" id="selected-plan-id" value=""><input type="hidden" name="packageName" id="selected-plan-name" value="">
      <div class="form-grid"><label>نام<input name="firstName" autocomplete="given-name" required placeholder="نام شما"></label><label>نام خانوادگی<input name="lastName" autocomplete="family-name" required placeholder="نام خانوادگی شما"></label>
      <label class="form-span">ایمیل<input name="email" type="email" autocomplete="email" placeholder="you@example.com"></label><label>شماره اول<input name="phone" type="tel" autocomplete="tel" required placeholder="شماره تماس"></label><label>شماره دوم<input name="phone2" type="tel" placeholder="شمارهٔ جایگزین (اختیاری)"></label>
      <label class="form-span">نشانی در جاغوری<textarea name="address" rows="3" required placeholder="ناحیه و نشانی محل نصب در جاغوری"></textarea><small>فعلاً فقط جاغوری تحت پوشش است.</small></label>
      <label class="form-span">پیشنهاد یا توضیح<textarea name="note" rows="3" placeholder="اگر توضیحی دارید اینجا بنویسید"></textarea></label></div>
      <fieldset class="equipment-fieldset"><legend>برای راه‌اندازی به کدام تجهیزات نیاز دارید؟</legend><label><input type="checkbox" name="equipment" value="گیرنده"> گیرنده</label><label><input type="checkbox" name="equipment" value="روتر"> روتر</label><label><input type="checkbox" name="equipment" value="کابل"> کابل</label></fieldset>
      <p class="form-note">با فشردن دکمه، برنامهٔ ایمیل شما باز می‌شود. سایت اطلاعات را ذخیره نمی‌کند.</p><button class="button button-primary form-submit" type="submit">آماده‌کردن ایمیل سفارش</button><p class="form-status" data-form-status aria-live="polite"></p>
    </form></div><aside class="order-aside"><div class="selected-package" data-selected-package><span class="package-label">بستهٔ انتخاب‌شده</span><h2 data-selected-name>بسته‌ای هنوز انتخاب نشده</h2><ul class="package-details" data-selected-details><li>برای دیدن بسته‌ها، دکمهٔ زیر را بزنید.</li></ul><p class="package-price" data-selected-price></p><a class="button button-outline" href="/packages/">مشاهدهٔ بسته‌های دیگر</a></div><div class="direct-contact"><h2>تماس مستقیم</h2><a href="tel:${CONTACT.phone}">${CONTACT.phone}</a><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></div></aside></section>`;
}

function contactPage() {
  return `<section class="section container contact-layout"><div class="contact-copy"><span class="eyebrow">تماس با ما</span><h1>با ما در ارتباط باشید</h1><p>فعلاً فقط جاغوری تحت پوشش است. اگر در جاغوری هستید، برای پرسش دربارهٔ بسته‌ها یا بررسی ناحیهٔ خود پیام بدهید.</p><div class="coverage-note contact-coverage"><strong>محدودهٔ خدمات</strong><span>جاغوری، افغانستان</span></div><div class="contact-benefits"><div><span>تماس و راهنمایی</span><p>برای انتخاب بسته یا بررسی نشانی خود در جاغوری با ما در تماس شوید.</p></div><div><span>بازخورد و پیشنهاد</span><p>نظر و پیشنهاد شما به بهتر شدن خدمات کمک می‌کند.</p></div></div><div class="contact-cards"><a href="tel:${CONTACT.phone}"><span>تماس تلفنی</span><strong>${CONTACT.phone}</strong></a><a href="mailto:${CONTACT.email}"><span>ایمیل</span><strong>${CONTACT.email}</strong></a></div><div class="contact-social"><span>شبکه‌های اجتماعی</span>${socialLinks()}</div></div>
    <div class="form-card contact-form-card"><div class="form-heading"><h2>پیام خود را بفرستید</h2><p>خدمات فعلاً فقط در جاغوری ارائه می‌شود.</p></div><form data-contact-form novalidate><div class="form-grid"><label>نام<input name="firstName" autocomplete="given-name" required placeholder="نام شما"></label><label>نام خانوادگی<input name="lastName" autocomplete="family-name" required placeholder="نام خانوادگی شما"></label><label class="form-span">ایمیل<input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label><label class="form-span">تلفن<input name="phone" type="tel" autocomplete="tel" required placeholder="شماره تماس"></label><label class="form-span">ناحیه یا قریه در جاغوری<input name="area" required autocomplete="address-level2" placeholder="نام ناحیه یا قریه"></label><label class="form-span">پیام<textarea name="message" rows="4" required maxlength="1000" placeholder="چگونه می‌توانیم کمک کنیم؟"></textarea></label></div><button class="button button-primary form-submit" type="submit">آماده‌کردن ایمیل</button><p class="form-status" data-form-status aria-live="polite"></p></form></div></section>`;
}

const pageRenderers = {
  home: { title: 'خانه', description: 'بسته‌ها و خدمات اینترنتی سراج جاغوریان.', render: homePage },
  about: { title: 'درباره ما', description: 'با شرکت خدمات اینترنتی ICT سراج جاغوریان آشنا شوید.', render: aboutPage },
  services: { title: 'خدمات', description: 'خدمات اینترنت بی‌سیم، هات‌اسپات و راه‌اندازی تجهیزات سراج جاغوریان.', render: servicesPage },
  packages: { title: 'بسته‌ها', description: 'جزئیات سرعت، حجم و قیمت بسته‌های سراج جاغوریان.', render: packagesPage },
  order: { title: 'ثبت سفارش', description: 'درخواست بستهٔ اینترنت سراج جاغوریان را آماده کنید.', render: orderPage },
  contact: { title: 'تماس با ما', description: 'برای پرسش دربارهٔ پوشش یا بسته‌ها با سراج جاغوریان تماس بگیرید.', render: contactPage },
};

export function renderPage(pageKey, { basePath = '' } = {}) {
  const page = pageRenderers[pageKey];
  if (!page) throw new Error(`Unknown page: ${pageKey}`);
  const html = layout({ pageKey, title: page.title, description: page.description, body: page.render() });
  const normalizedBasePath = basePath ? `/${basePath.split('/').filter(Boolean).join('/')}` : '';
  if (!normalizedBasePath) return html;
  return html.replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (_match, attribute, url) => {
    const prefixedUrl = url === '/' ? `${normalizedBasePath}/` : `${normalizedBasePath}${url}`;
    return `${attribute}="${prefixedUrl}"`;
  });
}

export { categories, packages, services, faqs, CONTACT };
