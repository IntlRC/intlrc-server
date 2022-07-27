require("dotenv").config();

import express from "express";
import pino from "pino";

import { getOsuApi } from './api/osu';

const app = express();
const osuApi = getOsuApi();
const logger = pino();

app.get('/', (_req, res) => {
  res.send('Hello World!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
})