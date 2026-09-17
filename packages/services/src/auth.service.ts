import { ApiService } from "./api.service";
import type {
  CreateUserWithProfileInputType,
  LoginUserInputType,
} from "@repo/zod"; // adjust import path to wherever UserZSchema types are exported from

export class AuthService extends ApiService {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * POST /signup
   * Registers a new user with profile
   */
  signup(data: CreateUserWithProfileInputType) {
    return this.post("/signup", data);
  }

  /**
   * POST /login
   * Logs in a user via identifier (email/username) + password
   */
  login(data: LoginUserInputType) {
    return this.post("/login", data);
  }

  /**
   * GET /signin/google
   * Redirects to Google OAuth consent screen.
   * Typically not called via axios/XHR directly since it's a redirect flow —
   * usually you navigate the browser to this URL instead.
   */
  redirectGoogleAuthUrl() {
    return `${this.baseURL}/signin/google`;
  }

  /**
   * GET /callback/google
   * Handles the OAuth callback from Google (exchange code for session).
   * Include query params (e.g. `code`) as needed.
   */
  loginWithGoogle(params?: { code?: string; state?: string }) {
    return this.get("/callback/google", { params });
  }

  /**
   * GET /me
   * Fetches the currently authenticated user's basic data.
   * Requires auth middleware / cookie session.
   */
  getMe() {
    return this.get("/me");
  }
}
