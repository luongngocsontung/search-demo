import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

vi.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("should update the debounced value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("updated");
  });

  it("should reset the debounce timer when the value changes before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    rerender({ value: "first update", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: "second update", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("second update");
  });

  it("should clear the timeout on unmount", () => {
    const { unmount, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    rerender({ value: "updated", delay: 500 });

    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // No explicit assertion since unmounting should prevent updates and not throw errors
  });
});
