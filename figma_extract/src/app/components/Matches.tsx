import { Link } from 'react-router';
import { mockMatches } from '../data/mockData';
import { Heart, MapPin, BookOpen, MessageCircle, Sparkles } from 'lucide-react';

export default function Matches() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Suas Conexões
        </h1>
        <p className="text-gray-600">
          Leitores com gostos semelhantes aos seus
        </p>
      </div>

      {/* Match Algorithm Info */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Como funcionam as conexões?</h3>
            <p className="text-purple-100 leading-relaxed">
              Nosso algoritmo analisa seus gêneros favoritos, livros disponíveis e localização 
              para encontrar pessoas com gostos literários semelhantes. Quanto maior a compatibilidade, 
              mais livros e interesses vocês têm em comum!
            </p>
          </div>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockMatches.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all"
          >
            {/* Match Header with Compatibility */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={match.userAvatar}
                      alt={match.userName}
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/profile/${match.userId}`}
                      className="font-bold text-lg text-gray-900 hover:text-purple-600 transition-colors"
                    >
                      {match.userName}
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{match.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Compatibility Score */}
                <div className="text-center">
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-purple-100"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - match.compatibility / 100)}`}
                        className="text-purple-600 transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">
                        {match.compatibility}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Match</div>
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="p-6">
              {/* Common Genres */}
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Gêneros em Comum
                </h4>
                <div className="flex flex-wrap gap-2">
                  {match.commonGenres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mutual Books */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>
                    <strong className="text-gray-900">{match.mutualBooks}</strong> livros de interesse mútuo
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/profile/${match.userId}`}
                  className="px-4 py-3 bg-white text-purple-600 border-2 border-purple-200 rounded-xl font-medium hover:bg-purple-50 transition-colors text-center"
                >
                  Ver Perfil
                </Link>
                <Link
                  to={`/messages/${match.id}`}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Mensagem
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Find More Matches CTA */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-purple-100 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Quer encontrar mais conexões?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Adicione mais livros ao seu perfil e atualize seus gêneros favoritos para que possamos 
          encontrar leitores ainda mais compatíveis com você!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/add-book"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Adicionar Livros
          </Link>
          <Link
            to="/profile"
            className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-200 rounded-xl font-medium hover:bg-purple-50 transition-colors inline-flex items-center justify-center gap-2"
          >
            Editar Perfil
          </Link>
        </div>
      </div>
    </div>
  );
}