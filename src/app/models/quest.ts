export class Quest {
  title!: string;
  description!: string;
  requester!: string;
  questRank!: string | null;
  questID?: string;
  accepted?: boolean;
  adventurer?: {
    uid: string | undefined,
    email: string | undefined
  };
  completed?: boolean;
}