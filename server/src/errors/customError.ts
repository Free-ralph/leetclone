export default class CustomError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
