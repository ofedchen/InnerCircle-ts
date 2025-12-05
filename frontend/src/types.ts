export type Tier = "Gold" | "Silver" | "Bronze";

export type Membership = {
  userId: string;
  circleId: number;
  circleTier: Tier;
};

type LoginForm = {
  email: string;
  password: string;
};

type SignUpForm = {
  userName: string;
  email: string;
  password: string;
};

export type AuthFormData = LoginForm | SignUpForm;

export type ModalType = "login" | "signup" | "join" | "manage";

export type PostType = {
  post_id: number;
  post_title: string;
  post_text: string;
  post_content: string | null;
  post_date: Date;
  post_tier: Tier;
  post_author: number;
};

export type PostMediaProps = {
  postImg?: string;
  video?: string;
};

export type CircleDetails = {
  circle_id: number;
  circle_name: string;
  circle_avatar: string;
  circle_bio: string;
  circle_members: string;
};
