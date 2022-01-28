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
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("POST /api/auth/register", () => {
  test.todo('');
  test.todo('');
});

describe("POST /api/auth/login", () => {
  test.todo('');
  test.todo('');
});

describe("GET /api/jokes", () => {
  test.todo('');
  test.todo('');
});
