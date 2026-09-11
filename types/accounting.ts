export type PaymentGatewayType = 'bbps' | 'sbi_epay' | 'stripe' | 'razorpay' | 'iccr_grant';

export interface FinancialTransaction {
  id: string;
  referenceNumber: string;
  userId: string;
  amount: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  gateway: PaymentGatewayType;
  status: 'settled' | 'pending' | 'refunded' | 'failed';
  timestamp: string;
  description: string;
  receiptUrl?: string;
}

export interface SubscriptionPlan {
  id: string;
  code: 'free' | 'diplomat' | 'academic' | 'enterprise';
  title: string;
  pricePerMonthInr: number;
  features: string[];
  isSubsidizedByMEA: boolean;
}
