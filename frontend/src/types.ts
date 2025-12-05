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
