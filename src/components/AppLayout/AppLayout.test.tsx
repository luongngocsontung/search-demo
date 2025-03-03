import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../AppLayout";

// Mock NavBar component
vi.mock("../NavBar", () => ({
  default: () => <nav data-testid="navbar">NavBar</nav>,
}));

describe("AppLayout", () => {
  it("renders the NavBar and Outlet content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<div data-testid="outlet-content">Page Content</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Check if NavBar is rendered
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    // Check if Outlet renders child components
    expect(screen.getByTestId("outlet-content")).toBeInTheDocument();
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });
});
