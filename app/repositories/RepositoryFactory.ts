import clientRepository from "./clientRepository";
import matchRepository from "./matchRepository";
import mentaRepository from "./mentaRepository";
import userRepository from "./userRepository";
import messageRepository from "./messageRepository";

const repositories = {
  users: userRepository,
  menta: mentaRepository,
  match: matchRepository,
  clients: clientRepository,
  messages: messageRepository,
};

type Value<T, U extends keyof T> = T[U];

export const RepositoryFactory = {
  get: <T extends keyof typeof repositories>(
    name: T
  ): Value<typeof repositories, T> => repositories[name],
};
