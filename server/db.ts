require("dotenv").config();

import mongoose, { mongo } from 'mongoose';
import pino from 'pino';

const logger = pino();

//TODO Add server
const srv = process.env.MONGO_SRV!;

//TODO Add options
const options = {};

export default {
  init: async () => {
    try {
      await mongoose.connect(srv, options);
      logger.info("Server connected to MongoDB");
      return mongoose.connection.getClient();
    } catch (err) {
      logger.error("Error connecting to MongoDB", err);
      throw err;
    }
  }
};
