import type { ApiResponse, PaginatedResponse, Disease } from "../types";
import { apiClient } from "./client";

export const diseasesService = {
  getAll: (page = 0, size = 10) =>
    apiClient.get<ApiResponse<PaginatedResponse<Disease>>>(
      `/diseases/paginated?page=${page}&size=${size}`
    ),

  getById: (id: number) =>
    apiClient.get<ApiResponse<Disease>>(`/diseases/${id}`),

  getFeaturedOfWeek: () =>
    apiClient.get<ApiResponse<Disease>>("/diseases/featured/week"),

  getFeaturedOfMonth: () =>
    apiClient.get<ApiResponse<Disease>>("/diseases/featured/month"),

  search: (keyword: string, page = 0, size = 10) =>
    apiClient.get<ApiResponse<PaginatedResponse<Disease>>>(
      `/diseases/search?keyword=${keyword}&page=${page}&size=${size}`
    ),
};

