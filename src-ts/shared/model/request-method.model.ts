export type RequestMethod = "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS";

export class APIResponse {
  hasError = false;
  error = "";
  data: any;
  constructor(hasError = false, error = "", data: any = null) {
    this.hasError = hasError;
    this.error = error;
    this.data = data;
  }
}
