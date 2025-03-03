import { render, screen } from "@testing-library/react";
import NavBar from ".";
import { NAVBAR_TITLE_1, NAVBAR_TITLE_2 } from "@/constants/text";

// Mock the SVG import
vi.mock("@/assets/svgs/logo.svg?react", () => ({
  default: () => <svg data-testid="logo" />,
}));

describe("NavBar", () => {
  it("renders the logo and navigation titles correctly", () => {
    render(<NavBar />);

    // Check if the logo is rendered
    expect(screen.getByTestId("logo")).toBeInTheDocument();

    // Check if the navigation titles are rendered
    expect(screen.getByText(NAVBAR_TITLE_1)).toBeInTheDocument();
    expect(screen.getByText(NAVBAR_TITLE_2)).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    render(<NavBar />);

    const navText = screen.getByText(NAVBAR_TITLE_2);

    // Check if NAVBAR_TITLE_2 has the bold styling
    expect(navText).toHaveClass("font-semibold");
  });
});
