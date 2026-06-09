# Driver Hub

Базовый full-stack каркас на MERN:

- `client` — React + TypeScript + webpack-dev-server + Tailwind CSS v4
- `server` — Express + Mongoose API на TypeScript

Tailwind 4 подключен через browser runtime в `client/index.html`, чтобы обойти проблему с native-модулем `lightningcss` в текущей Windows-среде.

## Быстрый старт

1. Установить зависимости:

   ```bash
   npm install
   ```

2. Создать файл окружения сервера:

   ```bash
   Copy-Item server/.env.example server/.env
   ```

3. Запустить фронт и бэк:

   ```bash
   npm run dev
   ```

## Скрипты

- `npm run dev` — клиент и сервер в режиме разработки
- `npm run dev:client` — только клиент
- `npm run dev:server` — только сервер
- `npm run build` — production-сборка клиента и компиляция сервера
- `npm run start` — запуск сервера
