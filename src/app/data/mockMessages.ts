export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Carlos Mendes',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    lastMessage: 'Ótimo! Podemos combinar a troca do livro 1984.',
    lastMessageTime: '2024-03-28T10:30:00',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    userId: '3',
    userName: 'Mariana Costa',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    lastMessage: 'Vi que você também gosta de romance! 😊',
    lastMessageTime: '2024-03-27T15:20:00',
    unreadCount: 1,
    online: false,
  },
];

export const mockMessages: { [conversationId: string]: Message[] } = {
  '1': [
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Oi Ana! Vi que você tem o livro 1984 disponível para troca.',
      timestamp: '2024-03-28T09:00:00',
      read: true,
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '2',
      content: 'Olá Carlos! Sim, tenho interesse em trocar. Que livros você tem disponíveis?',
      timestamp: '2024-03-28T09:15:00',
      read: true,
    },
    {
      id: '3',
      senderId: '2',
      receiverId: '1',
      content: 'Tenho Sapiens e Dom Casmurro. Qual te interessa mais?',
      timestamp: '2024-03-28T09:30:00',
      read: true,
    },
    {
      id: '4',
      senderId: '1',
      receiverId: '2',
      content: 'Adoraria trocar pelo Sapiens! Como podemos fazer?',
      timestamp: '2024-03-28T10:00:00',
      read: true,
    },
    {
      id: '5',
      senderId: '2',
      receiverId: '1',
      content: 'Ótimo! Podemos combinar a troca do livro 1984.',
      timestamp: '2024-03-28T10:30:00',
      read: false,
    },
    {
      id: '6',
      senderId: '2',
      receiverId: '1',
      content: 'Você está livre esse final de semana?',
      timestamp: '2024-03-28T10:31:00',
      read: false,
    },
  ],
  '2': [
    {
      id: '1',
      senderId: '3',
      receiverId: '1',
      content: 'Oi! Achei seu perfil incrível!',
      timestamp: '2024-03-27T14:00:00',
      read: true,
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '3',
      content: 'Obrigada! O seu também é muito legal! 😊',
      timestamp: '2024-03-27T14:30:00',
      read: true,
    },
    {
      id: '3',
      senderId: '3',
      receiverId: '1',
      content: 'Vi que você também gosta de romance! 😊',
      timestamp: '2024-03-27T15:20:00',
      read: true,
    },
    {
      id: '4',
      senderId: '3',
      receiverId: '1',
      content: '📚 Demonstrei interesse no seu livro "Orgulho e Preconceito" (Disponível para Troca ou Doação). Podemos conversar sobre?',
      timestamp: '2024-03-28T16:00:00',
      read: false,
    },
  ],
};
