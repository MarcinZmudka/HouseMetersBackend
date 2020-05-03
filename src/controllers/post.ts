import { Request, Response } from "express";
import { data } from "../models/Data";
export default function post(req: Request, res: Response) {
	const data1 = new data({
		createdAt: new Date(),
		flats: req.body,
	});
	data1
		.save()
		.then((item) => res.json({ message: "OK" }))
		.catch((err: Error) => {
			res.send({
				error: err.message,
			});
			console.log(err);
		});
}
