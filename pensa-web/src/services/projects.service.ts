import type { ApiResponse, PaginatedResponse } from "../types";
import { apiClient } from "./client";

export const projectsService = {
  getAll: (page = 0, size = 10) =>
    apiClient.get<ApiResponse<PaginatedResponse<any>>>(
      `/projects/paginated?page=${page}&size=${size}`
    ),

  getFeatured: () => apiClient.get<ApiResponse<any[]>>("/projects/featured"),

  getById: (id: number) => apiClient.get<ApiResponse<any>>(`/projects/${id}`),
};

