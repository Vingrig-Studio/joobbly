export const downloads = {
  appStore: {
    label: "App Store",
    url: "https://apps.apple.com/app/id6778303221",
    requirement: "Требуется iOS 15 или новее"
  },
  googlePlay: {
    label: "Google Play",
    url: "https://play.google.com/store/apps/details?id=ru.joobby.app",
    requirement: "Требуется Android 7 или новее"
  },
  apk: {
    label: "APK для Android",
    url: "https://joobby.ru/download/joobby.apk",
    requirement: "Скачивайте установочный файл только с joobby.ru"
  },
  web: {
    label: "Веб-версия",
    url: "https://app.joobby.ru/",
    requirement: "Устанавливать ничего не нужно"
  }
} as const;
