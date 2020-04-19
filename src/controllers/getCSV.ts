import { Request, Response } from "express";
import { data, dataSchema } from "../models/Data";
import { parse } from "json2csv";
interface flat {
	id: number;
	hotWater: number;
	coldWater: number;
	electricityOne: number;
	electricityTwo: number;
	heat: number;
}
interface mongoData {
	createdAt: Date;
	flats: flat[];
}
export default function getCSV(req: Request, res: Response) {
	data.findOne({}, {}, { sort: { createdAt: -1 } }, function (
		err: Error,
		post
	) {
		if (err) {
			res.send({ error: err.message });
		}
		const dataFromMongo = post.toJSON();
		const dataToCsv = dataFromMongo.flats.map((item: flat) => {
			const id = getNameOfFlat(item.id);
			return [
				id,
				item.electricityOne,
				item.electricityTwo,
				item.coldWater,
				item.hotWater,
				item.heat,
			];
		});
		const flattedData = flat(dataToCsv);
		const jsonObject = flattedData.map((item) => {
			return {
				data: item,
			};
		});
		const csv = parse(jsonObject);
		res.attachment("plik.csv");
		res.status(200).send(csv);
	});
}

function getNameOfFlat(id: number): string {
	let newId = id;
	id >= 1 && id < 7 ? (newId = 2) : (newId = id);
	switch (newId) {
		case 0:
			return "Dom";
		case 2:
			return `Mieszkanie ${id}`;
		case 7:
			return "Mały Lokal";
		case 8:
			return "Duży Lokal";
		default:
			break;
	}
	return "Error";
}

function flat(array: any = []): any[] {
	let newArray = [];
	for (let item of array) {
		if (Array.isArray(item)) {
			item.map((x) => {
				newArray.push(x);
			});
		} else {
			newArray.push(item);
		}
	}
	return newArray;
}
