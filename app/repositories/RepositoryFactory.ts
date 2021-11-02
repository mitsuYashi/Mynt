import matchRepository from "./matchRepository";
import userRepository from "./userRepository";

const repositories = {
  user: userRepository,
  match: matchRepository,
};

export const RepositryFactory = {
  get: (name: string) => repositories[name],
};
