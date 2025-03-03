import { render, screen } from "@testing-library/react";
import HighlightText from "../HighlightText";
import { HighlightTextProps } from "./types";

describe("HighlightText", () => {
  it("renders text correctly", () => {
    const props: HighlightTextProps = {
      texts: [
        { text: "Hello", type: "normal" },
        { text: " World", type: "bold" },
      ],
    };

    render(<HighlightText {...props} />);

    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText(/World/)).toBeInTheDocument(); // ✅ Fix: Use regex to match text
  });

  it("applies the correct class for bold text", () => {
    const props: HighlightTextProps = {
      texts: [
        { text: "Normal text", type: "normal" },
        { text: "Bold text", type: "bold" },
      ],
    };

    render(<HighlightText {...props} />);

    expect(screen.getByText("Normal text")).not.toHaveClass("font-semibold");
    expect(screen.getByText("Bold text")).toHaveClass("font-semibold");
  });
});
