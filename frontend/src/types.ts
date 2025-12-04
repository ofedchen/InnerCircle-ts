export type Tier = "Gold" | "Silver" | "Bronze";

export type Membership = {
  userId: string;
  circleId: number;
  chosenTier: Tier;
};

export type SignUpForm = {
  userName: string;
  email: string;
  password: string;
};
