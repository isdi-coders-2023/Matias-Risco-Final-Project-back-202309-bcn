import request from "supertest";
import app from "../../app";

describe("Given the middleware methodNotFound", () => {
  describe("When a Request without a method or path it is recive", () => {
    test("it should send a response with a error 404 'method not found'", async () => {
      const path = "/ergqiohujerdfgvwihopuj";
      const expectedStatusCode = 404;
      const expectedMessage = { message: "method not found" };

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedMessage);
    });
  });
});
