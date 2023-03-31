import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/customer",
  headers: {
    "Content-type": "application/json",
  },
});
