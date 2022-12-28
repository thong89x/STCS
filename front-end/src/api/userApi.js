import axiosClient from "./axiosClient";

const userApi = {
    getAll : () => {
        const url = '/users';
        return axiosClient.get(url);
    },
    get : (id) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
}
export default userApi;