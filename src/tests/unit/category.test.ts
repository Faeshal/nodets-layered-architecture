import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import * as categoryService from "../../services/category";
import * as categoryRepo from "../../repositories/category";
import { Category } from "../../entities/Category";
import log4js from "log4js";
const log = log4js.getLogger("test:unit:category");
log.level = "info";

// style 1 (mock all)
vi.mock("../../repositories/category");

// style 2 (mock only the method needed)
// vi.mock("../repositories/category", () => ({
//   create: vi.fn(),
//   findAll: vi.fn(),
//   destroy: vi.fn(),
// }));

describe("UNIT:CATEGORY", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("add category", () => {
    it("should add a new category", async () => {
      // input
      const mockBody = { tag: "Test Category" };

      // expected output
      const mockCreatedCategory: Category = {
        id: "1", // Mocked UUID
        tag: mockBody.tag,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(0),
        incomes: [],
      };

      // Mocking the repository method
      (categoryRepo.create as Mock).mockResolvedValue(mockCreatedCategory);

      // call service
      const result = await categoryService.addCategory(mockBody);

      // expect result
      expect(categoryRepo.create).toHaveBeenCalledWith(mockBody);
      expect(result).toEqual(mockCreatedCategory);
    });
  });

  describe("get categories", () => {
    it("should get all categories", async () => {
      const mockCategories: Category[] = [
        {
          id: "1",
          tag: "Category 1",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(0),
          incomes: [],
        },
        {
          id: "2",
          tag: "Category 2",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(0),
          incomes: [],
        },
      ];

      const mockBody = { limit: 10, offset: 0, filter: {} };

      // Mocking the repository method
      (categoryRepo.findAll as Mock).mockResolvedValue(mockCategories);

      const result = await categoryService.getCategories(mockBody);

      expect(categoryRepo.findAll).toHaveBeenCalledWith(
        mockBody.limit,
        mockBody.offset,
        mockBody.filter,
      );
      expect(result).toEqual(mockCategories);
    });
  });

  describe("delete category", () => {
    it("should delete a category", async () => {
      const mockCategoryId = "1";

      // Mocking the repository method
      (categoryRepo.destroy as Mock).mockResolvedValue({ affected: 1 });

      const result = await categoryService.deleteCategory(mockCategoryId);

      expect(categoryRepo.destroy).toHaveBeenCalledWith(mockCategoryId);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
