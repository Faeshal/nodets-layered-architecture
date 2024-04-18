export interface AddIncomeRequest {
  name: string;
  value: number;
  userId: string;
  categories: {
    tag: string;
  }[];
}

export interface UpdateIncomeRequest {
  id: string;
  name: string;
  value: number;
}
