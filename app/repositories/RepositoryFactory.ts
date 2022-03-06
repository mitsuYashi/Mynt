import clientRepository from "./clientRepository";
import matchRepository from "./matchRepository";
import mentaRepository from "./mentaRepository";
import userRepository from "./userRepository";
import messageRepository from "./messageRepository";
import mentatagRepository from "./mentatagRepository";
import usertagRepository from "./usertagRepository";
import likeRepository from "./likeRepository";
import noneRepository from "./noneRepository";
import tagRepository from "./tagRepository";
import contractRepository from "./contractRepository";
import homesRepository from "./homesRepository";
import searchRepository from "./searchRepository";

const repositories = {
  users: userRepository,
  menta: mentaRepository,
  match: matchRepository,
  clients: clientRepository,
  messages: messageRepository,
  mentaTags: mentatagRepository,
  usersTags: usertagRepository,
  like: likeRepository,
  nones: noneRepository,
  tags: tagRepository,
  contracts: contractRepository,
  home: homesRepository,
  search: searchRepository,
};

type Value<T, U extends keyof T> = T[U];

export const RepositoryFactory = {
  get: <T extends keyof typeof repositories>(
    name: T
  ): Value<typeof repositories, T> => repositories[name],
};
