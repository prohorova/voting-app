"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var development_1 = require("./env/development");
var production_1 = require("./env/production");
var env = process.env.NODE_ENV || 'development';
var config = env === 'development' ? development_1.default : production_1.default;
exports.default = config;
//# sourceMappingURL=config.js.map