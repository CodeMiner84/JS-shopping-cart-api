import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    ean: {
        type: String,
        required: 'Field required',
    },
    title: {
        type: String,
        required: 'Field required',
    },
    description: {
        type: String,
        required: 'Field required',
    },
    image: {
        type: String,
        required: false,
    },
    isActive: {
        type: [{
            type: Number,
            enum: [0, 1],
        }],
        required: 'Field required',
    },
    price: {
        type: Number,
        required: 'Field required',
    },
});