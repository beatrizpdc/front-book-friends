import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, BookOpen, Check } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export default function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: 'Bom' as 'Novo' | 'Como Novo' | 'Bom' | 'Aceitável',
    type: 'troca' as 'troca' | 'doacao' | 'ambos',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const genres = [
    'Ficção Científica',
    'Fantasia',
    'Romance',
    'História',
    'Clássicos',
    'Biografia',
    'Autoajuda',
    'Drama',
    'Terror',
    'Aventura',
    'Poesia',
    'Outro',
  ];

  const conditions: Array<'Novo' | 'Como Novo' | 'Bom' | 'Aceitável'> = ['Novo', 'Como Novo', 'Bom', 'Aceitável'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Redirect after success message
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-green-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Livro Adicionado com Sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            Seu livro "{formData.title}" agora está disponível para a comunidade BookFriends.
          </p>
          <p className="text-sm text-gray-500">
            Redirecionando para seu perfil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-8 text-white">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Adicionar Livro</h1>
              <p className="text-purple-100">Compartilhe sua coleção com a comunidade</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Cover Upload */}
          <div>
            <Label htmlFor="cover" className="text-base font-bold text-gray-900 mb-3 block">
              Foto da Capa
            </Label>
            <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-purple-50/30">
              <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-700 font-medium mb-1">
                Clique para fazer upload
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG até 5MB
              </p>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-base font-bold text-gray-900 mb-3 block">
              Título do Livro *
            </Label>
            <Input
              id="title"
              required
              placeholder="Ex: O Senhor dos Anéis"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="text-base h-12"
            />
          </div>

          {/* Author */}
          <div>
            <Label htmlFor="author" className="text-base font-bold text-gray-900 mb-3 block">
              Autor(a) *
            </Label>
            <Input
              id="author"
              required
              placeholder="Ex: J.R.R. Tolkien"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="text-base h-12"
            />
          </div>

          {/* Genre */}
          <div>
            <Label htmlFor="genre" className="text-base font-bold text-gray-900 mb-3 block">
              Gênero *
            </Label>
            <select
              id="genre"
              required
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            >
              <option value="">Selecione um gênero</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Condition */}
          <div>
            <Label className="text-base font-bold text-gray-900 mb-3 block">
              Condição do Livro *
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {conditions.map((condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => setFormData({ ...formData, condition })}
                  className={`px-4 py-3 rounded-xl font-medium transition-all border-2 ${
                    formData.condition === condition
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <Label className="text-base font-bold text-gray-900 mb-3 block">
              Disponível para *
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'troca' })}
                className={`px-4 py-4 rounded-xl font-medium transition-all border-2 ${
                  formData.type === 'troca'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-lg mb-1">📚</div>
                Troca
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'doacao' })}
                className={`px-4 py-4 rounded-xl font-medium transition-all border-2 ${
                  formData.type === 'doacao'
                    ? 'bg-green-600 text-white border-green-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-lg mb-1">🎁</div>
                Doação
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'ambos' })}
                className={`px-4 py-4 rounded-xl font-medium transition-all border-2 ${
                  formData.type === 'ambos'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-lg mb-1">✨</div>
                Ambos
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-base font-bold text-gray-900 mb-3 block">
              Descrição
            </Label>
            <Textarea
              id="description"
              placeholder="Conte mais sobre o livro, seu estado de conservação, etc."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="text-base resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adicionando...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  Adicionar Livro
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
