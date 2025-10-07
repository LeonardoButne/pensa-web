import type { ApiResponse, PaginatedResponse } from "../types";
import { apiClient } from "./client";

export const doctorsService = {
  getAll: (page = 0, size = 10) =>
    apiClient.get<ApiResponse<PaginatedResponse<any>>>(
      `/doctors/paginated?page=${page}&size=${size}`
    ),

  getById: (id: number) => apiClient.get<ApiResponse<any>>(`/doctors/${id}`),

  getBySpecialty: (specialty: string) =>
    apiClient.get<ApiResponse<any[]>>(`/doctors/specialty/${specialty}`),

  search: (keyword: string, page = 0, size = 10) =>
    apiClient.get<ApiResponse<PaginatedResponse<any>>>(
      `/doctors/search?keyword=${keyword}&page=${page}&size=${size}`
    ),
};

