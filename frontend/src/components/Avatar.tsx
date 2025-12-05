import React from "react";
import type { Tier } from "../types.ts";

type AvatarProps = {
	src: string;
	name: string;
	className?: string;
	tierColor: Tier | null;
	variant?: string;
};

export default function Avatar({
	src,
	name,
	tierColor,
	variant,
	className,
}: AvatarProps) {
	const colorMap = {
		Gold: "#D4AF37",
		Silver: "#C0C0C0",
		Bronze: "#CD7F32",
	} as const;

	const borderColor = colorMap[tierColor] || "transparent";
	const textColor = colorMap[tierColor] || "transparent";

	const avatarSize = variant
		? "w-40 h-40 sm:w-30 sm:h-30 md:w-62 md:h-62"
		: "w-18 h-18 sm:w-16 sm:h-16 md:w-24 md:h-24";

	return (
		<>
			<div
				className={`flex flex-col items-center ${className}`}
				style={{ "--avatar-border": borderColor } as React.CSSProperties}
			>
				<img
					src={src}
					alt={name}
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
