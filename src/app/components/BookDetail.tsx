import { useParams, Link, useNavigate } from 'react-router';
import { mockBooks, currentUser } from '../data/mockData';
import { ArrowLeft, MapPin, Calendar, BookOpen, MessageCircle, Repeat, Gift, Heart } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';

export default function BookDetail() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find(b => b.id === bookId);
  const [interestSent, setInterestSent] = useState(false);

  const handleInterest = () => {
    if (!book) return;

    // Determine the type of interest
    const interestType = book.type === 'troca'
      ? 'Troca'
      : book.type === 'doacao'
      ? 'Doação'
      : 'Troca ou Doação';

    // Simulate sending an automated message to the book owner
    const automaticMessage = `📚 ${currentUser.name} demonstrou interesse no seu livro "${book.title}" (${interestType}).\n\nLivro: ${book.title}\nAutor: ${book.author}\nTipo: ${interestType}\nCondição: ${book.condition}\n\nResponda esta mensagem para combinar os detalhes!`;

    console.log('Mensagem automática enviada:', {
      from: currentUser.id,
      to: book.ownerId,
      message: automaticMessage,
      bookId: book.id,
    });

    setInterestSent(true);

    // Show success feedback
    setTimeout(() => {
      const confirmNavigate = window.confirm(
        `✅ Interesse enviado com sucesso!\n\n` +
        `${book.ownerName} receberá uma notificação sobre seu interesse no livro "${book.title}".\n\n` +
        `Deseja ir para as mensagens agora?`
      );

      if (confirmNavigate) {
        navigate('/messages/1');
      }
    }, 500);
  };

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Livro não encontrado</h2>
        <Link to="/feed" className="text-purple-600 hover:underline">
          Voltar para o feed
        </Link>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    if (type === 'troca') return <Repeat className="w-5 h-5" />;
    if (type === 'doacao') return <Gift className="w-5 h-5" />;
    return <><Repeat className="w-4 h-4" /><Gift className="w-4 h-4" /></>;
  };

  const getTypeBadgeColor = (type: string) => {
    if (type === 'troca') return 'bg-blue-100 text-blue-700';
    if (type === 'doacao') return 'bg-green-100 text-green-700';
    return 'bg-purple-100 text-purple-700';
  };

  const getTypeText = (type: string) => {
    if (type === 'troca') return 'Disponível para Troca';
    if (type === 'doacao') return 'Disponível para Doação';
    return 'Disponível para Troca ou Doação';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/feed"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para livros
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left Column - Book Cover */}
          <div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg sticky top-8">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Book Details */}
          <div className="flex flex-col">
            {/* Type Badge */}
            <div className="mb-4">
              <Badge className={`${getTypeBadgeColor(book.type)} text-base px-4 py-2 flex items-center gap-2 w-fit`}>
                {getTypeIcon(book.type)}
                {getTypeText(book.type)}
              </Badge>
            </div>

            {/* Title and Author */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{book.author}</p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Gênero</span>
                </div>
                <p className="text-gray-900">{book.genre}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Condição</span>
                </div>
                <p className="text-gray-900">{book.condition}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Sobre o livro</h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Available Since */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Calendar className="w-4 h-4" />
              <span>Disponível desde {new Date(book.availableSince).toLocaleDateString('pt-BR')}</span>
            </div>

            {/* Owner Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Proprietário</h3>
              
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={book.ownerAvatar}
                  alt={book.ownerName}
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
                <div className="flex-1">
                  <Link
                    to={`/profile/${book.ownerId}`}
                    className="font-bold text-lg text-gray-900 hover:text-purple-600 transition-colors"
                  >
                    {book.ownerName}
                  </Link>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{book.ownerLocation}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {book.ownerId === currentUser.id ? (
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-center">
                  <p className="text-purple-900 font-medium">Este é seu livro</p>
                  <p className="text-sm text-purple-700 mt-1">
                    Você receberá notificações quando alguém demonstrar interesse
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Interest Button - Highlighted */}
                  <button
                    onClick={handleInterest}
                    disabled={interestSent}
                    className={`w-full px-4 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      interestSent
                        ? 'bg-green-100 text-green-700 border-2 border-green-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${interestSent ? 'fill-green-700' : ''}`} />
                    {interestSent ? 'Interesse Enviado ✓' : 'Tenho Interesse!'}
                  </button>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/messages/1"
                      className="px-4 py-3 bg-white text-purple-600 border-2 border-purple-200 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Mensagem
                    </Link>
                    <Link
                      to={`/profile/${book.ownerId}`}
                      className="px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Books Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Outros livros de {book.genre}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockBooks
            .filter(b => b.genre === book.genre && b.id !== book.id)
            .slice(0, 4)
            .map((similarBook) => (
              <Link
                key={similarBook.id}
                to={`/book/${similarBook.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-purple-100 group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={similarBook.cover}
                    alt={similarBook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1 mb-1">
                    {similarBook.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1">{similarBook.author}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}