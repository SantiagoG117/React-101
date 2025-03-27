import apiClient from "./api-client";

interface Entity {
  id: number;
}

/* 
    Custom service responsible for making HTTP request to the a client API
*/

class HttpService {
  endPoint: string;

  //function called everytime a new HttpService instance is created
  constructor(endPoint: string) {
    this.endPoint = endPoint; //Initialize the end point of the API
  }

  //T represents a generic Type parameter that works as a placeholder for any type or interface
  getAll<T>() {
    const controller = new AbortController(); //Built-in class in browswers that allows to cancel asynchronous operations like get requests

    const request = apiClient.get<T[]>(this.endPoint, {
      signal: controller.signal,
    });

    //Return an object with two properties: the promise of the GET request and a cancel function
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endPoint + "/" + id);
  }

  //T represents a generic Type parameter that works as a placeholder for any type
  create<T>(entity: T) {
    //Return the promise of the POST request
    return apiClient.post(this.endPoint + "/", entity);
  }

  //T represents a generic Type parameter that works as a placeholder for any type
  update<T extends Entity>(entity: T) {
    //Return the promise of the PUT request
    return apiClient.patch(this.endPoint + "/" + entity.id, entity);
  }
}
const createService = (endpoint: string) => new HttpService(endpoint);

export default createService;
