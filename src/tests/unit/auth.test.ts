import * as authService from "../../services/auth";
import * as userRepo from "../../repositories/user";
import bcrypt from "bcrypt";
import log4js from "log4js";
const log = log4js.getLogger("test:unit:auth");
log.level = "info";

jest.mock("../../repositories/user.ts");
jest.mock("bcrypt"); // Mock bcrypt

describe("UNIT:AUTH", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a user", async () => {
      // input
      const inputService = {
        username: "faeshal",
        email: "faeshal@mail.com",
        password: "Password1!",
        role: "admin",
        address: "123 Main St",
        gender: "male",
        age: 30,
        job: "Software Engineer",
      };

      const hashedPassword = await bcrypt.hash(inputService.password, 12); // Hash password before mocking

      const inputRepo = {
        username: "faeshal",
        email: "faeshal@mail.com",
        password: hashedPassword,
        role: "admin",
        profile: {
          address: "123 Main St",
          gender: "male",
          age: 30,
          job: "Software Engineer",
        },
      };

      // expected response (without specific password value)
      const resRepo: any = {
        id: "1",
        username: inputService.username,
        email: inputService.email,
        role: inputService.role,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(0),
        profile: {
          id: "1",
          address: inputService.address,
          gender: inputService.gender,
          age: inputService.age,
          job: inputService.job,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(0),
        },
      };

      const resService = {
        id: "1",
        username: inputService.username,
        email: inputService.email,
      };

      // Mocking the methods
      (userRepo.create as jest.Mock).mockResolvedValue(resRepo);
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword); // Mock hash for this test

      // call service
      const result = await authService.register(inputService);

      // assertions
      expect(userRepo.create).toHaveBeenCalledWith(inputRepo);
      expect(userRepo.create).toHaveReturned();
      expect(result).toEqual(resService);
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      // input data
      const mockBody: any = {
        email: "faeshal@mail.com",
        password: "Password1!",
      };

      // mocked user object
      const mockUser = {
        id: 1,
        username: "faeshal",
        email: mockBody.email,
        password:
          "$2b$12$EPPfqkZQ7dkq4eS.92Snp.mMkfCurTXb/UEcR/UQEIdDu83KqJxtS", // Hashed password (replace with actual format)
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(0),
        profile: {
          job: "engineer",
          age: "27",
          address: "jakarta",
          gender: "male",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(0),
        },
      };

      // mocked userRepo behavior
      (userRepo.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

      // mocked bcrypt.compare (replace with actual behavior)
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true); // Simulate successful password match

      // expected result
      const expectedResult = {
        isLoggedIn: true,
        accessToken: expect.any(String), // Expect a string for access token
      };

      // call service
      const result = await authService.login(mockBody);

      // assertions
      expect(userRepo.findOne).toHaveBeenCalledWith({ email: mockBody.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockBody.password,
        mockUser.password
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
