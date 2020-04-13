"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("../models/Data");
function get(req, res) {
    Data_1.data.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, post) {
        if (err) {
            res.send({ error: err.message });
        }
        res.send(post);
    });
}
exports.default = get;
//# sourceMappingURL=get.js.map