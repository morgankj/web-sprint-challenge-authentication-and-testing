// Write your tests here
const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

test("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
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

  test("[1] returns a status 201 and complete user object", () => {
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, username: "user" });
  });
  test("[2] prevents duplicate usernames with proper messaging", () => {
    expect(res.body.message).toBe("username taken");
  });
});

describe("POST /api/auth/login", () => {
  describe("[3] user enters valid info", () => {
    let res;
    beforeEach(async () => {
      res = await request(server)
        .post("/api/auth/login")
        .send({ username: "user", password: "password" });
    });

    test("[3A] returns a status 200 OK", async () => {
      expect(res.status).toBe(200);
    });
    test("[3B] returns the correct welcome message", async () => {
      expect(res.body.message).toBe("welcome, user");
    });
  });
  describe("[4] user enters invalid info", () => {
    test("returns a status 401", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "wrong", password: "info" });
      expect(res.status).toBe(401);
    });
  });
});

describe("GET /api/jokes", () => {
  let res;
  beforeEach(async () => {
    res = await request(server).get("/api/jokes");
  });

  test("[5] returns a status 401 if you aren't logged in", async () => {
    expect(res.status).toBe(401);
  });
  test("[6] returns correct error message on rejection", async () => {
    expect(res.body.message).toBe("token required");
  });
});
