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
	electricity: {
		type: Number,
		required: true,
	},
	togetherOneOne: {
		type: Number,
		required: false,
	},
	togetherOneTwo: {
		type: Number,
		required: false,
	},
	togetherTwoOne: {
		type: Number,
		required: false,
	},
	togetherTwoTwo: {
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
