export class Quest {
  title!: string;
  description!: string;
  requester!: string | undefined;
  questRank!: string | null;
  adventurersNeeded?: number;
  questID?: string;
  adventurer?: {
    uid: string | undefined,
    email: string | undefined
  }[];
  completed?: boolean;
}