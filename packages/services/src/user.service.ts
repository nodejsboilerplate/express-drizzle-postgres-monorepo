import { ApiService } from "./api.service";
import type {
  CreateUserAddressInputType,
  CreateUserContactInputType,
  CreateUserPhoneInputType,
  CreateUserEmailInputType,
  UpdateProfileInputType,
  UpdateAddressInputType,
  UpdateContactInputType,
  UpdatePhoneInputType,
  UpdateEmailInputType,
} from "@repo/zod";

export class UserService extends ApiService {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  // ---------------------------------------------------------
  // Create
  // ---------------------------------------------------------

  createAddress(data: CreateUserAddressInputType) {
    return this.post("/addresses", data);
  }

  createContact(data: CreateUserContactInputType) {
    return this.post("/contacts", data);
  }

  /** contactId: parent contact to attach the phone to */
  createPhone(contactId: string, data: CreateUserPhoneInputType) {
    return this.post(`/contacts/${contactId}/phones`, data);
  }

  /** contactId: parent contact to attach the email to */
  createEmail(contactId: string, data: CreateUserEmailInputType) {
    return this.post(`/contacts/${contactId}/emails`, data);
  }

  // ---------------------------------------------------------
  // Read
  // ---------------------------------------------------------

  getProfile() {
    return this.get("/profile");
  }

  // ---------------------------------------------------------
  // Update
  // ---------------------------------------------------------

  updateProfile(data: UpdateProfileInputType) {
    return this.patch("/profile", data);
  }

  updateAddress(addressId: string, data: UpdateAddressInputType) {
    return this.patch(`/addresses/${addressId}`, data);
  }

  updateContact(data: UpdateContactInputType) {
    return this.patch("/contacts", data);
  }

  /** phoneId: the phone record's own id */
  updatePhone(phoneId: string, data: UpdatePhoneInputType) {
    return this.patch(`/contacts/phones/${phoneId}`, data);
  }

  /** emailId: the email record's own id */
  updateEmail(emailId: string, data: UpdateEmailInputType) {
    return this.patch(`/contacts/emails/${emailId}`, data);
  }

  // ---------------------------------------------------------
  // Delete
  // ---------------------------------------------------------

  deleteUser() {
    return this.delete("/");
  }

  deleteAddress(addressId: string) {
    return this.delete(`/addresses/${addressId}`);
  }

  deleteContact(contactId: string) {
    return this.delete(`/contacts/${contactId}`);
  }

  /** phoneId: the phone record's own id */
  deletePhone(phoneId: string) {
    return this.delete(`/contacts/phones/${phoneId}`);
  }

  /** emailId: the email record's own id */
  deleteEmail(emailId: string) {
    return this.delete(`/contacts/emails/${emailId}`);
  }
}
