import { Schema, Types, model } from "mongoose";
import { IUser } from "./user";

interface ITeam {
  name: string;
  country: string;
  players: Types.ObjectId[];
  tourney: string;
  icon: string;
}

interface PopulatedTeam {
  players: IUser[];
}

const TeamSchema = new Schema<ITeam>({
  name: String,
  country: String,
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  tourney: String,
  icon: String,
});

export { ITeam, PopulatedTeam };
export default model<ITeam>("Team", TeamSchema);