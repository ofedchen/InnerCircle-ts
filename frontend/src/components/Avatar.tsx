import React from "react";
import type { Tier } from "../types.ts";

type AvatarProps = {
  src: string;
  tierColor: Tier | null;
  className?: string;
  name?: string;
  slug?: string;
  variant?: string;
};

export default function Avatar({
  src,
  tierColor,
  className,
  name,
  slug,
  variant,
}: AvatarProps) {
  const colorMap = {
    Gold: "#D4AF37",
    Silver: "#C0C0C0",
    Bronze: "#CD7F32",
  } as const;

  const borderColor = tierColor ? colorMap[tierColor] : "transparent";
  const textColor = name && tierColor ? colorMap[tierColor] : "transparent";

  const avatarSize =
    variant === "large"
      ? "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
      : "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24";

  return (
    <>
      <div
        className={`flex flex-col items-center ${className}`}
        style={{ "--avatar-border": borderColor } as React.CSSProperties}
      >
        <img
          src={src}
          alt={name ? name : slug}
          loading="lazy"
          className={`rounded-full object-cover border-4 border-(--avatar-border) shadow-[4px_4px_8px_-3px_var(--orange-dark)] ${avatarSize}`}
        />
        <p
          style={{ "--avatar-border": textColor } as React.CSSProperties}
          className="text-center font-bold mt-2 text-sm text-(--avatar-border)"
        >
          {name}
        </p>
      </div>
    </>
  );
}
