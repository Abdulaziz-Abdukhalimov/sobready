import mongoose, { Schema } from "mongoose";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../libs/enums/order.enum";

const orderSchema = new Schema(
  {
    orderTotal: {
      type: Number,
      required: true,
    },
    orderDelivery: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethod,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.PENDING,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);
