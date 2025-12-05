export type Tier = "Gold" | "Silver" | "Bronze";

export type Membership = {
	userId: string;
	circleId: number;
	circleTier: Tier;
};

export type LoginForm = {
	email: string;
	password: string;
};

export type SignUpForm = {
	userName: string;
} & LoginForm;

export type ModalType = "login" | "signup" | "join" | "manage";

export type ProfileUpdatesProps = {
	userName?: string;
	userEmail?: string;
	userPayment?: string;
};

export type UserData = {
	users_name: string;
	users_email: string;
	users_payment: string;
};

export type CircleDetails = {
	circle_id: number;
	circle_name: string;
	circle_avatar: string;
	circle_bio: string;
	circle_members: string;
	circle_slug?: string;
};
