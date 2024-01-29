import { Request } from "express";

interface User {
  username: string;
  userID: string;
}

interface RequestWithUser extends Request {
  user?: User;
}
export { User, RequestWithUser };
