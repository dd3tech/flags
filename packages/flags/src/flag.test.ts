import { describe, it, expect, vi, afterEach } from "vitest";
import { flag } from "./flag";

describe("flag", () => {
  it("should create a new flag if it does not exist", () => {
    const result = flag({ key: "test", enabled: () => true });
    expect(result.key).toBe("test");
    expect(result()).toBe(true);
  });

  it("should return the correct boolean value when enabled is synchronous", () => {
    const result = flag({ key: "syncTest", enabled: () => false });
    expect(result()).toBe(false);
  });

  it("should return a promise that resolves to the correct value when enabled is asynchronous", async () => {
    const asyncEnabled = vi.fn(() => Promise.resolve(true));
    const result = flag({ key: "asyncTest", enabled: asyncEnabled });
    await expect(result()).resolves.toBe(true);
    expect(asyncEnabled).toHaveBeenCalled();
  });

  it("should handle exceptions in enabled and return the defaultValue", () => {
    const errorFn = vi.fn(() => {
      throw new Error("Failed");
    });
    const result = flag({
      key: "errorTest",
      enabled: errorFn,
      defaultValue: true,
    });
    expect(result()).toBe(true);
    expect(errorFn).toHaveBeenCalled();
  });

  it("should correctly attach the description and defaultValue", () => {
    const description = "This is a test flag";
    const defaultValue = false;
    const result = flag({
      key: "descTest",
      enabled: () => true,
      description,
      defaultValue,
    });
    expect(result.description).toBe(description);
    expect(result.defaultValue).toBe(defaultValue);
  });

  it("should handle exceptions in enabled and return the defaultValue if provided, otherwise false", () => {
    const errorFn = vi.fn(() => {
      throw new Error("Failure during execution");
    });
    const defaultValueProvided = flag({
      key: "errorWithDefault",
      enabled: errorFn,
      defaultValue: true,
    });
    expect(defaultValueProvided()).toBe(true);
    expect(errorFn).toHaveBeenCalled();

    const noDefaultValue = flag({ key: "errorNoDefault", enabled: errorFn });
    expect(noDefaultValue()).toBe(false);
    expect(errorFn).toHaveBeenCalled();
  });
});
