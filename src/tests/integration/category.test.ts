// import supertest from "supertest";
// import server from "../../server";
// import Chance from "chance";
// import { AppDataSource } from "../../config/data-source";
// import log4js from "log4js";
// const log = log4js.getLogger("test:integration:category");
// log.level = "info";
// const chance = new Chance();

// // dummy category
// var category = {
//   categoryId: null,
//   tag: chance.word(),
// };

// describe("CATEGORY API", () => {
//   beforeAll(async () => {
//     await AppDataSource.initialize();
//   });

//   afterEach(async () => {
//     await server.close();
//   });

//   afterAll(async () => {
//     await AppDataSource.destroy();
//   });

//   describe("GET /api/v1/categories", () => {
//     it("should return a 200", async () => {
//       const res = await supertest(server).get("/api/v1/categories");
//       expect(res.statusCode).toBe(200);
//     });
//   });

//   describe("POST /api/v1/categories", () => {
//     it("should return a 200", async () => {
//       const res = await supertest(server)
//         .post("/api/v1/categories")
//         .send(category);
//       category.categoryId = res.body.data.id;
//       expect(res.statusCode).toBe(201);
//     });
//   });

//   describe("DELETE /api/v1/categories/:id", () => {
//     it("should return a 200", async () => {
//       const { categoryId } = category;
//       const res = await supertest(server).delete(
//         `/api/v1/categories/${categoryId}`
//       );
//       expect(res.statusCode).toBe(200);
//     });
//   });
// });
