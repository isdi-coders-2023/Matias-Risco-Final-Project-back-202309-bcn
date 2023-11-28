class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly privateMessage: string,
    message: string,
  ) {
    super(message);
  }
}

export default CustomError;
