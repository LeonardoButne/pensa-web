import type { ApiResponse, NewsletterSubscription } from "../types";
import { apiClient } from "./client";

export const newsletterService = {
  subscribe: (data: NewsletterSubscription) =>
    apiClient.post<ApiResponse<string>>("/newsletter/subscribe", data),

  unsubscribe: (email: string) =>
    apiClient.post<ApiResponse<string>>(
      `/newsletter/unsubscribe?email=${email}`
    ),

  getCount: () => apiClient.get<ApiResponse<number>>("/newsletter/count"),
};

