import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CartItemSchema = new Schema({
    customer_id: {
        type: String,
        required: 'Customer is required',
    },
    product_id: {
        type: String,
        required: 'Product is required',
    },
    quantity: {
        type: Number,
        required: 'Number is required',
    },
    price: {
        type: Number,
        required: 'Number is required',
    },
    title: {
        type: String,
        requied: 'Title is required',
    },
});
