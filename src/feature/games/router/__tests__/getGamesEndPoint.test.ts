import app from "../../../../server/app";
import { type GamesJson } from "../../controller/GamesController";
import gamesMock from "../../mock/gamesMock";
import { gamesWithOutId } from "../../utils/gamesTransformation";
import request from "supertest";

describe("Given GET /games endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and the information of 'Archer melo' and 'Jenga'", async () => {
      const expectCode = 200;
      const expectData = gamesWithOutId(gamesMock);
      const archerMelo = expectData[0];
      const jenga = expectData[1];
      const path = "/games";

      const respond = await request(app)
        .get(path)
        .set("Accept", "application/json")
        .expect(expectCode);

      const responseBody = respond.body as GamesJson;

      expect(responseBody.games).toEqual(
        expect.arrayContaining([
          expect.objectContaining(archerMelo),
          expect.objectContaining(jenga),
        ]),
      );
    });
  });
});
