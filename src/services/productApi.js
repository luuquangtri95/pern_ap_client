import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  getAllBrand() {
    const url = "/brands";
    return axiosClient.get(url);
  },
  create(data) {
    const url = "/products";
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
