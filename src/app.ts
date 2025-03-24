import express from "express";
import { router } from "./router";
import cors from "cors";

export const app = express();

app.use(cors());
app.use("/api/v1", router);
