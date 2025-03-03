import { render } from "@testing-library/react";
import Spinner from "./";

describe("Spinner", () => {
  test("renders the spinner component", () => {
    const { container } = render(<Spinner />);

    // Check if the spinner div exists
    const spinner = container.querySelector("div");
    expect(spinner).toBeInTheDocument();

    // Check if it has the correct Tailwind classes
    expect(spinner).toHaveClass(
      "w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"
    );
  });
});
