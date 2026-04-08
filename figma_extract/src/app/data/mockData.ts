// Mock data for the application
export interface User {
  id: string;
  name: string;
  avatar: string;
  banner?: string;
  bio: string;
  location: string;
  gender?: string;
  favoriteGenres: string[];
  booksOwned: number;
  booksExchanged: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  condition: 'Novo' | 'Como Novo' | 'Bom' | 'Aceitável';
  type: 'troca' | 'doacao' | 'ambos';
  genre: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerLocation: string;
  description: string;
  availableSince: string;
}

export interface Match {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  compatibility: number;
  commonGenres: string[];
  mutualBooks: number;
  location: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    banner: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200',
    bio: 'Apaixonada por ficção científica e fantasia. Sempre em busca de novas aventuras literárias!',
    location: 'São Paulo, SP',
    gender: 'Feminino',
    favoriteGenres: ['Ficção Científica', 'Fantasia', 'Romance'],
    booksOwned: 45,
    booksExchanged: 23,
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    banner: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200',
    bio: 'Leitor voraz de clássicos e história. Acredito no poder transformador dos livros.',
    location: 'Rio de Janeiro, RJ',
    gender: 'Masculino',
    favoriteGenres: ['História', 'Clássicos', 'Biografia'],
    booksOwned: 67,
    booksExchanged: 34,
  },
  {
    id: '3',
    name: 'Mariana Costa',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    banner: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200',
    bio: 'Amante de romances e livros de autoajuda. Compartilhar é cuidar!',
    location: 'Belo Horizonte, MG',
    gender: 'Feminino',
    favoriteGenres: ['Romance', 'Autoajuda', 'Drama'],
    booksOwned: 52,
    booksExchanged: 28,
  },
];

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400',
    condition: 'Bom',
    type: 'troca',
    genre: 'Fantasia',
    ownerId: '1',
    ownerName: 'Ana Silva',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    ownerLocation: 'São Paulo, SP',
    description: 'Trilogia completa em volume único. Pequenas marcas de uso nas páginas.',
    availableSince: '2024-03-15',
  },
  {
    id: '2',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    condition: 'Como Novo',
    type: 'doacao',
    genre: 'História',
    ownerId: '2',
    ownerName: 'Carlos Mendes',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    ownerLocation: 'Rio de Janeiro, RJ',
    description: 'Livro em excelente estado. Uma jornada pela história da humanidade.',
    availableSince: '2024-03-18',
  },
  {
    id: '3',
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    condition: 'Bom',
    type: 'ambos',
    genre: 'Romance',
    ownerId: '3',
    ownerName: 'Mariana Costa',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    ownerLocation: 'Belo Horizonte, MG',
    description: 'Clássico atemporal. Aceito troca ou doação para quem realmente vai ler.',
    availableSince: '2024-03-10',
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    condition: 'Como Novo',
    type: 'troca',
    genre: 'Ficção Científica',
    ownerId: '1',
    ownerName: 'Ana Silva',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    ownerLocation: 'São Paulo, SP',
    description: 'Distopia clássica que permanece relevante. Livro em ótimo estado.',
    availableSince: '2024-03-20',
  },
  {
    id: '5',
    title: 'A Sutil Arte de Ligar o F*da-se',
    author: 'Mark Manson',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    condition: 'Bom',
    type: 'doacao',
    genre: 'Autoajuda',
    ownerId: '3',
    ownerName: 'Mariana Costa',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    ownerLocation: 'Belo Horizonte, MG',
    description: 'Livro transformador sobre prioridades na vida. Doação com carinho!',
    availableSince: '2024-03-22',
  },
  {
    id: '6',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400',
    condition: 'Aceitável',
    type: 'troca',
    genre: 'Clássicos',
    ownerId: '2',
    ownerName: 'Carlos Mendes',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    ownerLocation: 'Rio de Janeiro, RJ',
    description: 'Clássico brasileiro. Páginas amareladas pelo tempo mas texto íntegro.',
    availableSince: '2024-03-12',
  },
];

export const mockMatches: Match[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Carlos Mendes',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    compatibility: 85,
    commonGenres: ['Ficção Científica', 'História'],
    mutualBooks: 5,
    location: 'Rio de Janeiro, RJ',
  },
  {
    id: '2',
    userId: '3',
    userName: 'Mariana Costa',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    compatibility: 72,
    commonGenres: ['Romance', 'Fantasia'],
    mutualBooks: 3,
    location: 'Belo Horizonte, MG',
  },
];

// Get current user (mock)
export const currentUser = mockUsers[0];
