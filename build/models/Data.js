"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const flatSchema = new mongoose_1.default.Schema({
    id: Number,
    hotWater: Number,
    coldWater: Number,
    electricityOne: Number,
    electricityTwo: Number,
    heat: Number,
});
exports.dataSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        required: true,
    },
    flats: [flatSchema],
});
exports.data = mongoose_1.default.model("data", exports.dataSchema);
//# sourceMappingURL=Data.js.map