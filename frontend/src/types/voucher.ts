export type DiscountType = 'PERCENT' | 'FIXED';

export interface VoucherResponse {
  code: string;
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
}

export interface Voucher {
  id?: number;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  totalQuantity: number;
  usedQuantity?: number;
  expiresAt: string;
  active?: boolean;
  translations: {
    languageCode: string;
    name: string;
    description: string;
  }[];
}

export type VoucherRequest = Omit<Voucher, 'id' | 'usedQuantity'>;
