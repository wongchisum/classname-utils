import CXUtils from "../src/index.js";
import { expect, test, describe } from "vitest";

describe("CXUtils - Unit Tests", () => {
  describe("Direct usage of utils", () => {
    test("should return empty string when called with no arguments", () => {
      expect(CXUtils()).toBe("");
    });

    test("should combine simple class names", () => {
      expect(CXUtils("a", "b")).toBe("a b");
    });

    test("should ignore falsy values", () => {
      expect(CXUtils("a", false, null, undefined, "b")).toBe("a b");
    });

    test("should handle array input", () => {
      expect(CXUtils(["a", "b"])).toBe("a b");
    });

    test("should handle object input with truthy keys", () => {
      expect(CXUtils({ a: true, b: false, c: 1 })).toBe("a c");
    });

    test("should handle nested arrays and objects", () => {
      expect(CXUtils(["a", { b: true, c: false }], ["d", "e"])).toBe("a b d e");
    });
  });

  describe("Usage via utils.config()", () => {
    test("should return empty string even if prefix is an empty string", () => {
      const cxEmptyPrefix = CXUtils.config({ prefix: "" });
      expect(cxEmptyPrefix()).toBe("");
    });
    test("should isolate config instances", () => {
      const cx1 = CXUtils.config({
        prefix: "app",
        context: { primary: "base" },
      });
      const cx2 = CXUtils.config({
        prefix: "theme",
        context: { primary: "blue" },
      });

      expect(cx1("primary")).toBe("app-base");
      expect(cx2("primary")).toBe("theme-blue");
    });

    test("should apply prefix correctly", () => {
      const cx = CXUtils.config({ prefix: "app" });
      expect(cx("btn", "primary")).toBe("app-btn app-primary");
    });

    test('should support separator "-"', () => {
      const cx = CXUtils.config({ prefix: "app", separator: "-" });
      expect(cx("btn")).toBe("app-btn");
    });

    test('should support separator "_"', () => {
      const cx = CXUtils.config({ prefix: "app", separator: "_" });
      expect(cx("btn")).toBe("app_btn");
    });

    test("should map class name through context", () => {
      const cx = CXUtils.config({ context: { primary: "base" } });
      expect(cx("primary", "secondary")).toBe("base secondary");
    });

    test("should apply prefix after context mapping", () => {
      const cx = CXUtils.config({
        prefix: "app",
        separator: "-",
        context: { primary: "base" },
      });
      expect(cx("primary", "secondary")).toBe("app-base app-secondary");
    });

    test("should handle mix of string, object, and array inputs", () => {
      const cx = CXUtils.config({
        prefix: "ui",
        separator: "_",
        context: { active: "on" },
      });
      expect(cx("active", { hover: true }, ["selected", "focus"])).toBe(
        "ui_on ui_hover ui_selected ui_focus"
      );
    });

    test("should ignore falsy values when using config", () => {
      const cx = CXUtils.config({ prefix: "mod" });
      expect(cx("a", false, undefined, "b")).toBe("mod-a mod-b");
    });

    test("should return prefix when no args provided", () => {
      const cx = CXUtils.config({ prefix: "empty-case" });
      expect(cx()).toBe("empty-case");
    });
  });

  describe("Edge cases and robustness", () => {
    test("should not add extra spaces for empty or invalid inputs", () => {
      expect(CXUtils("", null, undefined, false)).toBe("");
    });

    test("should handle deeply nested arrays", () => {
      expect(CXUtils([[[["deep"]]]])).toBe("deep");
    });

    test("should handle object with number keys (numeric booleans)", () => {
      expect(CXUtils({ 0: 0, 1: 1, 2: true })).toBe("1 2");
    });

    test("should handle empty array", () => {
      expect(CXUtils([])).toBe("");
    });

    test("should ignore non-stringifiable values", () => {
      expect(CXUtils({ key: Symbol("sym") })).toBe("");
    });
  });
});
