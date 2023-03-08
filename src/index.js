"use strict";
exports.__esModule = true;
var express_1 = require("express");
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_jsdoc_1 = require("swagger-jsdoc");
var morgan_1 = require("morgan");
var user_1 = require("./routes/user");
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Phantom API',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3003'
            }
        ]
    },
    apis: ['./routes/*.ts']
};
var app = express_1["default"]();
var port = process.env.PORT || 3003;
app.get('/', function (req, res) {
    res.json({
        root: 'App running.'
    });
});
app.use('/users', user_1["default"]);
var specs = swagger_jsdoc_1["default"](options);
app.use('/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(specs));
app.use(express_1["default"].json());
app.use(morgan_1["default"]('dev'));
app.listen(port, function () {
    console.info("server running: http://localhost:" + port);
});
