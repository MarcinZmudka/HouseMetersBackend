import { Request, Response } from "express";
import { data } from "../models/Data";
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
		let values: any[] = [];
		const dataFromMongo = post.toJSON();
		const dataToCsv = dataFromMongo.flats.map((item: flat) => {
			const id = getNameOfFlat(item.id);
			values.push({
				opis: "nazwa",
				value: id,
			});
			values.push({
				opis: "Licznik elektryczny 1",
				value: item.electricityOne,
			});
			values.push({
				opis: "Licznik elektryczny 2",
				value: item.electricityTwo,
			});
			values.push({
				opis: "Licznik zimnej wody",
				value: item.coldWater,
			});
			values.push({
				opis: "Licznik ciepłej wody",
				value: item.hotWater,
			});
			values.push({
				opis: "Licznik gazu lub ciepłomierz",
				value: item.heat,
			});
		});
		const csv = parse(values);
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
