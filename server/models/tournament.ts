import { Schema, model } from "mongoose";

interface TourneyStage {
  name: string;
  poolVisibility: string;
  mappack: string;
  statsVisible: boolean;
}

interface ITournament {
  code: string;
  registrationOpen: boolean;
  teams: boolean;
  stages: TourneyStage[];
}

const Tournament = new Schema<ITournament>({
  code: String,
  registrationOpen: Boolean,
  teams: Boolean,
  stages: [
    {
      name: String,
      poolVisibility: Boolean,
      mappack: String,
      statsVisible: Boolean,
    },
  ],
});

export { TourneyStage, ITournament };
export default model<ITournament>("Tournament", Tournament);