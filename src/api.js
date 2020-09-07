import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

export const api = {
  currentState: () => client.get("/"),
  apply: (student_number, period) =>
    client.post("/apply", { student_number, period }),
  cancel: (student_number) => client.post("/cancel", { student_number }),
};
