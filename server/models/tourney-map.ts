import { Schema, model } from "mongoose";

interface ITourneyMap {
  mapId: number;
  mod: "FM" | "HR" | "TB";
  index: number;
  title: string;
  artist: string;
  creator: string;
  version: string;
  bpm: number;
  sr: number;
  od: number;
  hp: number;
  length: string;
  image: string;
}

const TourneyMapSchema = new Schema<ITourneyMap>({
  mapId: Number,
  mod: { type: String, enum: ["FM", "HR", "TB"] },
  index: Number,
  title: String,
  artist: String,
  creator: String,
  version: String,
  bpm: Number,
  sr: Number,
  od: Number,
  hp: Number,
  length: String,
  image: String,
});