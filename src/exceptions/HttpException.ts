class HttpException extends Error {
  public status: number;

  public message: string;

  public type: boolean;

  constructor(status: number, message: string, type = false) {
    super(message);
    this.status = status;
    this.message = message;
    this.type = type;
  }
}

export default HttpException;
