import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import cors from "cors";
import Routes from "./routes/index.js";
import fileUpload from "express-fileupload";

// Queues
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/index.js";
import { renderEmailTemplate, __dirname } from "./helpers.js";
import { appLimiter } from "./config/rateLimit.js";

const PORT = process.env.PORT || 3000;
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.static("public"));
// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Routes
app.use(Routes);

app.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const html = await renderEmailTemplate("welcome", {
      name: "Mukesh",
    });
    await emailQueue.add(emailQueueName, {
      to: "lopisex432@calmpros.com",
      title: "Testing SMTP",
      body: html,
    });
    res.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to send email ${error}`,
    });
  }
});

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
