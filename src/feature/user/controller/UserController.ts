import { type NextFunction } from "express";
import { type UserRepositoryStructure } from "../repository/types";
import { type UserCreateResponse, type UserCreateRequest } from "./types";
import bcrypt from "bcrypt";
import CustomError from "../../../server/CustomError/CustomError";

class UserController {
  constructor(private readonly userRepository: UserRepositoryStructure) {}

  createUser = async (
    req: UserCreateRequest,
    res: UserCreateResponse,
    next: NextFunction,
  ) => {
    try {
      const { user } = req.body;

      const hashedPasword = await bcrypt.hash(user.name + user.password, 11);
      user.password = hashedPasword;

      const newUser = await this.userRepository.userCreate!(user);

      res.status(200).json({ user: newUser });
    } catch (error) {
      const newError = new CustomError(
        500,
        "Error in register new User",
        (error as Error).message,
      );

      next(newError);
    }
  };
}

export default UserController;
