export const site = {
  name: "Joobby",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://joobby.ru",
  description: "Смены, задачи и контроль работы — в одном приложении.",
  email: "info@joobby.ru"
} as const;

export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;
