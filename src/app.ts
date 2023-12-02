import express, { Express, Request, Response, Application } from "express";
import morgan from "morgan";

const app: Application = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

export default app;
