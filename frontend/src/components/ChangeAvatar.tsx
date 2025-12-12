import React, { useRef, useState } from "react";
import Button from "@mui/joy/Button";

interface ChangeAvatarProps {
	userId: string;
	onAvatarChange?: (newAvatarPath: string) => void;
	className?: string;
}

export default function ChangeAvatar({
	userId,
	onAvatarChange,
	className,
}: ChangeAvatarProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrorMessage("");
		setSuccessMessage("");
		const file = e.target.files?.[0];
		if (!file) return;
		if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
			setErrorMessage(`Not a valid image, please try another file.`);
			setSelectedFile(null);
			setTimeout(() => {
				setErrorMessage("");
			}, 3000);
			return;
		}

		setSelectedFile(file);
	};

	const handleButtonClick = () => {
		inputRef.current?.click();
	};

	const handleSaveAvatar = async () => {
		if (!selectedFile) return;

		setIsLoading(true);
		const formData = new FormData();
		formData.append("avatar", selectedFile);

		try {
			const response = await fetch(`/api/users/${userId}/avatar`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload avatar.");
			}

			const data = await response.json();

			setSuccessMessage("Your avatar is changed!");
			setSelectedFile(null);
			onAvatarChange?.(data.avatarPath);

			setTimeout(() => {
				setSuccessMessage("");
			}, 3000);

			if (inputRef.current) {
				inputRef.current.value = "";
			}
		} catch (error) {
			setErrorMessage("Failed to upload avatar. Please try again.");
			console.error("Avatar upload error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				style={{ display: "none" }}
				data-testid="avatar-file-input"
			/>

			<div
				data-testid="change-avatar-btn"
				role="button"
				onClick={handleButtonClick}
				className="avatar-change"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#201c36"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-camera-icon lucide-camera"
				>
					<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
					<circle cx="12" cy="13" r="3" />
				</svg>
			</div>
			<div className="avatar-msg">
				{errorMessage && (
					<div data-testid="change-avatar-error-msg">
						<p className="avatar-error">{errorMessage}</p>
					</div>
				)}

				{successMessage && (
					<div data-testid="change-avatar-success-msg">
						<p className="avatar-success">{successMessage}</p>
					</div>
				)}

				{selectedFile && !successMessage && (
					<Button
						variant="soft"
						onClick={handleSaveAvatar}
						disabled={isLoading}
						data-testid="save-avatar-btn"
						className="save-avatar-btn"
					>
						{isLoading ? "Uploading..." : "Save Avatar"}
					</Button>
				)}
			</div>
		</>
	);
}
