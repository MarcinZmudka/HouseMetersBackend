import { Request, Response } from "express";
import { data } from "../models/Data";
export default function get(req: Request, res: Response) {
	data.findOne({}, {}, { sort: { createdAt: -1 } }, function (
		err: Error,
		post
	) {
		if (err) {
			res.send({ error: err.message });
		}
		res.send(post);
	});
}
