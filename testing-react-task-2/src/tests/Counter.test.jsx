import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import NumberCounter from "../components/Counter/Counter";

describe("NumberCounter", () => {
  it("should render with an initial count of 0", () => {
    render(<NumberCounter />);
    const countElement = screen.getByRole("heading", { name: "0" });
    expect(countElement).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it('should increment the count when the "+" button is clicked', async () => {
    const user = userEvent.setup();
    render(<NumberCounter />);

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    const countElement = screen.getByRole("heading", { name: "0" });

    await user.click(incrementButton);

    expect(countElement).toHaveTextContent("1");
    expect(screen.getByRole("heading", { name: "1" })).toBeInTheDocument();
  });

  it('should decrement the count when the "-" button is clicked', async () => {
    const user = userEvent.setup();
    render(<NumberCounter />);

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await user.click(incrementButton);

    const decrementButton = screen.getByRole("button", { name: "Decrement" });
    const countElement = screen.getByRole("heading", { name: "1" });

    await user.click(decrementButton);

    expect(countElement).toHaveTextContent("0");
    expect(screen.getByRole("heading", { name: "0" })).toBeInTheDocument();
  });

  it('should reset the count to 0 when the "Reset" button is clicked', async () => {
    const user = userEvent.setup();
    render(<NumberCounter />);

    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await user.click(incrementButton); // Count 1
    await user.click(incrementButton); // Count 2
    await user.click(incrementButton); // Count 3

    expect(screen.getByRole("heading", { name: "3" })).toBeInTheDocument();

    const resetButton = screen.getByRole("button", { name: "Reset" });
    const countElement = screen.getByRole("heading", { name: "3" });

    await user.click(resetButton);
    expect(countElement).toHaveTextContent("0");
    expect(screen.getByRole("heading", { name: "0" })).toBeInTheDocument();
  });

  it("should decrement count below zero", async () => {
    const user = userEvent.setup();
    render(<NumberCounter />);

    const decrementButton = screen.getByRole("button", { name: "Decrement" });
    await user.click(decrementButton); // Count -1

    expect(screen.getByRole("heading", { name: "-1" })).toBeInTheDocument();

    await user.click(decrementButton); // Count -2
    expect(screen.getByRole("heading", { name: "-2" })).toBeInTheDocument();
  });
});
