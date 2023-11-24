import request from "supertest";
import app from "../../../../server/app";

describe("Given router Ping", () => {
  describe("When a Request with the method get", () => {
    test("Then Respon with a message {message:'🏓'} with statusCode 200", async () => {
      const path = "/";
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toStrictEqual({ message: "🏓" });
    });
  });
});
