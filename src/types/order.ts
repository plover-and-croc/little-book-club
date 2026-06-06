export type OrderStatus =
  | "draft"
  | "awaiting_payment"
  | "paid"
  | "packing"
  | "fulfilled"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
