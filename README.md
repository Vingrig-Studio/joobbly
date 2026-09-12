# Joobby website

Новый многостраничный сайт Joobby на Next.js 15, React 19 и TypeScript.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Production: `npm run build && npm start`.

Форма отправляет данные через `/api/leads/`. Для реальной отправки задайте `JOOBBY_LEAD_ENDPOINT`; без endpoint API честно возвращает `503`, а интерфейс сохраняет введённые данные и показывает ошибку.
