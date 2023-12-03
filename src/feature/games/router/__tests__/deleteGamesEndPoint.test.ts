import app from "../../../../server/app";
import { type GamesJson } from "../../controller/GamesController";
import gamesMock from "../../mock/gamesMock";
import { type GameStructureApi, type GameStructure } from "../../types";
import { gamesWithOutId } from "../../utils/gamesTransformation";
import request from "supertest";

describe("Given DELETE /games/delete endpoint", () => {
  describe("When it receives a request with the param  id of Archer melo", () => {
    test("Then it should respond with a status 200 and the information of 'Archer melo'", async () => {
      const expectCode = 200;
      const expectData = gamesWithOutId(gamesMock);
      const archerMelo = expectData[0];
      const jenga = expectData[1];
      const path = "/games";

      const respond = await request(app).get(path);
      const { games } = respond.body as GamesJson;
      const idArcherMelo = games[0].id;

      const { game } = (
        await request(app)
          .delete(`${path}/delete/${idArcherMelo}`)
          .expect(expectCode)
      ).body as { game: GameStructureApi };

      const expectedRespond = (await request(app).get(path)).body as GamesJson;

      expect(game).toEqual(expect.objectContaining(archerMelo));

      expect(expectedRespond.games).toEqual(
        expect.arrayContaining([
          expect.not.objectContaining(archerMelo),
          expect.objectContaining(jenga),
        ]),
      );
    });
  });

  describe("When it receives a request with the param  id not in the database", () => {
    test("Then it should respond with a status 404 and Document not found", async () => {
      const expectCode = 404;
      const expectedMessage = "Document not found";
      const path = "/games/delete/";
      const id = "656cf0f9d92a620a411cd9c6";

      const response = await request(app)
        .delete(`${path}${id}`)
        .expect(expectCode);
      const { message } = response.body as { message: string };
      expect(message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with the param  id with the worng format", () => {
    test("Then it should respond with a status 404 and Document not found", async () => {
      const expectCode = 404;
      const expectedMessage = "Document not found";
      const path = "/games/delete/";
      const id = "QWQ2Q2354QQ5:ÄS[";

      const response = await request(app)
        .delete(`${path}${id}`)
        .expect(expectCode);
      const { message } = response.body as { message: string };
      expect(message).toBe(expectedMessage);
    });
  });
});
