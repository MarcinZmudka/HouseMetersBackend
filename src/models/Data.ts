import mongoose from "mongoose";

const flatSchema = new mongoose.Schema({
	id: Number,
	hotWater: Number,
	coldWater: Number,
	electricityOne: Number,
	electricityTwo: Number,
	heat: Number,
});
export const dataSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		required: true,
	},
	flats: [flatSchema],
});

export const data = mongoose.model("data", dataSchema);
