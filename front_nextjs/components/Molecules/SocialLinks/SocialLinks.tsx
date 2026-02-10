"use client";

import { TelegramIcon } from "@/assets/TelegramIcon";
import styles from "./SocialLinks.module.css";
import { VKontakteIcon } from "@/assets/VKontakteIcon";
import { WhatsAppIcon } from "@/assets/WhatsAppIcon";
import { InstagramIcon } from "@/assets/InstagrammIcon";

const socialLinks = [
  { href: "https://t.me/Andor03", Icon: TelegramIcon, label: "Telegram" },
  { href: "https://vk.com/and0rof", Icon: VKontakteIcon, label: "VK" },
  { href: "https://wa.me/79514556946", Icon: WhatsAppIcon, label: "WhatsApp" },
  {
    href: "https://instagram.com/dantreez3",
    Icon: InstagramIcon,
    label: "Instagram",
  },
];

export default function SocialLinks() {
  return (
    <div className={styles.container}>
      {socialLinks.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.link}
        >
          <Icon className={styles.icon} fill="#1c1c1c" />
        </a>
      ))}
    </div>
  );
}
