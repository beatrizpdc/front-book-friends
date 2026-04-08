import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BookOpen, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { AuthConfigurationError } from "../auth/service";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthMode =
  | "login"
  | "signup"
  | "confirmSignUp"
  | "forgotPassword"
  | "resetPassword";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    login,
    register,
    confirmRegistration,
    resendRegistrationCode,
    startPasswordReset,
    submitPasswordReset,
    isAuthenticated,
    isConfigured,
  } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
    "/feed";

  const isLogin = mode === "login";
  const isSignUp = mode === "signup";
  const isConfirmSignUp = mode === "confirmSignUp";
  const isForgotPassword = mode === "forgotPassword";
  const isResetPassword = mode === "resetPassword";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const resetMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const switchToMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetMessages();
  };

  const handleAuthError = (error: unknown, fallbackMessage: string) => {
    if (error instanceof AuthConfigurationError) {
      setErrorMessage(
        "Configure as variaveis do Cognito no arquivo .env para habilitar o login.",
      );
      return;
    }

    if (error instanceof Error) {
      setErrorMessage(error.message);
      return;
    }

    setErrorMessage(fallbackMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetMessages();

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        navigate(redirectTo, { replace: true });
        return;
      }

      if (isSignUp) {
        const result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (result === "CONFIRM_SIGN_UP") {
          setMode("confirmSignUp");
          setSuccessMessage(
            "Conta criada. Digite o codigo enviado para seu email para confirmar o cadastro.",
          );
        } else {
          navigate(redirectTo, { replace: true });
        }

        return;
      }

      if (isConfirmSignUp) {
        await confirmRegistration({
          email: formData.email,
          code: confirmationCode,
        });
        setMode("login");
        setConfirmationCode("");
        setSuccessMessage("Cadastro confirmado. Agora voce ja pode entrar.");
        return;
      }

      if (isForgotPassword) {
        await startPasswordReset(formData.email);
        setMode("resetPassword");
        setSuccessMessage(
          "Enviamos um codigo para seu email. Digite o codigo e sua nova senha.",
        );
        return;
      }

      await submitPasswordReset({
        email: formData.email,
        code: confirmationCode,
        newPassword,
      });
      setMode("login");
      setFormData((current) => ({ ...current, password: "" }));
      setConfirmationCode("");
      setNewPassword("");
      setSuccessMessage("Senha redefinida com sucesso. Faca login com a nova senha.");
    } catch (error) {
      handleAuthError(error, "Nao foi possivel autenticar agora.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    resetMessages();

    try {
      await resendRegistrationCode(formData.email);
      setSuccessMessage("Enviamos um novo codigo de confirmacao para seu email.");
    } catch (error) {
      handleAuthError(error, "Nao foi possivel reenviar o codigo agora.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitLabel = isLogin
    ? "Entrar"
    : isSignUp
      ? "Criar Conta"
      : isConfirmSignUp
        ? "Confirmar Cadastro"
        : isForgotPassword
          ? "Enviar Codigo"
          : "Redefinir Senha";

  const loadingLabel = isLogin
    ? "Entrando..."
    : isSignUp
      ? "Criando conta..."
      : isConfirmSignUp
        ? "Confirmando..."
        : isForgotPassword
          ? "Enviando codigo..."
          : "Redefinindo...";

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-white">BookFriends</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Conecte-se com leitores.
            <br />
            Compartilhe historias.
          </h1>

          <p className="text-xl text-purple-100 leading-relaxed max-w-lg">
            Junte-se a maior comunidade de troca e doacao de livros do Brasil.
            Encontre pessoas apaixonadas por leitura e de nova vida aos seus livros.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">2.500+</div>
            <div className="text-purple-100 text-sm">Leitores</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">15k+</div>
            <div className="text-purple-100 text-sm">Livros</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">8.2k+</div>
            <div className="text-purple-100 text-sm">Trocas</div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BookFriends
            </span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-purple-100">
            <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => switchToMode("login")}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  isLogin ? "bg-white text-purple-600 shadow-md" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => switchToMode("signup")}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  isSignUp ? "bg-white text-purple-600 shadow-md" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isConfigured && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  Preencha o arquivo <strong>.env</strong> com os IDs do Cognito para testar o login localmente.
                </div>
              )}

              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              {isSignUp && (
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                    Nome Completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-12 h-12 text-base"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 h-12 text-base"
                  />
                </div>
              </div>

              {!isConfirmSignUp && !isForgotPassword && (
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-12 pr-12 h-12 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {(isConfirmSignUp || isResetPassword) && (
                <div>
                  <Label htmlFor="confirmation-code" className="text-sm font-medium text-gray-700 mb-2 block">
                    Codigo de confirmacao
                  </Label>
                  <Input
                    id="confirmation-code"
                    type="text"
                    required
                    placeholder="Digite o codigo recebido"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              )}

              {isResetPassword && (
                <div>
                  <Label htmlFor="new-password" className="text-sm font-medium text-gray-700 mb-2 block">
                    Nova senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      required
                      placeholder="Digite sua nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    disabled={!isConfigured}
                    onClick={() => switchToMode("forgotPassword")}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              {isSignUp && (
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Aceito os termos de uso e politica de privacidade.
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-base hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {loadingLabel}
                  </>
                ) : (
                  submitLabel
                )}
              </button>

              {isConfirmSignUp && (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="w-full text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  Reenviar codigo
                </button>
              )}

              {(isForgotPassword || isResetPassword || isConfirmSignUp) && (
                <button
                  type="button"
                  onClick={() => switchToMode("login")}
                  className="w-full text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Voltar para login
                </button>
              )}
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {(isLogin || isSignUp) && (
            <p className="text-center text-sm text-gray-600 mt-6">
              {isLogin ? "Ainda nao tem uma conta?" : "Ja tem uma conta?"}{" "}
              <button
                onClick={() => switchToMode(isLogin ? "signup" : "login")}
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                {isLogin ? "Cadastre-se" : "Faca login"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
