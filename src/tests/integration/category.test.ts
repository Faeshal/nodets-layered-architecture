import supertest from "supertest";
import app from "../../server";
import Chance from "chance";
import { AppDataSource } from "../../config/data-source";
import log4js from "log4js";
const log = log4js.getLogger("test:integration:category");
log.level = "info";
const chance = new Chance();

var server: any;

// dummy category
var category = {
  categoryId: null,
  tag: chance.word(),
};

describe("INTEGRATION:CATEGORY", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    // server = app.listen(chance.integer());
  });

  //   afterEach(async () => {
  //     await server.close();
  //   });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("GET /api/v1/categories", () => {
    it("should return a 200", async () => {
      const res = await supertest(app).get("/api/v1/categories");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /api/v1/categories", () => {
    it("should return a 200", async () => {
      const res = await supertest(app)
        .post("/api/v1/categories")
        .send(category);
      category.categoryId = res.body.data.id;
      expect(res.status).toBe(201);
    });
  });

  describe("DELETE /api/v1/categories/:id", () => {
    it("should return a 200", async () => {
      const { categoryId } = category;
      const res = await supertest(app).delete(
        `/api/v1/categories/${categoryId}`
      );
      expect(res.status).toBe(201);
    });
  });
});
