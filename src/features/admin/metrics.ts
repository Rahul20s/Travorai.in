export type AdminMetric = {
  label: string;
  value: string;
  owner: "growth" | "travel" | "ai" | "revenue" | "support";
};

export const adminDashboardMetrics: AdminMetric[] = [
  { label: "Users", value: "0", owner: "growth" },
  { label: "Trips", value: "0", owner: "travel" },
  { label: "Bookings", value: "0", owner: "travel" },
  { label: "Revenue", value: "Rs. 0", owner: "revenue" },
  { label: "AI cost", value: "Rs. 0", owner: "ai" },
  { label: "Feedback", value: "0", owner: "support" }
];
