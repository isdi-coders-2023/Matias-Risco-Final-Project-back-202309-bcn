import request from "supertest";
import app from "../../../../server/app";
import { type GameStructureApi } from "../../types";
import { newGame } from "../../mock/gamesMock";
import mongoose from "mongoose";

describe("Given get /games/info/ endpoint", () => {
  describe("When it receives a request with the info  with id of 'Archer melo'", () => {
    test("Then it should respond with a status 200 and the information of 'Archer melo'", async () => {
      const expectCode = 200;

      const { games } = (await request(app).get("/games").expect(expectCode))
        .body as {
        games: GameStructureApi[];
      };

      const archerMelo = games.find(({ name }) => name === "Archer melo");
      const path = `/games/info/${archerMelo?.id}`;

      const response = await request(app).get(path).expect(expectCode);

      const { game: gameInfo } = response.body as {
        game: GameStructureApi;
      };

      expect(gameInfo).toStrictEqual(archerMelo);
    });
  });

  describe("When it receives a request with the id with the Worng format", () => {
    test("Then it should respond with a status 404 and Document not found", async () => {
      const expectCode = 404;
      const expectedMessage = "Game not found";
      const path = "/games/info/";
      const id = "QWQ2Q2354QQ5:ÄS[";

      const response = await request(app)
        .get(`${path}${id}`)
        .expect(expectCode);

      const { message } = response.body as { message: string };
      expect(message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with the id with no item", () => {
    test("Then it should respond with a status 404 and Document not found", async () => {
      const expectCode = 404;
      const expectedMessage = "Game not found";
      const path = "/games/info/";
      const id = "656cf0f9d92a620a411cd9c6";

      const response = await request(app)
        .get(`${path}${id}`)
        .expect(expectCode);

      const { message } = response.body as { message: string };
      expect(message).toBe(expectedMessage);
    });
  });
});
