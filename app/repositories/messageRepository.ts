import Repository from "./Repository";

const resouce: string = "/messages";

export default {
  get(payload: Object) {
    return Repository.get(`${resouce}`, payload);
  },
//   post(payload: Object) {
//     return Repository.post(`${resouce}`, payload);
//   },
//   update(payload: Object) {
//     return Repository.put(`${resouce}`, payload);
//   },
//   show(id: number) {
//     return Repository.get(`${resouce}/${id}`);
//   },
//   delete(id: number) {
//     return Repository.delete(`${resouce}/${id}`);
//   },
};
