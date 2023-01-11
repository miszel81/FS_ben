"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const constnats_1 = require("./constnats");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post_1.Post],
    dbName: 'fullBen',
    debug: !constnats_1.__prod__,
    type: 'postgresql',
};
//# sourceMappingURL=mikro-orm.config.js.map