import clientRepository from "./clientRepository";
import matchRepository from "./matchRepository";
import mentaRepository from "./mentaRepository";
import userRepository from "./userRepository";

const repositories = {
  users: userRepository,
  menta: mentaRepository,
  match: matchRepository,
  client: clientRepository,
};

type Value<T, U extends keyof T> = T[U];

export const RepositoryFactory = {
  get: <T extends keyof typeof repositories>(
    name: T
  ): Value<typeof repositories, T> => repositories[name],
};
