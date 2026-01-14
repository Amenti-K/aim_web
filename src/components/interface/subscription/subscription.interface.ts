// Subscription interface
export interface ISubscription {
  id: string;
  status: SubscriptionStatus;
  trialEndsAt: string; // Dates often come as strings from JSON
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  companyId: string;
  planId: string;
  plan: IPlan;
}

export enum SubscriptionStatus {
  TRIALING = "TRIALING",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PAST_DUE = "PAST_DUE",
  CANCELED = "CANCELED",
  UNPAID = "UNPAID",
}

// Usage interface
export interface IUsage {
  id: string;
  metric: string;
  value: number;
  // lastReset: string;
  // updatedAt: string;
}

// Plan interface
export interface IPlan {
  id: string;
  name: string;
  description?: string;
  isEnterprise: boolean;
  isActive: boolean;
  limits: PlanLimit[];
  features: PlanFeature[];
  prices: PlanPrice[];
}

export interface PlanPrice {
  id: string;
  amount: number;
  currency: string;
  interval: BillingInterval;
}

export enum BillingInterval {
  MONTHLY = "MONTHLY",
  THREE_MONTHS = "THREE_MONTHS",
  SIX_MONTHS = "SIX_MONTHS",
  YEARLY = "YEARLY",
}

export interface PlanLimit {
  metric: string;
  value: number | null; // null for unlimited
}

export interface PlanFeature {
  feature: FeatureKey;
  enabled: boolean;
}

export enum FeatureKey {
  ACCOUNT = "ACCOUNT",
  ANALYTICS = "ANALYTICS",
  AUTH = "AUTH",
  COMPANY = "COMPANY",
  EMPLOYEE = "EMPLOYEE",
  EXPENSE = "EXPENSE",
  INVENTORY = "INVENTORY",
  INVENTORY_ADJUSTMENT = "INVENTORY_ADJUSTMENT",
  LOAN = "LOAN",
  PARTNER = "PARTNER",
  PURCHASE = "PURCHASE",
  ROLE = "ROLE",
  SALE = "SALE",
  SUBSCRIPTION = "SUBSCRIPTION",
  REPORTS = "REPORTS",
}

export interface ICancelSubscription {
  companyId: string;
}

export interface INewSubscription extends ICancelSubscription {
  planId: string;
  duration: BillingInterval;
  status?: SubscriptionStatus;
  trialEndsAt?: Date;
}

export interface IActivateSubscription extends ICancelSubscription {
  duration: BillingInterval;
  planId?: string;
}

export type SubscriptionAction = "CREATE" | "ACTIVATE" | "EXTEND";
