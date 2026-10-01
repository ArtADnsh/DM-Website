import { TelegramIcon, CodeIcon, ChatIcon } from "./ui";

export function ResourceIcon({ type, ...props }) {
  const Icon =
    type === "telegram" ? TelegramIcon : type === "code" ? CodeIcon : ChatIcon;
  return (
    <Icon strokeLinecap={undefined} strokeLinejoin={undefined} {...props} />
  );
}
