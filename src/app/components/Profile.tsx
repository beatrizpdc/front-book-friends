import { useParams, Link } from 'react-router';
import { mockUsers, mockBooks, currentUser } from '../data/mockData';
import { MapPin, BookOpen, Repeat, Settings, MessageCircle, Camera } from 'lucide-react';
import { Badge } from './ui/badge';

export default function Profile() {
  const { userId } = useParams();
  
  // If no userId in params, show current user's profile
  const user = userId ? mockUsers.find(u => u.id === userId) : currentUser;
  const isOwnProfile = !userId || userId === currentUser.id;
  
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usuário não encontrado</h2>
        <Link to="/matches" className="text-purple-600 hover:underline">
          Voltar para conexões
        </Link>
      </div>
    );
  }

  const userBooks = mockBooks.filter(book => book.ownerId === user.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 mb-8">
        {/* Cover Photo */}
        {isOwnProfile ? (
          <Link
            to="/profile-settings"
            className="block h-32 md:h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden group"
          >
            {user.banner && (
              <img
                src={user.banner}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center text-white">
                <Camera className="w-10 h-10 mx-auto mb-2" />
                <p className="font-medium">Alterar Banner</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="h-32 md:h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
            {user.banner && (
              <img
                src={user.banner}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
        
        {/* Profile Info */}
        <div className="px-6 md:px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20">
            {/* Avatar */}
            {isOwnProfile ? (
              <Link
                to="/profile-settings"
                className="relative group cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-8 border-white shadow-xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </Link>
            ) : (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-8 border-white shadow-xl"
              />
            )}
            
            {/* User Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {user.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{user.location}</span>
                    </div>
                    {user.gender && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span>{user.gender}</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  {isOwnProfile ? (
                    <>
                      <Link
                        to="/add-book"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <BookOpen className="w-5 h-5" />
                        Adicionar Livro
                      </Link>
                      <Link
                        to="/profile-settings"
                        className="px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/messages/1"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Enviar Mensagem
                      </Link>
                      <Link
                        to="/feed"
                        className="px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <BookOpen className="w-5 h-5" />
                        Ver Livros
                      </Link>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4 max-w-2xl">
                {user.bio}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {user.booksOwned}
                  </div>
                  <div className="text-sm text-gray-600">Livros</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-1">
                    {user.booksExchanged}
                  </div>
                  <div className="text-sm text-gray-600">Trocas</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {user.favoriteGenres.length}
                  </div>
                  <div className="text-sm text-gray-600">Gêneros</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Genres */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-600" />
          Gêneros Favoritos
        </h2>
        <div className="flex flex-wrap gap-3">
          {user.favoriteGenres.map((genre) => (
            <Badge
              key={genre}
              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 text-sm"
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      {/* User's Books */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Repeat className="w-6 h-6 text-purple-600" />
            {isOwnProfile ? 'Meus Livros' : `Livros de ${user.name}`}
          </h2>
          <span className="text-sm text-gray-600">
            {userBooks.length} {userBooks.length === 1 ? 'livro' : 'livros'}
          </span>
        </div>

        {userBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {isOwnProfile ? 'Você ainda não adicionou livros' : 'Nenhum livro disponível'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isOwnProfile
                ? 'Comece a compartilhar seus livros com a comunidade!'
                : 'Este usuário ainda não adicionou livros para troca ou doação.'}
            </p>
            {isOwnProfile && (
              <Link
                to="/add-book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Adicionar Primeiro Livro
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-purple-100 group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                    {book.author}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    {book.type === 'troca' ? 'Troca' : book.type === 'doacao' ? 'Doação' : 'Troca/Doação'}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}