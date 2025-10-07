import type { LoginCredentials, LoginResponse } from "../types";
import type { ApiResponse } from "../types";
import { apiClient } from "./client";

export const authService = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<ApiResponse<LoginResponse>>("/auth/signin", credentials),

  signup: (data: any) => apiClient.post<ApiResponse<any>>("/auth/signup", data),

  getCurrentUser: () => apiClient.get<ApiResponse<any>>("/auth/me"),

  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.post<ApiResponse<string>>("/auth/change-password", {
      oldPassword,
      newPassword,
    }),
};
