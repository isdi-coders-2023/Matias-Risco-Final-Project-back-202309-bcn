import MongoMemoryServer from "mongodb-memory-server-core";
import debug from "debug";
import { connectToDatabase } from "..";
import mongoose from "mongoose";

let logSpy: jest.SpyInstance<any, any[]>;

beforeAll(async () => {
  logSpy = jest.spyOn(debug, "log");
});

afterEach(() => {
  logSpy.mockReset();
});

afterAll(async () => {
  logSpy.mockClear();
});

describe("Given the method connectToDatabase", () => {
  describe("When is given a mongosseDataBase Url as a param and call it", () => {
    test("Then it should call debug with 'Connected to database'", async () => {
      const server = await MongoMemoryServer.create();
      const mongoDbUrl = server.getUri();
      const expectedMessage = "Connected to database";

      await connectToDatabase(mongoDbUrl);
      await mongoose.disconnect();
      await server.stop();

      expect(logSpy.mock.calls[0][0]).toEqual(
        expect.stringContaining(expectedMessage),
      );
    });
  });

  describe("When is given a not mongosseDataBase Url as a param and call it", () => {
    test("Then it should call debug with 'Error can't connect to database:'", async () => {
      const mongoDbUrl = "not a url";
      const expectedMessage = "Error can't connect to database:";

      await connectToDatabase(mongoDbUrl);

      expect(logSpy.mock.calls[0][0]).toEqual(
        expect.stringContaining(expectedMessage),
      );
    });
  });
});
