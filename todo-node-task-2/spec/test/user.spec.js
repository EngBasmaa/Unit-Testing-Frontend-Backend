const supertest = require("supertest");
const app = require("../..");
const { clearDatabase } = require("../../db.connection");

const request = supertest(app);

describe("user routes", () => {
  let userToken;
  const mockUser = { name: "basma", email: "basma@test.com", password: "1234" };

  beforeAll(async () => {
    await request.post("/user/signup").send(mockUser);
    const res = await request.post("/user/login").send(mockUser);
    userToken = res.body.data; // لو محتاجة في المستقبل
  });

  it("GET /user should respond with status 200", async () => {
    const res = await request.get("/user");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("POST /user/login should respond with 200 and token", async () => {
    const res = await request.post("/user/login").send(mockUser);
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("POST /user/login with wrong password should respond with 401", async () => {
    const res = await request
      .post("/user/login")
      .send({ email: mockUser.email, password: "wrongpass" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/password/i);
  });

  it("GET /user/search should respond with the correct user", async () => {
    const res = await request.get("/user/search?name=basma");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("basma");
  });

  afterAll(async () => {
    await clearDatabase();
  });
});
