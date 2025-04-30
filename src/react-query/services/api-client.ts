import axios, { AxiosInstance } from "axios";



// Handles sending HTTP requests to the back-end, endpoint provided by the consumer of this class
// The type of Data <T> manipulated and fetched in each HTTP request is also defined by the consumer of the class
class ApiClient<T> {
  endPoint: string;
  axiosInstance: AxiosInstance;

  constructor(baseURL: string, endPoint: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });
    this.endPoint = endPoint; //Initialize the endpoint of the api
  }

  getAll() {
    const controller = new AbortController(); //Built-in class in browsers that allows to cancel asynchronous operations like GET request

    const request = this.axiosInstance
      .get<T[]>(this.endPoint, {
        signal: controller.signal,
      })
      .then((response) => response.data);

    //Return an object with two properties: the promise of the GET request and a cancel function
    return { request, cancel: () => controller.abort };
  }

  create(data: T) {
    //Return the promise of the POST request
    return this.axiosInstance
      .post<T>(this.endPoint, data)
      .then((response) => response.data);
  }
}

export default ApiClient;
