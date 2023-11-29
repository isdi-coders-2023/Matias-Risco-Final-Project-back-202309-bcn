import app from "../../../../server/app";
import { type GamesJson } from "../../controller/GamesController";
import gamesMock from "../../mock/gamesMock";
import { gamesToApi } from "../../utils/gamesTransformation";
import request from "supertest";

describe("Given GET /games endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and the information of 'Archer melo' and 'Jenga'", async () => {
      const expectCode = 200;
      const expectData = gamesToApi(gamesMock);
      const path = "/games";

      const respond = await request(app).get(path).expect(expectCode);

      const responseBody = respond.body as GamesJson;

      expect(responseBody.games).toEqual(expect.arrayContaining(expectData));
    });
  });
});
