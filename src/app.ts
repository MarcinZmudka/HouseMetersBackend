import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "./util/secrets";
import get from "./controllers/get";
import post from "./controllers/post";
import getCSV from "./controllers/getCSV";
import cors from "cors";
// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
	})
	.catch((err) => {
		console.log(
			"MongoDB connection error. Please make sure MongoDB is running. " + err
		);
		process.exit();
	});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/get", get);
app.post("/post", post);
app.get("/getCSV", getCSV);

export default app;
