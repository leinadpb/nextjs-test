export type AppUser = {
  id: string;
  email: string;
};

export type AuthPayload = {
  email?: string;
  password?: string;
};

export type AppDto = {
  name: string;
  id: string;
  lastRefresh?: Date | null;
  kpis?: KpiDto[];
};

export type KpiDto = {
  name: string;
  value: string;
  id: number;
};
