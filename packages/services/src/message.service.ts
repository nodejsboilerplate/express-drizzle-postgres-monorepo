import { ApiService } from "./api.service";
import type { VerifyCodeInputType } from "@repo/zod";

export class MessageService extends ApiService {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  // ---------------------------------------------------------
  // Signup verification
  // ---------------------------------------------------------

  resendSignupCode() {
    return this.post("/signup/code", {});
  }

  verifySignupCode(data: Pick<VerifyCodeInputType, "verify_code">) {
    return this.post("/verify/signup/code", data);
  }

  // ---------------------------------------------------------
  // Contact phone verification
  // ---------------------------------------------------------

  /** phoneId: the phone record's own id */
  sendContactPhoneVerificationCode(phoneId: string) {
    return this.post(`/contacts/phones/${phoneId}/code`, {});
  }

  /** phoneId: the phone record's own id */
  verifyContactPhone(
    phoneId: string,
    data: Pick<VerifyCodeInputType, "verify_code">
  ) {
    return this.post(`/verify/contacts/phones/${phoneId}`, data);
  }

  // ---------------------------------------------------------
  // Contact email verification
  // ---------------------------------------------------------

  /** emailId: the email record's own id */
  sendContactEmailVerificationCode(emailId: string) {
    return this.post(`/contacts/emails/${emailId}/code`, {});
  }

  /** emailId: the email record's own id */
  verifyContactEmail(
    emailId: string,
    data: Pick<VerifyCodeInputType, "verify_code">
  ) {
    return this.post(`/verify/contacts/emails/${emailId}`, data);
  }
}
