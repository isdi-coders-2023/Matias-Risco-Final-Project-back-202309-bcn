class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly privateMessage?: string,
  ) {
    super(message);
  }
}

export default CustomError;
