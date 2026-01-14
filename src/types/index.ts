// Subscription Enums
export enum SubscriptionStatus {
  TRIALING = 'TRIALING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  PAST_DUE = 'PAST_DUE',
  CANCELED = 'CANCELED',
  UNPAID = 'UNPAID',
}

export enum BillingInterval {
  MONTHLY = 'MONTHLY',
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  YEARLY = 'YEARLY',
}

export enum LimitMetric {
  EMPLOYEES = 'EMPLOYEES',
  INVOICES_MONTHLY = 'INVOICES_MONTHLY',
  WAREHOUSES = 'WAREHOUSES',
  STORAGE_GB = 'STORAGE_GB',
}

export enum FeatureKey {
  ACCOUNT = 'ACCOUNT',
  ANALYTICS = 'ANALYTICS',
  AUTH = 'AUTH',
  COMPANY = 'COMPANY',
  EMPLOYEE = 'EMPLOYEE',
  EXPENSE = 'EXPENSE',
  INVENTORY = 'INVENTORY',
  INVENTORY_ADJUSTMENT = 'INVENTORY_ADJUSTMENT',
  LOAN = 'LOAN',
  PARTNER = 'PARTNER',
  PURCHASE = 'PURCHASE',
  ROLE = 'ROLE',
  SALE = 'SALE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  REPORTS = 'REPORTS',
}

// User
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

// Role
export interface Role {
  id: string;
  name: string;
}

// Company User
export interface CompanyUser {
  id: string;
  userId: string;
  companyId: string;
  roleId?: string;
  user: User;
  Role?: Role;
  createdAt: string;
  updatedAt: string;
}

// Plan related
export interface PlanPrice {
  id: string;
  amount: string;
  currency: string;
  interval: BillingInterval;
}

export interface PlanLimit {
  id: string;
  metric: LimitMetric;
  value: number | null;
}

export interface PlanFeature {
  id: string;
  feature: FeatureKey;
  enabled: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  isEnterprise: boolean;
  isActive: boolean;
  limits?: PlanLimit[];
  features?: PlanFeature[];
  prices?: PlanPrice[];
}

// Subscription
export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  trialEndsAt?: string;
  currentPeriodStart: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
  companyId: string;
  planId: string;
  plan: Plan;
  createdAt: string;
  updatedAt: string;
}

// Usage
export interface Usage {
  id: string;
  metric: LimitMetric;
  value: number;
  lastReset: string;
  companyId: string;
  updatedAt: string;
}

// Company (list view - minimal data)
export interface CompanyListItem {
  id: string;
  name: string;
  setupStep: number;
  createdAt: string;
  updatedAt: string;
  subscription?: {
    status: SubscriptionStatus;
    currentPeriodEnd?: string;
    currentPeriodStart: string;
    plan: {
      name: string;
    };
  };
  companyUsers: {
    user: User;
  }[];
}

// Company (detail view - full data)
export interface Company {
  id: string;
  name: string;
  setupStep: number;
  createdAt: string;
  updatedAt: string;
  subscription?: Subscription;
  usages?: Usage[];
  companyUsers: CompanyUser[];
}

// API Response types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CompanyListResponse {
  msg: string;
  data: CompanyListItem[];
  meta: PaginationMeta;
}

// Dashboard Stats
export interface DashboardStats {
  totalCompanies: number;
  totalUsers: number;
  subscriptionBreakdown: {
    active: number;
    trialing: number;
    expired: number;
    canceled: number;
  };
}

// Filter DTO
export interface CompanyFilterDto {
  name?: string;
  ownerPhone?: string;
  page: number;
  limit: number;
}

// Subscription DTOs
export interface CreateSubscriptionDto {
  companyId: string;
  planId: string;
  status: SubscriptionStatus;
  trialEndsAt?: string;
  duration?: BillingInterval;
}

export interface ActivateSubscriptionDto {
  companyId: string;
  planId?: string;
  duration: BillingInterval;
}

// Auth
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
