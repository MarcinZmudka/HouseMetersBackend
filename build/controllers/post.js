"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("../models/Data");
function post(req, res) {
    console.log(req.body);
    const data1 = new Data_1.data({
        createdAt: new Date(),
        flats: req.body,
    });
    data1
        .save()
        .then((item) => res.json({ message: "OK" }))
        .catch((err) => res.json({
        error: err.message,
    }));
}
exports.default = post;
//# sourceMappingURL=post.js.map