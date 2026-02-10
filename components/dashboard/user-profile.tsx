"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/auth-context";
import { userService } from "@/services/user.service";
import { updateProfileSchema, updatePasswordSchema } from "@/lib/validations";
import type { UpdateProfileRequest } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Loader2, User as UserIcon, Lock, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function UserProfile() {
  const { user, logout, refreshUser } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
  } = useForm<UpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  useEffect(() => {
    if (user) {
      setProfileValue("name", user.name);
      setProfileValue("bio", user.bio || "");
      setProfileValue("avatar", user.avatar || "");
    }
  }, [user, setProfileValue]);

  const handleProfileUpdate = async (data: UpdateProfileRequest) => {
    setIsEditingProfile(true);
    try {
      await userService.updateProfile(data);
      await refreshUser();
      toast.success("Profile updated", {
        description: "Your profile has been successfully updated.",
      });
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error("Update failed", {
        description: error?.response?.data?.message || "Please try again.",
      });
    } finally {
      setIsEditingProfile(false);
    }
  };

  const handlePasswordUpdate = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    setIsChangingPassword(true);
    try {
      await userService.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      resetPassword();
      toast.success("Password updated", {
        description: "Your password has been changed successfully.",
      });
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error("Update failed", {
        description: error?.response?.data?.message || "Please check your current password.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await userService.deleteAccount();
      toast.success("Account deleted", {
        description: "Your account has been permanently deleted.",
      });
      logout();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error("Deletion failed", {
        description: error?.response?.data?.message || "Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center p-12">
        <Spinner className="size-8" />
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent >
          <form onSubmit={handleSubmitProfile(handleProfileUpdate)} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="size-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-foreground">{user.email}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Role:</span>
                  <Badge 
                    variant={user.role === "admin" ? "default" : "secondary"}
                    className="uppercase font-semibold"
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
            </div>

            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                id="name"
                placeholder="Your full name"
                {...registerProfile("name")}
              />
              {profileErrors.name && (
                <p className="text-sm text-destructive mt-1">
                  {profileErrors.name.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                {...registerProfile("bio")}
              />
              {profileErrors.bio && (
                <p className="text-sm text-destructive mt-1">
                  {profileErrors.bio.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="avatar">Avatar URL</FieldLabel>
              <Input
                id="avatar"
                placeholder="https://example.com/avatar.jpg"
                {...registerProfile("avatar")}
              />
              {profileErrors.avatar && (
                <p className="text-sm text-destructive mt-1">
                  {profileErrors.avatar.message}
                </p>
              )}
            </Field>

            <Button type="submit" disabled={isEditingProfile}>
              {isEditingProfile ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitPassword(handlePasswordUpdate)} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="currentPassword">Current Password *</FieldLabel>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...registerPassword("currentPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isChangingPassword}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-sm text-destructive mt-1">
                  {passwordErrors.currentPassword.message as string}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="newPassword">New Password *</FieldLabel>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...registerPassword("newPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isChangingPassword}
                >
                  {showNewPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-sm text-destructive mt-1">
                  {passwordErrors.newPassword.message as string}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password *</FieldLabel>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...registerPassword("confirmPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isChangingPassword}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {passwordErrors.confirmPassword.message as string}
                </p>
              )}
            </Field>

            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your data including tasks from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
