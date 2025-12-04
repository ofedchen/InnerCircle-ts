export type Tier = "Gold" | "Silver" | "Bronze";

export type Membership = {
  userId: string;
  circleId: number;
  chosenTier: Tier;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  userName: string;
} & LoginForm;

export type ModalType = "login" | "signup" | "join" | "manage";
