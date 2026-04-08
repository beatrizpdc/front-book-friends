import { Link } from 'react-router';
import { BookOpen, Users, Heart, ArrowRight, Star, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Conecte-se com Leitores.
              <br />
              Compartilhe Histórias.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              BookFriends é a rede social literária que conecta você a pessoas com gostos semelhantes. 
              Troque livros, doe conhecimento e faça parte de uma comunidade apaixonada por leitura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/feed"
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-medium hover:shadow-lg transition-shadow border-2 border-purple-200"
              >
                Explorar Livros
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Como Funciona
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Troque Livros</h3>
              <p className="text-gray-600 leading-relaxed">
                Cadastre seus livros disponíveis e encontre outros leitores interessados em fazer trocas. 
                Economia e sustentabilidade na prática.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Doe com Propósito</h3>
              <p className="text-gray-600 leading-relaxed">
                Dê uma nova vida aos livros que você já leu. Impacte positivamente outras pessoas 
                através do compartilhamento de conhecimento.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Conecte-se</h3>
              <p className="text-gray-600 leading-relaxed">
                Encontre pessoas com gostos literários semelhantes. Construa conexões genuínas 
                através da sua paixão por livros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Nossa Comunidade em Números
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-center mb-3">
                  <Users className="w-10 h-10" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">2.500+</div>
                <div className="text-purple-100">Leitores Ativos</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-center mb-3">
                  <BookOpen className="w-10 h-10" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">15.000+</div>
                <div className="text-purple-100">Livros Compartilhados</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-center mb-3">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">8.200+</div>
                <div className="text-purple-100">Trocas Realizadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se à comunidade BookFriends e transforme sua forma de ler e compartilhar livros.
          </p>
          <Link
            to="/add-book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-xl transition-all group"
          >
            Adicionar Meu Primeiro Livro
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}