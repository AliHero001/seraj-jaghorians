export const CONTACT = {
  phone: '0766867136',
  whatsappNumber: '93766867136',
  email: 'mr.ali.ibrahimi.2004@gmail.com',
  socialHandle: 'ali_hero083',
};

export const categories = [
  { id: 'monthly', label: 'بسته‌های ماهانه' },
  { id: 'unlimited', label: 'نامحدود ماهانه' },
  { id: 'home', label: 'نامحدود خانه' },
  { id: 'hotspot', label: 'هات‌اسپات' },
];

export const packages = [
  { id: 'monthly-30', category: 'monthly', categoryLabel: 'بسته حجمی', name: '30GB', details: ['۳۰ گیگابایت حجم', 'سرعت ۳ Mbps', 'مدت یک ماه'], price: 600 },
  { id: 'monthly-50', category: 'monthly', categoryLabel: 'بسته حجمی', name: '50GB', details: ['۵۰ گیگابایت حجم', 'سرعت ۳ Mbps', 'مدت یک ماه'], price: 1000 },
  { id: 'monthly-150', category: 'monthly', categoryLabel: 'بسته حجمی', name: '150GB', details: ['۱۵۰ گیگابایت حجم', 'سرعت ۵ Mbps', 'مدت یک ماه'], price: 1500 },
  { id: 'monthly-500', category: 'monthly', categoryLabel: 'بسته حجمی', name: '500GB', details: ['۵۰۰ گیگابایت حجم', 'سرعت ۶ Mbps', 'مدت یک ماه'], price: 4000 },
  { id: 'unlimited-15', category: 'unlimited', categoryLabel: 'نامحدود', name: '1.5 Mbps', details: ['سرعت دریافت ۱٫۵ Mbps', 'سرعت ارسال ۵ Mbps', 'مدت یک ماه'], price: 1650 },
  { id: 'unlimited-2', category: 'unlimited', categoryLabel: 'نامحدود', name: '2 Mbps', details: ['سرعت دریافت ۲ Mbps', 'سرعت ارسال ۲ Mbps', 'مدت یک ماه'], price: 2100 },
  { id: 'home-1-2', category: 'home', categoryLabel: 'نامحدود خانه', name: '1 / 2 Mbps', details: ['سرعت روزانه ۱ Mbps', 'سرعت شبانه ۲ Mbps', 'دو برابر از ۸ شب تا ۷ صبح'], price: 1650 },
  { id: 'home-1-3', category: 'home', categoryLabel: 'نامحدود خانه', name: '1 / 3 Mbps', details: ['سرعت روزانه ۱ Mbps', 'سرعت شبانه ۳ Mbps', 'دو برابر از ۸ شب تا ۷ صبح'], price: 2000 },
  { id: 'home-2-4', category: 'home', categoryLabel: 'نامحدود خانه', name: '2 / 4 Mbps', details: ['سرعت روزانه ۲ Mbps', 'سرعت شبانه ۴ Mbps', 'دو برابر از ۸ شب تا ۷ صبح'], price: 3000 },
  ...Array.from({ length: 10 }, (_, index) => {
    const size = index + 1;
    return {
      id: `hotspot-${size}`,
      category: 'hotspot',
      categoryLabel: 'پکیج هات‌اسپات',
      name: `${size}GB`,
      details: [`حجم ${size} گیگابایت`, 'سرعت ۳ Mbps', 'مدت یک ماه'],
      price: size * 30,
    };
  }),
];

export const services = [
  {
    icon: '⌁',
    title: 'اینترنت بی‌سیم',
    description: 'بسته‌های اینترنت برای استفادهٔ روزمره در خانه و محل کار؛ گزینه‌ها و قیمت‌ها را در بخش بسته‌ها ببینید.',
  },
  {
    icon: '◉',
    title: 'بسته‌های هات‌اسپات',
    description: 'انتخاب حجم هات‌اسپات از ۱ تا ۱۰ گیگابایت با اعتبار یک‌ماهه و سرعت درج‌شده در بسته.',
  },
  {
    icon: '⌂',
    title: 'راه‌اندازی تجهیزات',
    description: 'برای نصب و تنظیم روتر، گیرنده یا کابل اینترنت با سراج جاغوریان تماس بگیرید.',
  },
];

export const faqs = [
  {
    question: 'چطور یک بستهٔ اینترنت سفارش بدهم؟',
    answer: 'در صفحهٔ بسته‌ها روی «شروع کنید» بزنید. واتساپ با پیام آماده دربارهٔ همان بسته باز می‌شود تا درخواست‌تان را بفرستید.',
  },
  {
    question: 'چه بسته‌هایی ارائه می‌شود؟',
    answer: 'بسته‌های ماهانهٔ حجمی، نامحدود ماهانه، نامحدود خانه و بسته‌های هات‌اسپات در همین سایت فهرست شده‌اند.',
  },
  {
    question: 'آیا اینترنت در منطقهٔ من پوشش دارد؟',
    answer: 'در حال حاضر فقط جاغوری تحت پوشش است. برای بررسی پوشش در قریه یا ناحیهٔ خودتان در جاغوری، از واتساپ یا شمارهٔ تماس پیام بدهید.',
  },
];

export function formatAfghani(amount) {
  return `${new Intl.NumberFormat('fa-AF', { useGrouping: false }).format(amount)} افغانی`;
}
