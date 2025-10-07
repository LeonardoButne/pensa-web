import type { ApiResponse, ContactMessage } from "../types";
import { apiClient } from "./client";

export const contactService = {
  send: (data: ContactMessage) =>
    apiClient.post<ApiResponse<string>>("/contact/send", data),
};

