import express, { Response } from "express";
import pino from "pino";
import osu from "node-osu";
import fs from "fs";
import { addAsync } from "@awaitjs/express";

import { getOsuApi } from './api/osu';

const router = addAsync(express.Router());

const logger = pino();
const osuApi = getOsuApi();

router.getAsync("/test", async (req, res) => {
  res.send("Hello World 2");
});

router.all('*', (req, res) => {
  logger.warn(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

export default router;