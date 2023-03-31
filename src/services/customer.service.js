import http from "../http-common";

class CustomerDataService {
  getAll() {
    return http.get("/");
  }

  get(customerId) {
    return http.get(`/${customerId}`);
  }

  create(data) {
    return http.post("/", data);
  }

  update(customerId, data) {
    return http.put(`/customer/${customerId}`, data);
  }

  delete(customerId) {
    return http.delete(`/${customerId}`);
  }

  deleteAll() {
    return http.delete(`/`);
  }

  findByName(name) {
    return http.get(`/?name=${name}`);
  }
}

export default new CustomerDataService();
