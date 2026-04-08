import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { GetCurrentUserOutput } from "aws-amplify/auth";
import {
  confirmRegistration as confirmRegistrationRequest,
  getAuthenticatedUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  resendRegistrationCode as resendRegistrationCodeRequest,
  startPasswordReset as startPasswordResetRequest,
  submitPasswordReset as submitPasswordResetRequest,
} from "./service";
import { hasRequiredAuthConfig } from "./amplify";

type AuthUser = GetCurrentUserOutput | null;

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = LoginParams & {
  name: string;
};

type AuthContextValue = {
  user: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  login: (params: LoginParams) => Promise<void>;
  register: (params: RegisterParams) => Promise<"CONFIRM_SIGN_UP" | "DONE">;
  confirmRegistration: (params: { email: string; code: string }) => Promise<void>;
  resendRegistrationCode: (email: string) => Promise<void>;
  startPasswordReset: (email: string) => Promise<void>;
  submitPasswordReset: (params: {
    email: string;
    code: string;
    newPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    if (!hasRequiredAuthConfig) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const currentUser = await getAuthenticatedUser();
    setUser(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const login = async ({ email, password }: LoginParams) => {
    await loginRequest(email, password);
    const currentUser = await getAuthenticatedUser();
    setUser(currentUser);
  };

  const register = async ({ name, email, password }: RegisterParams) => {
    const result = await registerRequest(name, email, password);

    if (result.isSignUpComplete) {
      const currentUser = await getAuthenticatedUser();
      setUser(currentUser);
      return "DONE";
    }

    return "CONFIRM_SIGN_UP";
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const confirmRegistration = async ({
    email,
    code,
  }: {
    email: string;
    code: string;
  }) => {
    await confirmRegistrationRequest(email, code);
  };

  const resendRegistrationCode = async (email: string) => {
    await resendRegistrationCodeRequest(email);
  };

  const startPasswordReset = async (email: string) => {
    await startPasswordResetRequest(email);
  };

  const submitPasswordReset = async ({
    email,
    code,
    newPassword,
  }: {
    email: string;
    code: string;
    newPassword: string;
  }) => {
    await submitPasswordResetRequest(email, code, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isConfigured: hasRequiredAuthConfig,
        login,
        register,
        confirmRegistration,
        resendRegistrationCode,
        startPasswordReset,
        submitPasswordReset,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth precisa ser usado dentro de um AuthProvider.");
  }

  return context;
}
