import apiClient from "@/lib/api-client";
import type {
  User,
  UpdateProfileRequest,
  UpdatePasswordRequest,
  ApiSuccessResponse,
} from "@/types";

export const userService = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiSuccessResponse<{ user: User }>>(
      "/users/profile"
    );
    return response.data.data!.user;
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await apiClient.put<ApiSuccessResponse<{ user: User }>>(
      "/users/profile",
      data
    );
    return response.data.data!.user;
  },

  // Update user password
  updatePassword: async (data: UpdatePasswordRequest): Promise<void> => {
    await apiClient.put("/users/password", data);
  },

  // Delete user account
  deleteAccount: async (): Promise<void> => {
    await apiClient.delete("/users/account");
  },
};
