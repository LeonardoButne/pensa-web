import type { FAQ } from "../types";
import type { ApiResponse } from "../types";
import { apiClient } from "./client";

export const faqService = {
  getAll: () => apiClient.get<ApiResponse<FAQ[]>>("/faq"),

  getByCategory: (category: string) =>
    apiClient.get<ApiResponse<FAQ[]>>(`/faq/category/${category}`),

  search: (keyword: string) =>
    apiClient.get<ApiResponse<FAQ[]>>(`/faq/search?keyword=${keyword}`),
};

