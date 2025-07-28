export type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

export type Subscription = {
  id: string;
  teamId: string;
  planId: string;
  status: "active" | "cancelled" | "expired";
  startDate: string;
  endDate: string;
};
