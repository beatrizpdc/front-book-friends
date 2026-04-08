import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { mockConversations, mockMessages, Conversation, Message } from '../data/mockMessages';
import { currentUser } from '../data/mockData';
import { ArrowLeft, Send, Search, MoreVertical, Phone, Video, Circle } from 'lucide-react';

export default function Messages() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const activeConversation = conversations.find(c => c.id === conversationId);
  const activeMessages = conversationId ? messages[conversationId] || [] : [];

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: activeConversation!.userId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), message],
    }));

    setNewMessage('');

    // Scroll to bottom
    setTimeout(() => {
      const messagesContainer = document.getElementById('messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[380px,1fr] h-full">
          {/* Conversations List - Always visible on left */}
          <div className="border-r border-gray-200 flex flex-col bg-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Mensagens
              </h2>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Nenhuma conversa encontrada</p>
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => navigate(`/messages/${conv.id}`)}
                    className={`w-full p-4 flex items-start gap-3 transition-all border-b border-gray-100 ${
                      conversationId === conv.id
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-l-purple-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.userAvatar}
                        alt={conv.userName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                      />
                      {conv.online && (
                        <Circle className="absolute bottom-0 right-0 w-3.5 h-3.5 text-green-500 fill-green-500 bg-white rounded-full ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-bold truncate ${
                          conversationId === conv.id ? 'text-purple-900' : 'text-gray-900'
                        }`}>
                          {conv.userName}
                        </h3>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${
                        conv.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {conv.unreadCount > 0 && (
                      <div className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                        {conv.unreadCount}
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area - Always visible on right */}
          <div className="flex flex-col h-full bg-gray-50">
            {!conversationId ? (
              <>
                {/* Empty state with visual indication */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Send className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Selecione uma conversa
                    </h3>
                    <p className="text-gray-600 max-w-sm mx-auto">
                      Escolha uma conversa da lista ao lado para começar a trocar mensagens
                    </p>
                  </div>
                </div>

                {/* Message input disabled when no conversation selected */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-end gap-3 opacity-50">
                    <textarea
                      disabled
                      placeholder="Selecione uma conversa para enviar mensagens..."
                      rows={1}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed resize-none"
                    />
                    <button
                      disabled
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl flex items-center gap-2 font-medium opacity-50 cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                      Enviar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/profile/${activeConversation?.userId}`}
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <div className="relative">
                        <img
                          src={activeConversation?.userAvatar}
                          alt={activeConversation?.userName}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-100 shadow-md"
                        />
                        {activeConversation?.online && (
                          <Circle className="absolute bottom-0 right-0 w-3.5 h-3.5 text-green-500 fill-green-500 bg-white rounded-full ring-2 ring-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {activeConversation?.userName}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Circle className={`w-2 h-2 ${activeConversation?.online ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`} />
                          {activeConversation?.online ? 'Online agora' : 'Offline'}
                        </p>
                      </div>
                    </Link>

                    <div className="flex items-center gap-1">
                      <button className="p-2.5 hover:bg-purple-50 rounded-lg transition-colors" title="Ligação de voz">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2.5 hover:bg-purple-50 rounded-lg transition-colors" title="Chamada de vídeo">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2.5 hover:bg-purple-50 rounded-lg transition-colors" title="Mais opções">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  id="messages-container"
                  className="flex-1 overflow-y-auto p-6 space-y-4"
                >
                  {activeMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 text-center">
                        Nenhuma mensagem ainda. Inicie a conversa!
                      </p>
                    </div>
                  ) : (
                    activeMessages.map((message) => {
                      const isOwn = message.senderId === currentUser.id;

                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end gap-2 max-w-[75%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                            {!isOwn && (
                              <img
                                src={activeConversation?.userAvatar}
                                alt={activeConversation?.userName}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                              />
                            )}

                            <div>
                              <div
                                className={`px-4 py-3 rounded-2xl shadow-sm ${
                                  isOwn
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                                }`}
                              >
                                <p className="text-sm leading-relaxed break-words">
                                  {message.content}
                                </p>
                              </div>
                              <p className={`text-xs text-gray-500 mt-1.5 px-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Message Input - Always visible when conversation is selected */}
                <div className="p-4 border-t border-gray-200 bg-white shadow-lg">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Digite sua mensagem..."
                      rows={1}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 font-medium shadow-md"
                    >
                      <Send className="w-5 h-5" />
                      <span className="hidden sm:inline">Enviar</span>
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
