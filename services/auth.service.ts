import apiClient from "@/lib/api-client";
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  User,
  ApiSuccessResponse,
} from "@/types";

export const authService = {
  // Register a new user
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiSuccessResponse<AuthResponse>>(
      "/auth/signup",
      data
    );
    return response.data.data!;
  },

  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiSuccessResponse<AuthResponse>>(
      "/auth/login",
      data
    );
    return response.data.data!;
  },

  // Get current authenticated user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiSuccessResponse<{ user: User }>>(
      "/auth/me"
    );
    return response.data.data!.user;
  },

  // Logout user (client-side token removal)
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
