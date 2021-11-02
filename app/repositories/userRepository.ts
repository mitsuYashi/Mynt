import Repository from "./Repository";

const resouce: string = "/users";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get() {
        return Repository.get(`${resouce}`);
    },
    post(payload: Object) {
        return Repository.post(`${resouce}`, payload);
    }
}