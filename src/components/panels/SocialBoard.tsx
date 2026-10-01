"use client";

import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  DiscordLogo,
  FacebookLogo,
  GameController,
  HandHeart,
  type IconProps,
  ShareNetwork,
  TiktokLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { profile } from "@/content/profile";
import { type Social, type SocialId, socials } from "@/content/socials";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { CloverGlyph } from "@/components/art/Glyphs";
import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/cn";

// TODO: Zypage & PlayerDuo — thay HandHeart / GameController bằng logo chính thức khi có file
const ICONS: Record<SocialId, ComponentType<IconProps>> = {
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
  facebook: FacebookLogo,
  discord: DiscordLogo,
  zypage: HandHeart,
  playerduo: GameController,
};

function Avatar({ alt }: { alt: string }) {
  return (
    <div className="shrink-0 rounded-full bg-gradient-to-br from-primary-soft via-accent to-primary p-1 shadow-[0_8px_20px_-8px_var(--shadow-pink)]">
      {profile.avatar ? (
        <Image
          src={profile.avatar}
          alt={alt}
          width={80}
          height={80}
          className="size-18 rounded-full bg-surface-raised object-cover object-top sm:size-20"
        />
      ) : (
        <div className="grid size-18 place-items-center rounded-full bg-surface-raised sm:size-20" role="img" aria-label={alt}>
          <CloverGlyph className="size-11 text-primary sm:size-12" />
        </div>
      )}
    </div>
  );
}

function SocialLink({ social, t }: { social: Social; t: Dictionary }) {
  const Icon = ICONS[social.id];
  const base =
    "flex min-h-16 items-center gap-3.5 rounded-2xl border-2 border-line bg-surface px-3.5 py-3 transition-colors duration-200";

  const icon = (
    <span
      className={cn(
        "brand-icon grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--social-icon-bg)] shadow-[0_3px_8px_-4px_var(--clay-drop)]",
        !social.url && "is-muted",
      )}
    >
      <Icon aria-hidden="true" weight="fill" className="size-6" />
    </span>
  );

  if (!social.url) {
    return (
      <div aria-disabled="true" className={cn(base, "border-dashed")}>
        {icon}
        <span className="min-w-0 flex-1">
          <span className="block font-bold text-fg-muted">{social.name}</span>
          <span className="block truncate text-sm text-fg-muted">{t.social.linkPending}</span>
        </span>
      </div>
    );
  }

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name + " — " + social.handle + " (" + t.social.opensNewTab + ")"}
      style={{ "--brand": social.brandColor } as CSSProperties}
      className={cn(base, "brand-link group cursor-pointer")}
    >
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block font-bold">{social.name}</span>
        <span className="block truncate text-sm text-fg-muted">{social.handle}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        weight="bold"
        className="size-5 shrink-0 text-fg-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
      />
    </a>
  );
}

export function SocialBoard({ lang, t, className }: { lang: Locale; t: Dictionary; className?: string }) {
  return (
    <Panel
      title={t.social.title}
      subtitle={t.social.subtitle}
      icon={<ShareNetwork aria-hidden="true" weight="bold" className="size-5" />}
      tone="mint"
      className={className}
    >
      <div className="flex items-center gap-4">
        <Avatar alt={t.social.avatarAlt} />
        <div className="min-w-0">
          <p className="font-display text-3xl font-extrabold leading-none">{profile.displayName}</p>
          <p className="mt-1 text-sm font-semibold text-fg-muted">{profile.tagline[lang]}</p>
        </div>
      </div>

      <ul className="flex flex-col gap-2.5">
        {socials.map((social) => (
          <li key={social.id}>
            <SocialLink social={social} t={t} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
