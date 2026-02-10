import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { tokenManager } from "./token";
import type { ApiErrorResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082/api/v1";

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.get();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Show success toast for mutations (POST, PUT, DELETE) excluding auth endpoints
    if (["post", "put", "delete"].includes(response.config.method || "")) {
      const isAuthEndpoint = response.config.url?.includes("/auth/");
      const isUserEndpoint = response.config.url?.includes("/user/");
      
      // Don't show success toast for auth/user endpoints - they handle their own
      if (!isAuthEndpoint && !isUserEndpoint) {
        const message = response.data?.message || "Operation successful";
        if (response.data?.success) {
          toast.success(message);
        }
      }
    }
    
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Handle error responses
    let errorMessage = "An unexpected error occurred";
    
    if (error.response) {
      const { status, data } = error.response;
      
      // Extract error message
      errorMessage = data?.message || errorMessage;
      
      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          tokenManager.remove();
          errorMessage = "Session expired. Please login again";
          
          // Only redirect if not already on login page
          if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
          break;
          
        case 403:
          errorMessage = data?.message || "Access denied";
          break;
          
        case 404:
          errorMessage = data?.message || "Resource not found";
          break;
          
        case 409:
          errorMessage = data?.message || "Conflict - Resource already exists";
          break;
          
        case 422:
        case 400:
          // Validation errors
          if (data?.errors && Array.isArray(data.errors)) {
            errorMessage = data.errors.join(", ");
          }
          break;
          
        case 500:
          errorMessage = "Server error. Please try again later";
          break;
      }
    } else if (error.request) {
      // Network error
      errorMessage = "Network error. Please check your connection";
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    // Show error toast only for non-auth endpoints
    const isAuthEndpoint = error.config?.url?.includes("/auth/");
    if (!isAuthEndpoint) {
      toast.error(errorMessage);
    } else {
      // For auth errors, let the form handle them via reject
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
