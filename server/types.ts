import * as express from "express";
import { Query } from "express-serve-static-core";

import { IUser } from "./models/user";
import { HydratedDocument } from "mongoose";

interface UserDocument extends IUser, HydratedDocument<IUser> { }
interface Request<Q extends Query, B> extends express.Request {
  query: Q;
  body: B;
  user?: UserDocument;
}

export { UserDocument };