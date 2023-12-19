import { type NextFunction } from "express";
import { type UserCreateResponse, type UserCreateRequest } from "../types";
import { type UserRepositoryStructure } from "../../repository/types";
import {
  type UserWithOutIdStructure,
  type UserWithOutPasswordStructure,
} from "../../types";
import UserController from "../UserController";
import type CustomError from "../../../../server/CustomError/CustomError";
import { Error } from "mongoose";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the method createUser in class UserController", () => {
  const name = "Alfaruis";
  const id = "arswegliyasWEGF342rt51i7s";
  const req: Partial<UserCreateRequest> = {
    body: {
      user: {
        name,
        password: "b1r132",
      },
    },
  };

  const res: Partial<UserCreateResponse> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a request given a username and password", () => {
    const userRepository: Partial<UserRepositoryStructure> = {
      userCreate: async ({
        name,
      }: UserWithOutIdStructure): Promise<UserWithOutPasswordStructure> => ({
        id,
        name,
      }),
    };

    const userController = new UserController(userRepository);

    test("Then it should call status with 200", async () => {
      const expectedCode = 200;

      await userController.createUser(
        req as UserCreateRequest,
        res as UserCreateResponse,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedCode);
    });

    test("Then it should call json with user", async () => {
      const user: UserWithOutPasswordStructure = {
        id,
        name,
      };

      await userController.createUser(
        req as UserCreateRequest,
        res as UserCreateResponse,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ user });
    });
  });

  describe("When it is call with a request given a username and password but there is a error", () => {
    test("Then it should call next with 500 'Error in register new User'", async () => {
      const userRepository: Partial<UserRepositoryStructure> = {
        async userCreate() {
          throw new Error("yellow");
        },
      };

      const userController = new UserController(userRepository);

      const expectError: Partial<CustomError> = {
        statusCode: 500,
        message: "Error in register new User",
      };

      await userController.createUser(
        req as UserCreateRequest,
        res as UserCreateResponse,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectError));
    });
  });
});
