import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import { notifications } from "@mantine/notifications";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Rotas públicas que não devem exigir autenticação
const PUBLIC_ROUTES = [
  "/diseases",
  "/doctors",
  "/services",
  "/projects",
  "/faq",
  "/newsletter/subscribe",
  "/newsletter/unsubscribe",
  "/newsletter/count",
  "/contact/send",
  "/auth/signin",
  "/auth/signup",
];

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private isPublicRoute(url?: string): boolean {
    if (!url) return false;
    return PUBLIC_ROUTES.some((route) => url.includes(route));
  }

  private handleError(error: AxiosError) {
    const isPublicRoute = this.isPublicRoute(error.config?.url);

    if (error.response) {
      const status = error.response.status;
      const data: any = error.response.data;

      switch (status) {
        case 401:
          // Se for rota pública com erro 401, não redirecionar nem mostrar notificação
          if (isPublicRoute) {
            console.warn("401 em rota pública:", error.config?.url);
            break;
          }

          notifications.show({
            title: "Não autorizado",
            message: "Sua sessão expirou. Por favor, faça login novamente.",
            color: "red",
          });
          localStorage.removeItem("token");

          // Só redirecionar se não estiver já na página de login
          if (!window.location.pathname.includes("/admin/login")) {
            window.location.href = "/admin/login";
          }
          break;

        case 403:
          if (!isPublicRoute) {
            notifications.show({
              title: "Acesso negado",
              message: "Você não tem permissão para acessar este recurso.",
              color: "red",
            });
          }
          break;

        case 404:
          // Não mostrar notificação para 404 em rotas públicas (pode ser intencional)
          if (!isPublicRoute) {
            notifications.show({
              title: "Não encontrado",
              message: "O recurso solicitado não foi encontrado.",
              color: "orange",
            });
          }
          break;

        case 500:
          notifications.show({
            title: "Erro no servidor",
            message: "Ocorreu um erro no servidor. Tente novamente mais tarde.",
            color: "red",
          });
          break;

        default:
          // Só mostrar mensagem de erro genérica para rotas não públicas
          if (!isPublicRoute) {
            notifications.show({
              title: "Erro",
              message: data.message || "Ocorreu um erro inesperado.",
              color: "red",
            });
          }
      }
    } else if (error.request) {
      notifications.show({
        title: "Erro de conexão",
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão.",
        color: "red",
      });
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async upload<T>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<T> {
    const response = await this.client.post<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return response.data;
  }
}

export const apiClient = new ApiClient();

