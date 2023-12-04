import request from "supertest";
import app from "../../../../server/app";
import {
  type GameStructureApi,
  type GameStructureWithOutId,
} from "../../types";
import { newGame } from "../../mock/gamesMock";

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
});
