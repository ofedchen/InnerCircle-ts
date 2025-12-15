import React from "react";
import type { Tier } from "../types.ts";

type AvatarProps = {
	src: string;
	name?: string;
	className?: string;
	tierColor?: Tier | null;
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

	const borderColor = tierColor ? colorMap[tierColor] : null;
	const borderClass = borderColor ? "border-4" : "";
	const textColor = name && tierColor ? colorMap[tierColor] : "transparent";
	const shadowColor = tierColor ? colorMap[tierColor] : "var(--purple-darker)";

	const avatarSize =
		variant === "large"
			? "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
			: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24";

	return (
		<>
			<div
				className={`flex flex-col items-center ${className}`}
				style={
					{
						"--avatar-border": borderColor || "transparent",
						"--avatar-shadow": shadowColor,
						"--avatar-text": textColor,
					} as React.CSSProperties
				}
			>
				<img
					src={src}
					alt={name}
					loading="lazy"
					className={`rounded-full object-cover ${borderClass} ${avatarSize}`}
					style={{
						borderColor: borderColor || undefined,
						boxShadow: `4px 4px 8px -3px ${shadowColor}`,
					}}
				/>
				<p
					style={{ color: textColor }}
					className="text-center font-bold mt-2 text-sm"
				>
					{name}
				</p>
			</div>
		</>
	);
}
