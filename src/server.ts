import errorHandler from "errorhandler";

import app from "./app";
import wokeDyno from "./wokeDyno";

const DYNO_URL = "https://housemeterbackend.herokuapp.com/";
/**
 * Error Handler. Provides full stack - remove for production
 */
//app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
	wokeDyno(DYNO_URL);
	console.log(
		"  App is running at http://localhost:%d in %s mode",
		app.get("port"),
		app.get("env")
	);
	console.log("  Press CTRL-C to stop\n");
});

export default server;
