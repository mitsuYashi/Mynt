import Repository from "./Repository";
const resouce: string = "/match";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get() {
    return Repository.get(`${resouce}`);
  },
};
