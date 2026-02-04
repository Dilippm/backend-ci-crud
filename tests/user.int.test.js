const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.MONGO_URI = uri;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("User CRUD Integration Test", () => {
  let userId;

  it("should create user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Dilip", email: "dilip@test.com" });

    expect(res.statusCode).toBe(201);
    userId = res.body._id;
  });

  it("should get users", async () => {
    const res = await request(app).get("/users");
    expect(res.body.length).toBe(1);
  });

  it("should update user", async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "Updated" });

    expect(res.body.name).toBe("Updated");
  });

  it("should delete user", async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(204);
  });
});
