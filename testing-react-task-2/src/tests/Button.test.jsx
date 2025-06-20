import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CustomButton from "../components/Button/Button";
describe("CustomButton", () => {
  it("should render the children text", () => {
    render(<CustomButton> Click Me</CustomButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });
  it("should call the onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<CustomButton onClick={handleClick}>Test Button</CustomButton>);

    const buttonElement = screen.getByRole("button", { name: "Test Button" });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it("render with handler click event", async () => {
    let handleClick = vi.fn();
    render(<CustomButton onClick={handleClick}>click me</CustomButton>);
    let btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);

    expect(handleClick).toHaveBeenCalled();
  });
});
