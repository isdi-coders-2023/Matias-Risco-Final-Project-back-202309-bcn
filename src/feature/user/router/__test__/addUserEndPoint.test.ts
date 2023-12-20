import request from "supertest";
import mongoose from "mongoose";
import { newUser } from "../../mock/usersMock";
import { type UserWithOutPasswordStructure } from "../../types";
import app from "../../../../server/app";

describe("Given POST /users/add/ endpoint", () => {
  const path = "/users/add";
  describe("When it receives a request with the info of 'new user' with out id", () => {
    test("Then it should respond with a status 200 and the information of 'new user' with id and without password", async () => {
      const expectCode = 200;

      const response = await request(app)
        .post(path)
        .send({ user: newUser })
        .expect(expectCode);

      const { user } = response.body as {
        user: UserWithOutPasswordStructure;
      };

      expect(user).toEqual(expect.objectContaining({ name: newUser.name }));
    });
  });

  describe("When it receives a request with the info with the Worng format", () => {
    test("Then it should respond with a status 400 and the information of 'new game' with id", async () => {
      const expectCode = 400;

      const response = await request(app)
        .post(path)
        .send({ user: {} })
        .expect(expectCode);

      expect(response.body).toStrictEqual({
        message: expect.stringContaining("Validation Failed") as string,
      });
    });
  });

  describe("When it receives a request with the info of 'new user' with out id but there is a problem with the database", () => {
    test("Then it should respond with a status 500 and the message 'Error in add new game'", async () => {
      await mongoose.disconnect();
      const message = "Error in register new User";
      const expectCode = 500;

      const response = await request(app)
        .post(path)
        .send({ user: newUser })
        .expect(expectCode);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.stringContaining(message) as string,
        }),
      );
    });
  });
});
