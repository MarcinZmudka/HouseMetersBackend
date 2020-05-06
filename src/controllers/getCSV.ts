import { Request, Response } from "express";
import { data } from "../models/Data";
import { parse } from "json2csv";
interface Flat {
	id: number;
	hotWater: number;
	coldWater: number;
	electricity: number;
	heat: number;
}
export interface House extends Flat {
	togetherOneOne: number;
	togetherOneTwo: number;
	togetherTwoOne: number;
	togetherTwoTwo: number;
}
interface MongoData {
	createdAt: Date;
	flats: Array<Flat | House>;
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
export default function getCSV(req: Request, res: Response) {
	data.findOne({}, {}, { sort: { createdAt: -1 } }, function (
		err: Error,
		post
	) {
		if (err) {
			res.send({ error: err.message });
		}
		const values: any[] = [];
		const dataFromMongo = post.toJSON();
		const dataToCsv = dataFromMongo.flats.map((item: Flat | House) => {
			const id = getNameOfFlat(item.id);
			values.push({
				opis: "nazwa",
				value: id,
			});
			values.push({
				opis: "Licznik elektryczny 1",
				value: item.electricity,
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
			if ((item as House).togetherOneOne) {
				values.push({
					opis: "Licznik elektryczny - Części  wspólne 456-1",
					value: (item as House).togetherOneOne,
				});
				values.push({
					opis: "Licznik elektryczny - Części  wspólne 456-2",
					value: (item as House).togetherOneTwo,
				});
				values.push({
					opis: "Licznik elektryczny - Części  wspólne 222-1",
					value: (item as House).togetherTwoOne,
				});
				values.push({
					opis: "Licznik elektryczny - Części  wspólne 222-2",
					value: (item as House).togetherTwoTwo,
				});
			}
		});
		const csv = parse(values);
		res.attachment("plik.csv");
		res.status(200).send(csv);
	});
}

function flat(array: any = []): any[] {
	const newArray = [];
	for (const item of array) {
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
