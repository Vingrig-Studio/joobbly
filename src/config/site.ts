export const site = {
  name: "Joobby",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://joobby.ru",
  description: "Смены, задачи и контроль работы — в одном приложении.",
  registrationUrl: "https://app.joobby.ru/",
  email: "info@joobby.ru",
  phoneLabel: "+7 921 922 0890",
  phoneHref: "tel:+79219220890"
} as const;

export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;
