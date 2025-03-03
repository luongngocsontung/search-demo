import { renderHook, act } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { useQueryParams } from "../useQueryParams";
import { QueryParams } from "@/constants/param";
import { Mock } from "vitest";

// Mock react-router's useSearchParams
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("useQueryParams", () => {
  it("should return an empty string if the parameter is not set", () => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);

    const { result } = renderHook(() => useQueryParams(QueryParams.SEARCH), {
      wrapper: MemoryRouter,
    });

    expect(result.current[0]).toBe("");
  });

  it("should return the correct query param value", () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ [QueryParams.SEARCH]: "test-value" }),
      vi.fn(),
    ]);

    const { result } = renderHook(() => useQueryParams(QueryParams.SEARCH), {
      wrapper: MemoryRouter,
    });

    expect(result.current[0]).toBe("test-value");
  });

  it("should update the query parameter value", () => {
    const setParamsMock = vi.fn();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      setParamsMock,
    ]);

    const { result } = renderHook(() => useQueryParams(QueryParams.SEARCH), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current[1]("new-value");
    });

    expect(setParamsMock).toHaveBeenCalledWith({
      [QueryParams.SEARCH]: "new-value",
    });
  });
});
