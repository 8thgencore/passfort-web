export interface IAuthStore {
    setToken(token: string): void;
    clearToken(): void;
    isAuthenticated(): boolean;
  }
  