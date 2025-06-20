import { render, screen, waitFor } from "@testing-library/react";
import RandomJokeDisplay from "../components/Joke/Joke";
import { afterAll, beforeAll } from "vitest";
import server from "../mocks/server";
import { http } from "msw";

describe("RandomJokeDisplay component", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("render with response", async () => {
    render(<RandomJokeDisplay />);

    expect(screen.getByRole("heading")).toHaveTextContent(/loading/i);
    let h1 = await screen.findByRole("heading");
    expect(h1).toHaveTextContent(/funny joke/i);
  });
  it("render with response error", async () => {
    server.use(
      http.get("https://api.chucknorris.io/jokes/random", () => {
        return HttpResponse.json({}, { status: 500 });
      })
    );
    render(<RandomJokeDisplay />);

    expect(screen.getByRole("heading")).toHaveTextContent(/loading/i);

    let h1 = await screen.findByRole("heading");
    expect(h1).toHaveTextContent(/failed/i);
  });
  it("should render with an error message on failed response", async () => {
    server.use(
      http.get("https://api.chucknorris.io/jokes/random", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<RandomJokeDisplay />);

    expect(screen.getByRole("heading")).toHaveTextContent(/loading/i);

    const h1 = await screen.findByRole("heading", {
      name: /failed to fetch joke/i,
    });
    expect(h1).toHaveTextContent(/failed to fetch joke/i);
  });
});
