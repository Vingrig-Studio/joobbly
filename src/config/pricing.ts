export const pricing = {
  trialDays: 30,
  requiresCard: false,
  basePrice: 490,
  unit: "точка в месяц",
  employeeLimit: null,
  features: [
    "График смен: редактор, публикация и копирование недели",
    "Чек-листы с фото, геолокацией и временем",
    "Учёт времени: приход, уход и опоздания",
    "Дашборд дня по точке и всей сети",
    "Отчёт план/факт и выгрузка в Excel",
    "Приложения для iOS, Android и веб"
  ]
} as const;

const totalWithDiscount = (months: number, discount: number) =>
  Math.round(pricing.basePrice * months * (1 - discount / 100) * 100) / 100;

export const pricingPlans = [
  {
    id: "free",
    title: "Free",
    eyebrow: "Пробный период",
    months: 0,
    discount: 0,
    total: 0,
    originalTotal: 0,
    description: "30 дней полного доступа, чтобы настроить точки и проверить Joobby с командой.",
    cta: "Начать бесплатно",
    note: "Без банковской карты",
  },
  {
    id: "month",
    title: "1 месяц",
    eyebrow: "Гибкий старт",
    months: 1,
    discount: 0,
    total: pricing.basePrice,
    originalTotal: pricing.basePrice,
    description: "Оплата помесячно — удобно, если хотите подключаться без долгого периода.",
    cta: "Выбрать на месяц",
    note: "490 ₽ за точку в месяц",
  },
  {
    id: "half-year",
    title: "6 месяцев",
    eyebrow: "Популярный выбор",
    months: 6,
    discount: 10,
    total: totalWithDiscount(6, 10),
    originalTotal: pricing.basePrice * 6,
    description: "Рабочий горизонт на полгода со скидкой 10% и понятной итоговой стоимостью.",
    cta: "Выбрать 6 месяцев",
    note: "Экономия 294 ₽",
    popular: true,
  },
  {
    id: "year",
    title: "1 год",
    eyebrow: "Максимальная выгода",
    months: 12,
    discount: 16,
    total: totalWithDiscount(12, 16),
    originalTotal: pricing.basePrice * 12,
    description: "Годовой план для стабильной работы сети со скидкой 16%.",
    cta: "Выбрать на год",
    note: "Экономия 940,80 ₽",
  },
] as const;
