"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var routes_1 = require("./routes");
var mongoose_1 = __importDefault(require("mongoose"));
var App = /** @class */ (function () {
    function App() {
        this.routing = new routes_1.Routes();
        this.mongoUrl = 'mongodb+srv://crud:cqm5U43zsJS3M8Nn@cluster0-vlwif.mongodb.net/blogDB?retryWrites=true';
        this.app = express_1.default();
        this.config();
        this.routing.routes(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.mongoSetup = function () {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.mongoUrl);
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map