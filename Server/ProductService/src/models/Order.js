import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

mongoose.model("Order", OrderSchema);
