var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import "dotenv/config";
import path from "path";
import Routes from "./routes/index.js";
// Queues
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/index.js";
import { renderEmailTemplate, __dirname } from "./helpers.js";
import { appLimiter } from "./config/rateLimit.js";
const PORT = process.env.PORT || 3000;
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
// Routes
app.use(Routes);
app.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = yield renderEmailTemplate("welcome", {
            name: "Mukesh",
        });
        yield emailQueue.add(emailQueueName, {
            to: "lopisex432@calmpros.com",
            title: "Testing SMTP",
            body: html,
        });
        res.json({
            message: "Email sent successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to send email ${error}`,
        });
    }
}));
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
//# sourceMappingURL=index.js.map