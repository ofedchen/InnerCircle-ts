import { Link, useNavigate } from "react-router-dom";

import {
	Accordion,
	AccordionDetails,
	AccordionGroup,
	AccordionSummary,
	Button,
} from "@mui/joy";
import Avatar from "../components/Avatar";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useEffect } from "react";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import ChangeAvatar from "../components/ChangeAvatar";

import { UserData } from "../types";

type ProfileUpdates = {
	userName?: string;
	userEmail?: string;
	userPayment?: string;
};

export default function Profile() {
	const { userId, logout } = useUser();

	const [userData, setUserData] = useState<UserData | null>(null);
	const [newUsername, setNewUsername] = useState<string>("");
	const [newUserEmail, setNewUserEmail] = useState<string>("");
	const [newPaymentMethod, setNewPaymentMethod] = useState<string>("");
	const [hasChanges, setHasChanges] = useState<boolean>(false);
	const [avatarKey, setAvatarKey] = useState<number>(Date.now());
	const [open, setOpen] = useState(false);

	const [myCircles, setMyCircles] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`/api/users/${userId}`)
			.then((response) => response.json())
			.then((data) => {
				setUserData(data);
				setNewUsername(data.users_name);
				setNewUserEmail(data.users_email);
				setNewPaymentMethod(data.users_payment);
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});

		if (userId) {
			fetch(`/api/user-circles/${userId}`)
				.then((response) => response.json())
				.then((data) => {
					setMyCircles(data);
				});
		}
	}, [userId]);

	useEffect(() => {
		if (!userData) return;

		const usernameChanged = newUsername !== userData.users_name;
		const emailChanged = newUserEmail !== userData.users_email;
		const paymentChanged = newPaymentMethod !== userData.users_payment;

		setHasChanges(usernameChanged || emailChanged || paymentChanged);
	}, [newUsername, newUserEmail, newPaymentMethod, userData]);

	const handleAvatarChange = (newAvatarPath: string) => {
		setUserData((prevData) => {
			if (!prevData) return prevData;
			return {
				...prevData,
				users_avatar: newAvatarPath,
			};
		});
		setAvatarKey(Date.now());
	};

	async function handleSaveChanges() {
		let updates: ProfileUpdates = {};

		if (newUsername !== userData.users_name) {
			updates.userName = newUsername;
		}
		if (newUserEmail !== userData.users_email) {
			updates.userEmail = newUserEmail;
		}
		if (newPaymentMethod !== userData.users_payment) {
			updates.userPayment = newPaymentMethod;
		}

		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updates),
			});

			if (response.ok) {
				const updatedData = await response.json();
				setUserData(updatedData);
				setHasChanges(false);
				console.log("Nya uppgifter skickades till databasen");
			} else {
				alert("Nåt gick fel vid ändringen av personuppgite");
			}
		} catch (error) {
			console.error("Error saving changes:", error);
			alert("Error saving changes");
		}
	}
	async function handleDeleteUser() {
		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				logout();
				setOpen(false);
				navigate("/");

				console.log("Användare borttagen");
			} else {
				alert("Nåt gick fel vid borttagning");
			}
		} catch (error) {
			console.error("Error saving changes:", error);
			alert("Error saving changes");
		}
	}

	return (
		<>
			<div className="bg-(--purple-dark) min-h-screen">
				<div
					id="profile-hero"
					className="flex flex-col self-start items-center pt-6 pb-2 px-2  text-2xl font-black w-full bg-(--purple-main) text-(--orange-lighter)  text-center"
				>
					<h2> Welcome back </h2>
					<h2>{userData?.users_name}!</h2>
					<div id="avatarbox">
						<Avatar
							variant="large"
							src={`${userData?.users_avatar}?t=${avatarKey}`}
							className="avatar-center"
						/>
						<ChangeAvatar
							userId={userId}
							className="avatar-change"
							onAvatarChange={handleAvatarChange}
						/>
					</div>
				</div>

				<div className="flex justify-center items-center bg-(--purple-lighter) w-full p-8 ">
					{userData && (
						<AccordionGroup className="bg-(--purple-dark) max-w-75 ">
							<Accordion
								sx={{
									"&.Mui-expanded": {
										backgroundColor: "var(--orange-main)",
										color: "var(--orange-lighter)",
									},
								}}
							>
								<AccordionSummary
									data-cy="acc-details-button"
									sx={{
										color: "var(--orange-main)",
										backgroundColor: "var(--purple-dark)",
									}}
								>
									Change Personal Details
								</AccordionSummary>
								<AccordionDetails>
									<label className="profile-label">Change your name:</label>
									<input
										className="profile-input"
										placeholder={userData?.users_name}
										value={newUsername}
										onChange={(e) => setNewUsername(e.target.value)}
										data-cy="profile-name-input"
									/>
								</AccordionDetails>
								<AccordionDetails>
									<label className="profile-label">Change your email:</label>
									<input
										className="profile-input"
										placeholder={userData?.users_email}
										value={newUserEmail}
										onChange={(e) => setNewUserEmail(e.target.value)}
										data-cy="profile-email-input"
									/>
								</AccordionDetails>
							</Accordion>
							<Accordion
								sx={{
									"&.Mui-expanded": {
										backgroundColor: "var(--orange-main)",
										color: "var(--orange-lighter)",
									},
								}}
							>
								<AccordionSummary
									data-cy="acc-payment-button"
									sx={{
										color: "var(--orange-main)",
										backgroundColor: "var(--purple-dark)",
									}}
								>
									Change Payment Method
								</AccordionSummary>
								<AccordionDetails>
									<label className="profile-label">Select new method:</label>
									<select
										className="profile-input"
										value={newPaymentMethod}
										onChange={(e) => setNewPaymentMethod(e.target.value)}
										data-cy="profile-payment-selector"
									>
										<option value="VISA">Visa</option>
										<option value="MASTERCARD">MasterCard</option>
										<option value="KLARNA">Klarna</option>
									</select>
								</AccordionDetails>
							</Accordion>
							<Accordion
								sx={{
									"&.Mui-expanded": {
										backgroundColor: "var(--orange-white)",
										color: "var(--orange-lighter)",
									},
								}}
							>
								<AccordionSummary
									data-cy="acc-delete-button"
									sx={{
										color: "var(--orange-main)",
										backgroundColor: "var(--purple-dark)",
									}}
								>
									Remove Your Account
								</AccordionSummary>
								<AccordionDetails>
									<div className="flex justify-center m-4">
										<Button
											onClick={() => setOpen(true)}
											color="danger"
											variant="solid"
											data-cy="profile-remove-button"
										>
											Remove Account
										</Button>
										<Modal open={open} onClose={() => setOpen(false)}>
											<ModalDialog variant="outlined" role="alertdialog">
												<DialogTitle>
													<WarningRoundedIcon />
													Are you sure?
												</DialogTitle>
												<Divider />
												<DialogContent>
													Are you sure you want to remove your account?
												</DialogContent>
												<DialogActions>
													<Button
														variant="solid"
														color="danger"
														onClick={handleDeleteUser}
													>
														Remove Account
													</Button>
													<Button
														variant="plain"
														color="neutral"
														onClick={() => setOpen(false)}
													>
														Cancel
													</Button>
												</DialogActions>
											</ModalDialog>
										</Modal>
									</div>
								</AccordionDetails>
							</Accordion>
							{hasChanges && (
								<div className="flex justify-center m-4">
									<Button
										onClick={handleSaveChanges}
										color="neutral"
										variant="outlined"
										data-cy="profile-save-button"
									>
										Save Changes
									</Button>
								</div>
							)}
						</AccordionGroup>
					)}
				</div>

				<div className="flex flex-col justify-center items-center bg-(--purple-dark) w-full  text-(--orange-main) px-8 py-10">
					<h1 className="text-4xl text-(--orange-light) font-bold font-kanit pt-2 mb-8">
						{" "}
						YOUR CIRCLES
					</h1>
					<div className="flex flex-wrap justify-center gap-8 px-4 sm:px-20 ">
						{myCircles && myCircles.length > 0 ? (
							myCircles.map((athlete) => {
								return (
									<Link
										key={athlete.circle_name}
										to={`/circle/${athlete.circle_id}/${athlete.circle_slug}`}
									>
										<Avatar
											tierColor={athlete.uc_circle_tier}
											src={athlete.circle_avatar}
											name={athlete.circle_name}
											key={athlete.uc_id}
										/>
									</Link>
								);
							})
						) : (
							<div className="flex flex-col justify-center ">
								<p className="font-semibold pb-4 text-(--purple-white)">
									{" "}
									You don't have any circles yet.
								</p>
								<Button variant="solid" color="neutral">
									<Link to="/categories">EXPLORE CIRCLES</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
