export type Tier = "Gold" | "Silver" | "Bronze";

export type Membership = {
    userId: string;
    circleId: number;
    chosenTier: Tier;
}

