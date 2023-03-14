const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  deliveryInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    phoneNum: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  paidAt: {
    type: Date,
    required: true,
  },

  itemPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  orderStatus: {
    type: String,
    required: true,
    default: 'Processing',
  },

  deliveredAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
