export type AvatarProps = {
	src: string;
	name?: string;
	alt?: string;
	className?: string;
	tierColor?: Tier | null;
	variant?: string;
};

export type AuthFormData = LoginForm | SignUpForm;

export type CircleDetails = {
	circle_id: number;
	circle_name: string;
	circle_avatar: string;
	circle_bio: string;
	circle_members: string;
	circle_slug?: string;
};

export type FeedPost = {
	post_id: number;
	post_title: string;
	post_text: string;
	post_content: string;
	post_date: Date;
	post_tier: Tier;
	circle_id: number;
	circle_slug: string;
	circle_name: string;
	circle_avatar: string;
	uc_circle_tier?: string;
};

export type LoginForm = {
	email: string;
	password: string;
};

export type ModalType = "login" | "signup" | "join" | "manage";

export type Membership = {
	userId: string;
	circleId: number;
	circleTier: Tier;
};

export type PostDetails = PostType & CircleDetails;

export type PostMediaProps = {
	postImg?: string;
	video?: string;
};

export type PostType = {
	post_id: number;
	post_title: string;
	post_text: string;
	post_content: string | null;
	post_date: Date;
	post_tier: Tier;
	post_author: number;
};

export type ProfileUpdatesProps = {
	userName: string;
	userEmail: string;
	userPayment: string;
};

type SignUpForm = {
	userName: string;
	email: string;
	password: string;
};

export type Tier = "Gold" | "Silver" | "Bronze";

export type UserData = {
	users_name: string;
	users_email: string;
	users_payment: string;
};
