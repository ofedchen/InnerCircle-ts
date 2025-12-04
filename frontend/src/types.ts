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
