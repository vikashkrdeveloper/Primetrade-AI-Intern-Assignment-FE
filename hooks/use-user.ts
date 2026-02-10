import { useState, useEffect } from "react";
import { userService } from "@/services/user.service";
import type { User, UpdateProfileRequest } from "@/types";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const userData = await userService.getProfile();
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileRequest): Promise<User | null> => {
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateProfile(data);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await userService.updatePassword({ currentPassword, newPassword });
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      await userService.deleteAccount();
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    user,
    isLoading,
    isInitialLoading,
    fetchProfile,
    updateProfile,
    updatePassword,
    deleteAccount,
  };
};
