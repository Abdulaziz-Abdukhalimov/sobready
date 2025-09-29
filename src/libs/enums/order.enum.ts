export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  CARD = "CARD",
  STRIPE = "STRIPE",
  PAYPAL = "PAYPAL",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}
