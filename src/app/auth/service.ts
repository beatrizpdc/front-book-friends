import {
  confirmResetPassword,
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";
import { hasRequiredAuthConfig } from "./amplify";

export class AuthConfigurationError extends Error {
  constructor() {
    super("As variaveis do Cognito nao foram configuradas no arquivo .env.");
    this.name = "AuthConfigurationError";
  }
}

const authErrorMessages: Record<string, string> = {
  NotAuthorizedException: "Email ou senha invalidos.",
  UserNotFoundException: "Nao encontramos uma conta com esse email.",
  UserAlreadyExistsException: "Ja existe uma conta cadastrada com esse email.",
  UsernameExistsException: "Ja existe uma conta cadastrada com esse email.",
  UserNotConfirmedException:
    "Sua conta ainda nao foi confirmada. Digite o codigo enviado para o seu email.",
  CodeMismatchException: "O codigo informado e invalido.",
  ExpiredCodeException: "O codigo expirou. Solicite um novo codigo.",
  LimitExceededException:
    "Muitas tentativas seguidas. Aguarde um pouco antes de tentar novamente.",
  TooManyRequestsException:
    "Muitas tentativas seguidas. Aguarde um pouco antes de tentar novamente.",
  TooManyFailedAttemptsException:
    "Muitas tentativas sem sucesso. Aguarde um pouco e tente novamente.",
  InvalidPasswordException:
    "A senha nao atende aos requisitos de seguranca configurados no Cognito.",
  InvalidParameterException: "Alguns dados informados sao invalidos. Revise e tente novamente.",
  CodeDeliveryFailureException:
    "Nao foi possivel enviar o codigo agora. Tente novamente em instantes.",
  PasswordResetRequiredException:
    "Voce precisa redefinir sua senha antes de continuar.",
  ResourceNotFoundException: "Nao foi possivel concluir a autenticacao agora.",
};

function assertConfig() {
  if (!hasRequiredAuthConfig) {
    throw new AuthConfigurationError();
  }
}

function normalizeAuthError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("Nao foi possivel autenticar agora.");
  }

  const errorName =
    "name" in error && typeof error.name === "string" ? error.name : "";

  const translatedMessage = authErrorMessages[errorName];

  if (translatedMessage) {
    return new Error(translatedMessage);
  }

  return error;
}

export async function login(email: string, password: string) {
  assertConfig();

  try {
    return await signIn({
      username: email,
      password,
    });
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function register(name: string, email: string, password: string) {
  assertConfig();

  try {
    return await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    });
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function confirmRegistration(email: string, code: string) {
  assertConfig();

  try {
    return await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function resendRegistrationCode(email: string) {
  assertConfig();

  try {
    return await resendSignUpCode({
      username: email,
    });
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function startPasswordReset(email: string) {
  assertConfig();

  try {
    return await resetPassword({
      username: email,
    });
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function submitPasswordReset(
  email: string,
  code: string,
  newPassword: string,
) {
  assertConfig();

  try {
    return await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function logout() {
  assertConfig();
  await signOut();
}

export async function getAuthenticatedUser() {
  assertConfig();

  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

export async function getAccessToken() {
  assertConfig();
  const session = await fetchAuthSession();
  return session.tokens?.accessToken?.toString() ?? null;
}
