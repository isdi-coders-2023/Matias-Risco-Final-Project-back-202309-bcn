import mongoose from "mongoose";
import app from "../../../../server/app";
import gamesMock from "../../mock/gamesMock";
import request from "supertest";

describe("Given GET /games/count endpoint", () => {
  describe("When it receives a request, response, next", () => {
    test("Then it should respond with a status 200 and the numberGames 2", async () => {
      const expectCode = 200;
      const expectData = gamesMock.length;
      const path = "/games/count";

      const respond = await request(app).get(path).expect(expectCode);

      const { numberGames } = respond.body as { numberGames: number };

      expect(numberGames).toBe(expectData);
    });
  });

  describe("When it receives a request, response, next but there is a error", () => {
    test("Then it should respond with a status 400 and message 'Error problem in asking the number of games'", async () => {
      await mongoose.disconnect();
      const expectCode = 400;
      const expectData = "Error problem in asking the number of games";
      const path = "/games/count";

      const respond = await request(app).get(path).expect(expectCode);

      const { message } = respond.body as { message: string };

      expect(message).toBe(expectData);
    });
  });
});
