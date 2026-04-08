import { useState } from 'react';
import { Link } from 'react-router';
import { mockBooks } from '../data/mockData';
import { Search, Filter, MapPin, Gift, Repeat } from 'lucide-react';
import { Badge } from './ui/badge';

export default function Feed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'troca' | 'doacao'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = ['all', 'Fantasia', 'Ficção Científica', 'Romance', 'História', 'Clássicos', 'Autoajuda'];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || book.type === selectedType || book.type === 'ambos';
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    
    return matchesSearch && matchesType && matchesGenre;
  });

  const getTypeIcon = (type: string) => {
    if (type === 'troca') return <Repeat className="w-4 h-4" />;
    if (type === 'doacao') return <Gift className="w-4 h-4" />;
    return <><Repeat className="w-3 h-3" /><Gift className="w-3 h-3" /></>;
  };

  const getTypeBadgeColor = (type: string) => {
    if (type === 'troca') return 'bg-blue-100 text-blue-700';
    if (type === 'doacao') return 'bg-green-100 text-green-700';
    return 'bg-purple-100 text-purple-700';
  };

  const getTypeText = (type: string) => {
    if (type === 'troca') return 'Troca';
    if (type === 'doacao') return 'Doação';
    return 'Troca/Doação';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Livros Disponíveis
        </h1>
        <p className="text-gray-600">
          Descubra livros incríveis disponíveis para troca ou doação
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-purple-100">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Type Filter */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Tipo:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedType('troca')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedType === 'troca'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Repeat className="w-4 h-4" />
              Troca
            </button>
            <button
              onClick={() => setSelectedType('doacao')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedType === 'doacao'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Gift className="w-4 h-4" />
              Doação
            </button>
          </div>
        </div>

        {/* Genre Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-medium text-gray-700">Gênero:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genre === 'all' ? 'Todos' : genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-purple-100 group"
          >
            {/* Book Cover */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Book Info */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={`${getTypeBadgeColor(book.type)} flex items-center gap-1`}>
                  {getTypeIcon(book.type)}
                  {getTypeText(book.type)}
                </Badge>
                <Badge variant="outline">{book.genre}</Badge>
                <Badge variant="outline" className="text-xs">
                  {book.condition}
                </Badge>
              </div>

              {/* Owner Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={book.ownerAvatar}
                  alt={book.ownerName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {book.ownerName}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{book.ownerLocation}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Nenhum livro encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Tente ajustar seus filtros ou buscar por outros termos
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedGenre('all');
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
}
