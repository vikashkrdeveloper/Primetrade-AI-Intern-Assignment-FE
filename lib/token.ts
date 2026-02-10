import Cookies from "js-cookie";

const TOKEN_KEY = "primetrade_auth_token";

export const tokenManager = {
  get: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  set: (token: string): void => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  remove: (): void => {
    Cookies.remove(TOKEN_KEY);
  },
};

// Export convenient functions
export const getToken = tokenManager.get;
export const setToken = tokenManager.set;
export const removeToken = tokenManager.remove;
