const supertest = require("supertest");
const app = require("../..");
const { clearDatabase } = require("../../db.connection");

const request = supertest(app);

describe("todo routes", () => {
  let token;

  beforeAll(async () => {
    const user = { name: "mona", email: "mona@test.com", password: "1234" };
    await request.post("/user/signup").send(user);
    const res = await request.post("/user/login").send(user);
    token = res.body.data;
  });

  it("GET /todo should return 200 and empty array", async () => {
    const res = await request.get("/todo");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it("POST /todo without auth should return 401", async () => {
    const res = await request.post("/todo").send({ title: "task" });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/login first/i);
  });

  it("POST /todo with auth should create todo", async () => {
    const res = await request
      .post("/todo")
      .send({ title: "task one" })
      .set({ authorization: token });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("task one");
  });

  it("GET /todo/:id should return todo", async () => {
    const create = await request
      .post("/todo")
      .send({ title: "task two" })
      .set({ authorization: token });
    const id = create.body.data._id;

    const res = await request.get(`/todo/${id}`).set({ authorization: token });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("task two");
  });

  it("PATCH /todo/:id without title should return 400", async () => {
    const create = await request
      .post("/todo")
      .send({ title: "original title" })
      .set({ authorization: token });
    const id = create.body.data._id;

    const res = await request
      .patch(`/todo/${id}`)
      .send({})
      .set({ authorization: token });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/must provide title and id/i);
  });

  it("PATCH /todo/:id with title should update", async () => {
    const create = await request
      .post("/todo")
      .send({ title: "update me" })
      .set({ authorization: token });
    const id = create.body.data._id;

    const res = await request
      .patch(`/todo/${id}`)
      .send({ title: "updated" })
      .set({ authorization: token });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("updated");
  });

  it("GET /todo/user should return user's todos", async () => {
    await request
      .post("/todo")
      .send({ title: "user todo" })
      .set({ authorization: token });

    const res = await request.get("/todo/user").set({ authorization: token });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("GET /todo/user for user with no todos should return message", async () => {
    const newUser = {
      name: "clean",
      email: "clean@test.com",
      password: "1234"
    };
    await request.post("/user/signup").send(newUser);
    const loginRes = await request.post("/user/login").send(newUser);
    const newToken = loginRes.body.data;

    const res = await request
      .get("/todo/user")
      .set({ authorization: newToken });
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/couldn't find any todos/i);
  });

  afterAll(async () => {
    await clearDatabase();
  });
});
