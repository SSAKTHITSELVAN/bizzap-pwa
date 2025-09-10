//src/pages/NewsPage.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  Globe, 
  Briefcase, 
  DollarSign,
  Clock,
  Sparkles,
  MessageCircle
} from 'lucide-react';

// Static news data
const staticNews = [
  {
    id: 1,
    title: "Global Tech Stocks Surge Amid AI Innovation Wave",
    summary: "Major technology companies see significant gains as artificial intelligence investments drive market confidence.",
    category: "Technology",
    timestamp: "2 hours ago",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    id: 2,
    title: "Small Business Growth Reaches 5-Year High",
    summary: "New data shows entrepreneurship and small business formation at highest levels since 2019.",
    category: "Business",
    timestamp: "4 hours ago",
    icon: Briefcase,
    color: "text-blue-600"
  },
  {
    id: 3,
    title: "Cryptocurrency Market Shows Strong Recovery",
    summary: "Digital assets rebound as institutional investors show renewed interest in blockchain technology.",
    category: "Finance",
    timestamp: "6 hours ago",
    icon: DollarSign,
    color: "text-yellow-600"
  },
  {
    id: 4,
    title: "International Trade Agreements Boost Global Commerce",
    summary: "New bilateral trade deals expected to increase international business opportunities by 15%.",
    category: "Global",
    timestamp: "8 hours ago",
    icon: Globe,
    color: "text-purple-600"
  },
  {
    id: 5,
    title: "E-commerce Platforms Report Record Q3 Performance",
    summary: "Online retail giants exceed expectations with 28% year-over-year growth in revenue.",
    category: "E-commerce",
    timestamp: "12 hours ago",
    icon: TrendingUp,
    color: "text-indigo-600"
  }
];

// AI response templates based on news categories
const aiResponses = {
  technology: [
    "The tech sector continues to show remarkable resilience. AI and machine learning investments are particularly driving innovation across industries.",
    "This technology trend aligns with the digital transformation we're seeing in most business sectors. Companies adopting AI early are gaining significant competitive advantages.",
    "Technology stocks often reflect future growth potential. The current AI wave reminds me of the early internet boom, but with more mature infrastructure."
  ],
  business: [
    "Small business growth is a strong indicator of economic health. This suggests increased consumer confidence and access to capital.",
    "Entrepreneurship levels often correlate with innovation and job creation. This is excellent news for the broader economy.",
    "Small businesses are the backbone of most economies. Their success typically leads to increased employment and local economic growth."
  ],
  finance: [
    "Cryptocurrency markets are known for volatility, but institutional adoption suggests growing legitimacy in the financial sector.",
    "Digital assets are becoming increasingly integrated into traditional finance. This recovery might indicate more stable long-term growth.",
    "The crypto market often reflects broader risk appetite. Institutional interest suggests a maturation of the asset class."
  ],
  global: [
    "International trade agreements typically benefit all parties by reducing barriers and increasing market access.",
    "Global commerce expansion creates opportunities for businesses of all sizes to reach new markets and customers.",
    "Trade agreements often lead to technology transfer and best practice sharing between nations."
  ],
  general: [
    "That's an interesting development. Business news often reflects broader economic trends that can impact various industries.",
    "Market movements like this typically have ripple effects across different sectors. It's worth monitoring how this develops.",
    "Economic indicators like this can provide valuable insights for business planning and investment decisions."
  ]
};

const NewsPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI news assistant. I can help you understand the latest business news, market trends, and their implications. Feel free to ask me about any of the news items or general business questions!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    let responseCategory = 'general';
    
    if (message.includes('tech') || message.includes('ai') || message.includes('artificial intelligence')) {
      responseCategory = 'technology';
    } else if (message.includes('business') || message.includes('entrepreneur')) {
      responseCategory = 'business';
    } else if (message.includes('crypto') || message.includes('finance') || message.includes('money')) {
      responseCategory = 'finance';
    } else if (message.includes('trade') || message.includes('global') || message.includes('international')) {
      responseCategory = 'global';
    }

    const responses = aiResponses[responseCategory];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some contextual follow-ups
    const followUps = [
      " Would you like me to elaborate on any specific aspect?",
      " Is there a particular angle you'd like to explore further?",
      " Are you interested in how this might affect your industry?",
      " Would you like to discuss the potential implications?"
    ];
    
    return randomResponse + followUps[Math.floor(Math.random() * followUps.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewsClick = (newsItem) => {
    const newsMessage = {
      id: messages.length + 1,
      type: 'user',
      content: `Tell me more about: ${newsItem.title}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newsMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      switch (newsItem.category.toLowerCase()) {
        case 'technology':
          response = `The ${newsItem.title.toLowerCase()} represents a significant shift in the tech landscape. ${aiResponses.technology[0]} This could create new opportunities for businesses looking to leverage AI technologies.`;
          break;
        case 'business':
          response = `${newsItem.summary} ${aiResponses.business[1]} This trend suggests a healthy business environment with good access to funding and market opportunities.`;
          break;
        case 'finance':
          response = `${newsItem.summary} ${aiResponses.finance[2]} For businesses, this could mean new payment options and investment opportunities.`;
          break;
        default:
          response = `${newsItem.summary} This development could have broader implications for businesses across various sectors. Would you like me to analyze how this might affect specific industries?`;
      }

      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed - Left Side */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Latest Business News</h2>
            </div>
            
            <div className="space-y-4">
              {staticNews.map((news) => {
                const IconComponent = news.icon;
                return (
                  <div
                    key={news.id}
                    onClick={() => handleNewsClick(news)}
                    className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-50 ${news.color}`}>
                        <IconComponent size={18} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                          {news.summary}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            {news.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{news.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Chat - Right Side */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Bot className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI News Chat</h3>
                  <p className="text-blue-100 text-sm">Ask me about business news and market trends</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } rounded-2xl px-4 py-3`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'ai' && (
                        <Bot size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User size={16} className="text-white mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Bot size={16} className="text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about business news, market trends, or any questions..."
                    className="w-full p-3 pr-12 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    rows="1"
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;