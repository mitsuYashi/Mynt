import Repository from "./Repository";

const resouce: string = "/menta";

export default {
  get() {
    return Repository.get(`${resouce}`);
  },
  post(payload: Object) {
    return Repository.post(`${resouce}`, payload);
  },
  // show(id: number) {
  //   return Repository.get(`${resouce}/${id}`);
  // },
  // delete(id: number) {
  //   return Repository.delete(`${resouce}/${id}`);
  // },
};
