import Repository from "./Repository";

const resouce: string = "/contracts";

export default {
  get(payload: Object) {
    return Repository.get(`${resouce}`, payload);
  },
  post(payload: Object) {
    return Repository.post(`${resouce}`, payload);
  },
  update(id: number, payload: Object) {
    return Repository.patch(`${resouce}/${id}`, payload);
  },
  // show(id: number) {
  //   return Repository.get(`${resouce}/${id}`);
  // },
  // delete(id: number) {
  //   return Repository.delete(`${resouce}/${id}`);
  // },
};
