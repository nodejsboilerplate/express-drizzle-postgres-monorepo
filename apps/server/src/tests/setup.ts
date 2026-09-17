import "dotenv/config";
import { vi } from "vitest";

vi.mock("@repo/shared", () => ({
  ApiError: class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
    }
  },
  ApiResponse: class ApiResponse {
    status: number;
    message: string;
    data: unknown;
    constructor(status: number, message: string, data?: unknown) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  },
  getSystemCustomErrorMsgByKey: (key: string) => key,
}));
