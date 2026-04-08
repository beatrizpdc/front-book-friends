import { useState } from 'react';
import { useNavigate } from 'react-router';
import { currentUser } from '../data/mockData';
import { Camera, X, Save, ArrowLeft, Upload } from 'lucide-react';
import { Badge } from './ui/badge';

const availableGenres = [
  'Ficção Científica',
  'Fantasia',
  'Romance',
  'História',
  'Clássicos',
  'Biografia',
  'Autoajuda',
  'Drama',
  'Terror',
  'Suspense',
  'Aventura',
  'Policial',
  'Poesia',
  'Infantil',
  'Jovem Adulto',
  'Não-ficção',
  'Filosofia',
  'Ciência',
];

export default function ProfileSettings() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio,
    location: currentUser.location,
    gender: currentUser.gender || '',
    favoriteGenres: [...currentUser.favoriteGenres],
  });

  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar);
  const [bannerPreview, setBannerPreview] = useState(
    currentUser.banner || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200'
  );

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    console.log('Saving profile data:', { ...formData, avatarPreview, bannerPreview });

    // Show success message and navigate back
    alert('Perfil atualizado com sucesso!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Editar Perfil
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner and Avatar */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
            {/* Banner Upload */}
            <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 group">
              <img
                src={bannerPreview}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="banner-upload"
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <div className="text-center">
                  <Upload className="w-10 h-10 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">Alterar Banner</span>
                </div>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Avatar Upload */}
            <div className="px-6 md:px-8 pb-8">
              <div className="flex flex-col items-center -mt-20 md:-mt-24">
                <div className="relative group">
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-8 border-white shadow-xl"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Clique na foto ou banner para alterar
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informações Básicas</h2>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gênero
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Prefiro não informar</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Não-binário">Não-binário</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Cidade, Estado"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem do Perfil (Bio)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  maxLength={200}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Conte um pouco sobre você e seus gostos literários..."
                  required
                />
                <p className="text-sm text-gray-500 mt-2 text-right">
                  {formData.bio.length}/200 caracteres
                </p>
              </div>
            </div>
          </div>

          {/* Favorite Genres */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Gêneros Favoritos</h2>
            <p className="text-sm text-gray-600 mb-6">
              Selecione seus gêneros literários favoritos (mínimo 1)
            </p>

            <div className="flex flex-wrap gap-3">
              {availableGenres.map((genre) => {
                const isSelected = formData.favoriteGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {genre}
                    {isSelected && (
                      <X className="inline-block w-4 h-4 ml-2 -mr-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {formData.favoriteGenres.length > 0 && (
              <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm font-medium text-purple-900 mb-2">
                  Selecionados ({formData.favoriteGenres.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.favoriteGenres.map((genre) => (
                    <Badge
                      key={genre}
                      className="bg-white text-purple-700 border border-purple-200"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons - Mobile */}
          <div className="flex gap-4 md:hidden">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
