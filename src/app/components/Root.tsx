import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  BookOpen,
  Home,
  Users,
  Plus,
  User,
  LogOut,
  MessageCircle,
  Bell,
} from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { mockConversations } from "../data/mockMessages";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Calculate total unread messages
  const totalUnreadMessages = mockConversations.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BookFriends
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/') && location.pathname === '/' 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Início</span>
              </Link>
              <Link 
                to="/feed" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/feed') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Livros</span>
              </Link>
              <Link 
                to="/matches" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/matches') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Conexões</span>
              </Link>
              <Link 
                to="/messages" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/messages') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Mensagens</span>
              </Link>
              <Link 
                to="/profile" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/profile') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Perfil</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {/* Notifications Bell */}
              <Link
                to="/messages"
                className="relative p-2 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-600 hover:text-purple-600" />
                {totalUnreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                    {totalUnreadMessages > 9 ? '9+' : totalUnreadMessages}
                  </span>
                )}
              </Link>

              <Link
                to="/add-book"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <Plus className="w-5 h-5" />
                <span>Adicionar Livro</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 px-4">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/') && location.pathname === '/' 
                ? 'text-purple-600' 
                : 'text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Início</span>
          </Link>
          <Link
            to="/feed"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/feed') 
                ? 'text-purple-600' 
                : 'text-gray-600'
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">Livros</span>
          </Link>
          <Link
            to="/add-book"
            className="flex flex-col items-center gap-1 -mt-6"
          >
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-7 h-7 text-white" />
            </div>
          </Link>
          <Link
            to="/messages"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${
              isActive('/messages')
                ? 'text-purple-600'
                : 'text-gray-600'
            }`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Mensagens</span>
            {totalUnreadMessages > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                {totalUnreadMessages > 9 ? '9+' : totalUnreadMessages}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive('/profile')
                ? 'text-purple-600'
                : 'text-gray-600'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
