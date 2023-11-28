import debug from "debug";
import app, { startServer } from "../app";
import request from "supertest";
import type * as http from "http";

const port = process.env.PORT ?? 4000;
let server: http.Server;
let logSpy: jest.SpyInstance<any, any[]>;

beforeAll(() => {
  server = startServer(+port);
  logSpy = jest.spyOn(debug, "log");
});

afterAll((done) => {
  logSpy.mockClear();
  server.close(done);
});

describe("Given the function startServer", () => {
  describe("When startServer is call it", () => {
    test("Then it should call debug with params containg 'Listening on port: 3693' ", async () => {
      const expectedMessage = `Listening on port: ${port}`;
      await request(app).get("/").expect(200);

      expect(logSpy.mock.calls[0][0]).toEqual(
        expect.stringContaining(expectedMessage),
      );
    });
  });
});
