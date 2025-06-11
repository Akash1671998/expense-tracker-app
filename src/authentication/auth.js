import axios from "axios";

const application = axios.create({
  baseURL: "http://localhost:9090",
});

const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  if (error.response?.status === 403) {
    sessionStorage.removeItem("token");
     window.dispatchEvent(new Event("logout"));
    window.location = "/login";
  }
  return Promise.reject(error);
};

application.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

application.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { application };
