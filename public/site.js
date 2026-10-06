(() => {
  const packageDataElement = document.querySelector('#site-packages-data');
  const packages = packageDataElement ? JSON.parse(packageDataElement.textContent) : [];

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      navigation.classList.toggle('is-open', !isOpen);
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
      }
    });
  }

  const filterButtons = [...document.querySelectorAll('[data-plan-filter]')];
  const planCards = [...document.querySelectorAll('[data-package-card]')];
  const filterStatus = document.querySelector('[data-filter-status]');
  if (filterButtons.length && planCards.length) {
    filterButtons.forEach((button) => button.addEventListener('click', () => {
      const selected = button.dataset.planFilter;
      let visible = 0;
      for (const card of planCards) {
        const show = selected === 'all' || card.dataset.category === selected;
        card.hidden = !show;
        if (show) visible += 1;
      }
      for (const item of filterButtons) {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      }
      if (filterStatus) filterStatus.textContent = selected === 'all' ? 'همهٔ بسته‌ها نمایش داده شده‌اند.' : `${visible} بسته در این دسته نمایش داده شده است.`;
    }));
  }

  const selectedPackage = document.querySelector('[data-selected-package]');
  const orderForm = document.querySelector('[data-order-form]');
  if (selectedPackage && orderForm) {
    const selectedId = new URLSearchParams(window.location.search).get('plan');
    const plan = packages.find((item) => item.id === selectedId);
    if (plan) {
      orderForm.dataset.plan = plan.id;
      document.querySelector('#selected-plan-id').value = plan.id;
      document.querySelector('#selected-plan-name').value = plan.name;
      selectedPackage.querySelector('[data-selected-name]').textContent = plan.name;
      selectedPackage.querySelector('[data-selected-details]').innerHTML = `${plan.details.map((detail) => `<li>${detail}</li>`).join('')}<li>اعتبار: یک ماه</li>`;
      selectedPackage.querySelector('[data-selected-price]').innerHTML = `<strong>${Number(plan.price).toLocaleString('fa-AF')} افغانی</strong>`;
    }
  }

  const showError = (form, message) => {
    const status = form.querySelector('[data-form-status]');
    if (!status) return;
    status.textContent = message;
    status.classList.add('is-error');
  };
  const showStatus = (form, message) => {
    const status = form.querySelector('[data-form-status]');
    if (!status) return;
    status.textContent = message;
    status.classList.remove('is-error');
  };
  const formToBody = (form, labels) => {
    const data = new FormData(form);
    return labels.map(([key, label]) => {
      const raw = data.getAll(key).filter(Boolean).join('، ');
      return raw ? `${label}: ${raw}` : '';
    }).filter(Boolean).join('\n');
  };
  const openEmailDraft = (form, subject, labels) => {
    if (!form.reportValidity()) {
      showError(form, 'لطفاً خانه‌های الزامی را کامل کنید.');
      return;
    }
    const body = formToBody(form, labels);
    const url = `mailto:mr.ali.ibrahimi.2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showStatus(form, 'پیش‌نویس ایمیل آماده شد؛ آن را در برنامهٔ ایمیل خود ارسال کنید.');
    window.location.href = url;
  };

  orderForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const labels = [
      ['packageName', 'بسته'], ['firstName', 'نام'], ['lastName', 'نام خانوادگی'], ['email', 'ایمیل'],
      ['phone', 'شماره اول'], ['phone2', 'شماره دوم'], ['address', 'آدرس'], ['note', 'پیشنهاد'], ['equipment', 'تجهیزات مورد نیاز'],
    ];
    openEmailDraft(orderForm, 'درخواست بستهٔ اینترنت - سراج جاغوریان', labels);
  });

  const contactForm = document.querySelector('[data-contact-form]');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const labels = [
      ['firstName', 'نام'], ['lastName', 'نام خانوادگی'], ['email', 'ایمیل'],
      ['phone', 'تلفن'], ['area', 'ناحیه یا قریه در جاغوری'], ['message', 'پیام'],
    ];
    openEmailDraft(contactForm, 'پیام از وبسایت سراج جاغوریان', labels);
  });
})();
