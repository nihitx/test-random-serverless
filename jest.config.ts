import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: '@shelf/jest-dynamodb',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
export default config;