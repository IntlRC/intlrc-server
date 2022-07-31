import { Schema, model } from "mongoose";

interface UserTourneyStats {
  tourney: string;
  role: string;
  position: string;
}

interface IUser {
  username: string;
  userid: string;
  country: string;
  avatar: string; // pfp url
  discord: string;
  timezone: number;
  rank: number;
  admin: boolean;
  roles: {
    tourney: string;
    role: string;
  }[];
  stats: UserTourneyStats[];
}

const UserSchema = new Schema<IUser>({
  username: String,
  userid: String,
  country: String,
  avatar: String,
  discord: String,
  timezone: Number,
  rank: Number,
  admin: Boolean,
  roles: [
    {
      tourney: String,
      role: String,
    },
  ],
  stats: [
    {
      tourney: String,
      role: String,
      position: Number,
    },
  ],
});

export { UserTourneyStats, IUser };
export default model<IUser>("User", UserSchema);