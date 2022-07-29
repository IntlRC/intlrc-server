import osu from 'node-osu';

export const getOsuApi = () => new osu.Api(process.env.SECRET_CLIENT!, { parseNumeric: true });