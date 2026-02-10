import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { tokenManager } from "@/lib/token";
import type { LoginRequest, SignupRequest, AuthResponse } from "@/types";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signup = async (data: SignupRequest): Promise<AuthResponse | null> => {
    setIsLoading(true);
    try {
      const result = await authService.signup(data);
      tokenManager.set(result.token);
      router.push("/dashboard");
      return result;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginRequest): Promise<AuthResponse | null> => {
    setIsLoading(true);
    try {
      const result = await authService.login(data);
      tokenManager.set(result.token);
      router.push("/dashboard");
      return result;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      // Still logout on error
    } finally {
      tokenManager.remove();
      setIsLoading(false);
      router.push("/login");
    }
  };

  return {
    signup,
    login,
    logout,
    isLoading,
  };
};
