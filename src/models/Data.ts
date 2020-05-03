import mongoose from "mongoose";

const flatSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	hotWater: {
		type: Number,
		required: true,
	},
	coldWater: {
		type: Number,
		required: true,
	},
	electricityOne: {
		type: Number,
		required: true,
	},
	electricityTwo: {
		type: Number,
		required: false,
	},
	togetherOne: {
		type: Number,
		required: false,
	},
	togetherTwo: {
		type: Number,
		required: false,
	},
	heat: {
		type: Number,
		required: true,
	},
});
export const dataSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		required: true,
	},
	flats: {
		type: [flatSchema],
		required: true,
	},
});

export const data = mongoose.model("data", dataSchema);
