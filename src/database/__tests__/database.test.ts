import MongoMemoryServer from "mongodb-memory-server-core";
import debug from "debug";
import { connectToDatabase } from "..";
import mongoose from "mongoose";
import { server } from "../../setUpTest";

let logSpy: jest.SpyInstance<any, any[]>;

beforeAll(async () => {
  logSpy = jest.spyOn(debug, "log");
});

beforeEach(() => {
  logSpy.mockReset();
});

afterAll(async () => {
  logSpy.mockClear();
});

describe("Given the function connectToDatabase", () => {
  describe("When is given a mongosseDataBase Url as a param and call it", () => {
    test("Then it should call debug with 'Connected to database'", async () => {
      const expectedMessage = "Connected to database";

      await connectToDatabase(server.getUri());

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
