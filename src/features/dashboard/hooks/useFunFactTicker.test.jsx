import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import useFunFactTicker from "./useFunFactTicker";
describe("useFunFactTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe("happy path", () => {
    it("loads the first fun fact from the API", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([
          {
            id: 1,
            body: "Negroni is an Italian cocktail.",
            drink_name: "Negroni",
          },
        ]),
      });

      const { result } = renderHook(() => useFunFactTicker());

      expect(result.current.currentFact).toBeNull();
      expect(result.current.loading).toBe(true);

      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);

      expect(result.current.currentFact).toEqual({
        id: 1,
        body: "Negroni is an Italian cocktail.",
        drink_name: "Negroni",
      });
    });

    it("rotates to the next fact after the display duration", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([
          {
            id: 1,
            body: "Negroni fact",
            drink_name: "Negroni",
          },
          {
            id: 2,
            body: "Margarita fact",
            drink_name: "Margarita",
          },
        ]),
      });

      const { result } = renderHook(() => useFunFactTicker());

      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });

      expect(result.current.currentFact.drink_name).toBe(
        "Negroni"
      );

      act(() => {
        vi.advanceTimersByTime(500);
      });

      act(() => {
        vi.advanceTimersByTime(4700);
      });

      expect(result.current.isTransitioning).toBe(true);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.currentFact.drink_name).toBe(
        "Margarita"
      );
    });

    it("does not rotate when only one fact exists", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([
          {
            id: 1,
            body: "Negroni fact",
            drink_name: "Negroni",
          },
        ]),
      });

      const { result } = renderHook(() => useFunFactTicker());

      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });

      act(() => {
        vi.advanceTimersByTime(20000);
      });

      expect(result.current.currentFact.drink_name).toBe(
        "Negroni"
      );

      expect(result.current.isTransitioning).toBe(false);
    });
  });

  describe("sad path", () => {
    it("returns no current fact when the API returns an empty array", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      });

      const { result } = renderHook(() => useFunFactTicker());

      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.currentFact).toBeNull();
    });

    it("returns an error when the API request fails", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      const { result } = renderHook(() => useFunFactTicker());

      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });

      expect(result.current.loading).toBe(false);

      expect(result.current.error).toBe(
        "Unable to load fun facts"
      );

      expect(result.current.currentFact).toBeNull();
    });
  });
});