export interface PaymentMethod {
  id: number;
  documentId: string;
  name: string;
  description: string;
  options: any;
  enabled: boolean;
}

export interface CartDetail {
  id: number;
  documentId: string;
  quantity: number;
  price: number;
  discount_amount: number;
  discount_type: string;
  tax_amount: number;
  tax_type: string;
  product_variant: {
    id: number;
    documentId: string;
    name: string;
    sku: string;
    variant_status: string;
    photos: Array<{
      id: number;
      url: string;
      name: string;
      formats: any;
    }>;
  };
}

export interface Cart {
  id: number;
  documentId: string;
  subtotal: number;
  discount_amount: number;
  discount_type: string;
  tax_amount: number;
  tax_type: string;
  cart_details: CartDetail[];
}

export interface ShippingDataType {
  address: any;
  method: any;
  amount: {
    subtotal: number;
    discount: number;
    total: number;
    couponId: number;
  };
}

export interface CouponType {
  id: number;
  documentId: string;
  name: string;
  code: string;
  description: string;
  coupon_type: string;
  coupon_status: string;
  discount_type: string;
  discount_value: number;
  max_amount: number;
  min_order_amount: number;
}
