import type { ApiResponse, PaginatedResponse } from "../types";
import { apiClient } from "./client";

export const servicesService = {
  getAll: (page = 0, size = 10) =>
    apiClient.get<ApiResponse<PaginatedResponse<any>>>(
      `/services/paginated?page=${page}&size=${size}`
    ),

  getById: (id: number) => apiClient.get<ApiResponse<any>>(`/services/${id}`),

  getByType: (type: string) =>
    apiClient.get<ApiResponse<any[]>>(`/services/type/${type}`),
};

