// Write your tests here
const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
// beforeEach(async () => {
//   await db.seed.run();
// });
afterAll(async () => {
  await db.destroy();
});

describe("POST /api/auth/register", () => {
  let res;
  beforeEach(async () => {
    res = await request(server)
      .post("/api/auth/register")
      .send({ username: "user", password: "password" });
  });

  test("returns a status 201 and complete user object", () => {
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, username: "user" });
  });
  test("prevents duplicate usernames with proper messaging", () => {
    expect(res.body.message).toBe("username taken");
  });
});

describe("POST /api/auth/login", () => {
  let res
  beforeEach(async () => {
    res = await request(server)
      .post("/api/auth/login")
      .send({ username: "user", password: "password" });
  });

  test("returns a status 200 OK", async () => {
    expect(res.status).toBe(200);
  });
  test("returns the correct welcome message", async () => {
    expect(res.body.message).toBe("welcome, user");
  });
});

describe("GET /api/jokes", () => {
  test("", () => {});
  test.todo("");
});
