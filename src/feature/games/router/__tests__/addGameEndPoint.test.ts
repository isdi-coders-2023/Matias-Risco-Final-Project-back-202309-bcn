import request from "supertest";
import app from "../../../../server/app";
import {
  type GameStructureApi,
  type GameStructureWithOutId,
} from "../../types";
import { newGame } from "../../mock/gamesMock";
import mongoose from "mongoose";

describe("Given POST /games/add/ endpoint", () => {
  describe("When it receives a request with the info of 'new game' with out id", () => {
    test("Then it should respond with a status 200 and the information of 'new game' with id", async () => {
      const expectCode = 200;
      const path = "/games/add";

      const response = await request(app)
        .post(path)
        .send({ game: newGame })
        .expect(expectCode);

      const { game } = response.body as {
        game: GameStructureApi;
      };

      expect(game).toEqual(expect.objectContaining(newGame));
    });
  });

  describe("When it receives a request with the info with the Worng format", () => {
    test("Then it should respond with a status 400 and the information of 'new game' with id", async () => {
      const expectCode = 400;
      const path = "/games/add";

      const response = await request(app)
        .post(path)
        .send({ game: {} })
        .expect(expectCode);

      expect(response.body).toStrictEqual({
        message: expect.stringContaining("Validation Failed") as string,
      });
    });
  });

  describe("When it receives a request with the info of 'new game' with out id but there is a problem with the database", () => {
    test("Then it should respond with a status 409 and the message 'Error in add new game'", async () => {
      await mongoose.disconnect();
      const message = "Error in add new game";
      const expectCode = 409;
      const path = "/games/add";

      const response = await request(app)
        .post(path)
        .send({ game: newGame })
        .expect(expectCode);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.stringContaining(message) as string,
        }),
      );
    });
  });
});
