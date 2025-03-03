import { render, screen } from "@testing-library/react";
import NotFoundPage from "./";

describe("NotFoundPage", () => {
  it("renders the 404 message", () => {
    render(<NotFoundPage />);

    // Check if the heading with the expected text is present
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "404 - NotFoundPage"
    );
  });
});
