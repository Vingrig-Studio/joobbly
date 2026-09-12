const safeUrl = (value: string | undefined) => value?.startsWith("https://") ? value : undefined;

export const social = {
  telegram: safeUrl(process.env.NEXT_PUBLIC_TELEGRAM_URL) ?? "https://t.me/joobbyru",
  vk: safeUrl(process.env.NEXT_PUBLIC_VK_URL)
};
