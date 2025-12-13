export type Tier = "Gold" | "Silver" | "Bronze";

export type AvatarProps = {
  src: string;
  name?: string;
  alt?: string;
  className?: string;
  tierColor?: Tier | null;
  variant?: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  userName: string;
  email: string;
  password: string;
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

export interface PostType {
  post_id: number;
  post_title: string;
  post_text: string;
  post_content: string | null;
  post_date: Date | string;
  post_tier: Tier;
  post_author: number;
}

export interface FeedPost extends PostType {
  circle_slug: string;
  circle_name: string;
  circle_avatar: string;
  uc_circle_tier?: Tier;
}

export type PostMediaProps = {
  postImg?: string;
  video?: string;
};

export type ModalType = "login" | "signup" | "join" | "manage";

export type Membership = {
  userId: string;
  circleId: number;
  circleTier: Tier;
};

export type UserData = {
  users_name: string;
  users_email: string;
  users_payment: string;
};

export type CommentType = {
  comment_id: number;
  comment_author: string;
  comment_text: string;
  comment_date: Date | string;
  users_name: string;
};

export type CommentBody = {
  userId: string;
  commentText: string;
  postId: number;
};

export type UserCircleType = {
  circle_avatar: string;
  circle_id: number;
  circle_name: string;
  circle_slug: string;
  uc_circle_tier: Tier;
  uc_id: number;
};
