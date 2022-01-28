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
  describe("user enters valid login info", () => {
    let res;
    beforeEach(async () => {
      res = await request(server)
        .post("/api/auth/login")
        .send({ username: "user", password: "password" });
    });

    test("[3] returns a status 200 OK", async () => {
      expect(res.status).toBe(200);
    });
    test("[4] returns the correct welcome message", async () => {
      expect(res.body.message).toBe("welcome, user");
    });
  });
  describe("user enters invalid login info", () => {
    test("[5] returns a status 401", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "wrong", password: "info" });
      expect(res.status).toBe(401);
    });
  });
});

describe("GET /api/jokes", () => {
  describe("invalid request to pull joke data", () => {
    let res;
    beforeEach(async () => {
      res = await request(server).get("/api/jokes");
    });

    test("[6] returns a status 401 if you aren't logged in", async () => {
      expect(res.status).toBe(401);
    });
    test("[7] returns correct error message on rejection", async () => {
      expect(res.body.message).toBe("token required");
    });
  });

  describe("user successfully pulls data", () => {
    test("[8] returns jokes on authorized login", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "user", password: "password" })
      let res2 = await request(server)
        .get("/api/jokes")
        .set("Authorization", res.body.token);
      expect(res2.status).toBe(200);
    });
  });
});
