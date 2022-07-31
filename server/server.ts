require("dotenv").config();

import express from "express";
import pino from "pino";
import passport from 'passport';
import session from "express-session";
import sslRedirect from "heroku-ssl-redirect";
import MongoStore from "connect-mongo";

import api from "./api";
import auth from "./auth";
import db from './db';

const app = express();
const logger = pino();
const clientPromise = db.init();

app.set("trust proxy", true);
app.use(sslRedirect());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    store: MongoStore.create({ clientPromise }),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  if (req.headers.host!.slice(0, 4) === "www.") {
    const newHost = req.headers.host!.slice(4);
    return res.redirect(301, req.protocol + "://" + newHost + req.originalUrl);
  }
  next();
});

app.use("/api", api);
app.use("/auth", auth);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    logger.error("The server errored when processing a request!");
    logger.error(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});