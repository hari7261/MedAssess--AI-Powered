import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertCircle, 
  Send, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Loader2,
  Info,
  Heart,
  ThumbsUp,
  MessageCircle,
  AlertOctagon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tooltip } from "@/components/Tooltip";
import { Badge } from "@/components/ui/badge";
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MedicalChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [urgencyLevel, setUrgencyLevel] = useState('non-urgent');
  const [symptoms, setSymptoms] = useState([]);
  const [feedback, setFeedback] = useState({ helpful: 0, notHelpful: 0 });
  const [isMobile] = useState(window.innerWidth <= 768);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showHolomark, setShowHolomark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    // Hide holomark when messages exist
    setShowHolomark(messages.length === 0);
  }, [messages]);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea',
    'Chest Pain', 'Shortness of Breath', 'Dizziness'
  ];

  const emergencySymptoms = [
    'Severe Chest Pain',
    'Difficulty Breathing',
    'Stroke Symptoms',
    'Severe Bleeding'
  ];

  const emergencyKeywords = [
    'emergency',
    'immediate attention',
    'call 911',
    'seek help immediately',
    'urgent care',
    'life-threatening'
  ];

  const handleSymptomSelect = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setInput((prev) => prev + (prev ? ', ' : '') + symptom);
    }
  };

  const handleUrgencyChange = (level) => {
    setUrgencyLevel(level);
  };

  const copyEntireChat = () => {
    const chatText = messages
      .map(msg => `${msg.type === 'user' ? 'You' : 'MedAssess'}: ${msg.text}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(chatText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DisclaimerBanner = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r"
    >
      <div className="flex items-center">
        <AlertCircle className="text-red-500 mr-2" />
        <div>
          <p className="text-sm text-red-700">
            Medical Disclaimer: This chatbot provides general information only and should not be used for diagnosis. 
            Always consult healthcare professionals for medical advice.
          </p>
          <button 
            onClick={() => setShowDisclaimer(false)}
            className="text-red-500 hover:text-red-700 text-sm mt-2"
          >
            Acknowledge and Close
          </button>
        </div>
      </div>
    </motion.div>
  );

  const UrgencyIndicator = ({ level }) => {
    const colors = {
      'emergency': 'bg-red-500',
      'urgent': 'bg-yellow-500',
      'non-urgent': 'bg-green-500'
    };

    return (
      <span className={`${colors[level]} w-3 h-3 rounded-full mr-2`} />
    );
  };

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-2 text-sm"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-green-50 px-1 py-0.5 rounded text-green-700" {...props}>
          {children}
        </code>
      );
    },
    h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-green-700 mt-4 mb-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-green-600 mt-3 mb-1" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
    li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
    p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
  };

  const MessageContent = ({ message }) => {
    const [copied, setCopied] = useState(false);
    const isEmergency = message.urgency === 'emergency';

    const handleCopy = () => {
      navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        {isEmergency && (
          <div className="absolute -top-6 left-0 right-0 flex items-center justify-center">
            <Badge variant="destructive" className="animate-pulse">
              Emergency Response
            </Badge>
          </div>
        )}
        <div className={`prose prose-sm max-w-none ${
          message.type === 'bot' ? 'text-gray-800' : 'text-white'
        }`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        {message.type === 'bot' && (
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => setFeedback(prev => ({ ...prev, helpful: prev.helpful + 1 }))}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </motion.div>
    );
  };

const formatMedicalQuery = (input: string, urgencyLevel: string) => {
  // Check for greetings
  const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'who are you', 'who made you', 'all kind of greetings','how are you'];
  const greetingRegex = new RegExp(greetings.join('|'), 'i');
  
  if (greetingRegex.test(input.toLowerCase())) {
    return `Respond as a professional and empathetic medical AI Advanced Medical AI (your name is MedAssess AI). Start with a warm greeting and ask how you can help with their health concerns today. Include a brief introduction about being a medical information Advanced Medical AI.`;
  }

  // Check for non-medical or inappropriate queries
  const warnings = [
    // Original keywords
    'sex', 'porn', 'adult', 'weapon', 'kill', 'murder', 'suicide method', 
    'illegal drugs', 'terrorism', 'hack', 'gambling', 'abuse',
    'create virus', 'steal', 'robbery', 'non-medical', 'dating',
    'gaming', 'movies', 'politics', 'stocks', 'crypto', 'investment',
    'social media', 'celebrity', 'gossip', 'sports', 'entertainment',
    'cooking', 'recipe', 'travel', 'vacation', 'joke', 'meme',
    'programming', 'code', 'software', 'computer', 'technology',
    'homework', 'essay', 'assignment', 'exam', 'test', 'quiz',
    'write me a', 'write a story', 'tell me a joke', 'rob', 'bank',
    'illegal', 'crime', 'violence', 'war', 'fight', 'watch', 'romantic',
    'film', 'tv', 'show', 'series', 'episode', 'drama', 'comedy', 'action',
    'horror', 'thriller', 'documentary', 'anime', 'cartoon', 'song', 'music',
    'lyrics', 'playlist', 'concert', 'ticket', 'game', 'play', 'download',
    'stream', 'website', 'login', 'password', 'account', 'girlfriend', 'boyfriend',
    'date', 'tinder', 'match', 'hookup', 'relationship', 'breakup', 'marriage',
    'divorce', 'girls', 'boys', 'men', 'women', 'hot', 'sexy', 'attractive', 'nude',
    'naked', 'bikini', 'lingerie', 'model', 'actress', 'actor', 'celeb', 'famous',
    'popular', 'rich', 'money', 'cash', 'bitcoin', 'crypto', 'stock', 'investment',
    'finance', 'economy', 'business', 'startup', 'company', 'job', 'work', 'career',
    'salary', 'income', 'pay', 'hire', 'fire', 'boss', 'employee', 'interview', 'resume',
    'promotion', 'raise', 'vacation', 'holiday', 'trip', 'travel', 'flight', 'hotel',
    'beach', 'mountain', 'city', 'country', 'world', 'explore', 'adventure', 'tour',
    'guide', 'map', 'destination', 'food', 'restaurant', 'cafe', 'bar', 'drink', 'menu',
    
    // Protect against attempts to bypass filtering
    'bypass filter',
  ];
  
  // Always enforce redirection to medical topics
  const strictRedirectMessage = `**I ONLY RESPOND TO MEDICAL AND HEALTH-RELATED QUESTIONS.**

**Please restate your question to focus on a specific health concern or medical topic. I cannot and will not discuss non-medical subjects.**

Examples of appropriate questions:
- "What might cause persistent headaches?"
- "How can I manage symptoms of the common cold?"
- "What are the side effects of antihistamines?"
- "Should I be concerned about chest pain after exercise?"`;
  
  // More thorough content filtering
  const nonMedicalPattern = new RegExp(`\\b(${warnings.join('|')})\\b`, 'i');
  if (nonMedicalPattern.test(input.toLowerCase()) || 
      input.length < 5 || // Too short to be a proper medical query
      !/\b(health|medical|symptom|pain|disease|condition|doctor|hospital|medicine|treatment|therapy|side effect|diagnosis|sick|ill|hurt|ache|fever|cough|cold|flu|infection|injury|wound|heal|recovery|wellness)\b/i.test(input.toLowerCase()) && input.length < 15) {
    
    return `**I ONLY RESPOND TO MEDICAL AND HEALTH-RELATED QUESTIONS.**

**Please restate your question to focus on a specific health concern or medical topic. I cannot and will not discuss non-medical subjects.**

Examples of appropriate questions:
- "What might cause persistent headaches?"
- "How can I manage symptoms of the common cold?"
- "What are the side effects of antihistamines?"
- "Should I be concerned about chest pain after exercise?"`;
  }

    // Check if asking about medicines
    const medicineKeywords = ['medicine', 'medication', 'drug', 'prescription', 'tablet', 'pills'];
    const isAskingMedicine = medicineKeywords.some(keyword => input.toLowerCase().includes(keyword));

    // Format the main medical query
    return `As a professional medical AI Advanced Medical AI, I'll help you with your health concern regarding: "${input}". 
    Consider the urgency level: ${urgencyLevel}

    Please provide a comprehensive response with the following structure:

    ${isAskingMedicine ? `
    1. **⚕️ Important Medical Disclaimer**:
       - **PLEASE NOTE: This information is for educational purposes only.**
       - **ALWAYS consult a healthcare professional before taking any medication.**
       - **Medications mentioned here require proper prescription and medical supervision.**

    2. **💊 Commonly Prescribed Medications**:
       - List relevant medications with their general uses
       - Mention potential side effects
       - Emphasize the importance of proper dosage

    3. **⚠️ Important Considerations**:
       - Drug interactions
       - Contraindications
       - When to seek immediate medical attention` 
    : 
    `1. **Initial Assessment**:
       - Analyze reported symptoms
       - Identify potential severity indicators
       - Note any red flags requiring immediate attention

    2. **Detailed Symptom Analysis**:
       - Primary symptoms explained
       - Related symptoms to watch for
       - Typical progression pattern

    3. **Possible Causes**:
       - Common causes
       - Less common but significant causes
       - Risk factors to consider

    4. **Recommended Actions**:
       - Immediate steps to take
       - Home care recommendations
       - Lifestyle modifications
       - Prevention strategies`}

    5. **When to Seek Medical Care**:
       - Emergency warning signs
       - Conditions requiring urgent attention
       - Follow-up care recommendations

    6. **Professional Guidance**:
       - Type of healthcare provider to consult
       - Questions to ask your healthcare provider
       - Important information to share with them

    7. **Additional Resources**:
       - Reliable health information sources
       - Support groups if applicable
       - Self-care tips

    8. **Conclusion**:
       - Encourage proper medical consultation
       - Encourage seeking immediate medical attention if necessary
       - Encourage lifestyle modifications
       - Encourage preventive measures

    Remember to:
    - Maintain a professional yet empathetic tone
    - Emphasize the importance of professional medical consultation
    - Provide clear, actionable advice
    - Include relevant preventive measures
    - If user type any incorrcet disease or symotoms, please correct them and provide the correct information.
    - if any user asking to tell me in any particular language, please tell them in their type language only.
    - if user asking to tell me in any particular language, please tell them in their type language only.
    - if user asking any  unwanted questions or unrelted questions, strictly ignore them and write only two lines of bold instructions to ask only medical or health releated.
    ${urgencyLevel === 'emergency' ? '- Strongly emphasize the urgency of seeking immediate medical attention' : ''}

    End with a supportive note and encourage proper medical consultation.`;
  };

  const checkEmergencyConditions = (text: string) => {
    const emergencyPhrases = [
      'severe pain',
      'difficulty breathing',
      'chest pain',
      'stroke',
      'unconscious',
      'severe bleeding',
      'head injury',
      'heart attack',
      'seizure',
      'allergic reaction',
      'anaphylaxis',
      'suicide',
      'overdose'
    ];

    return emergencyPhrases.some(phrase => text.toLowerCase().includes(phrase));
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError("Please enter a message");
      return;
    }

    try {
      setIsLoading(true);
      const newMessage = {
        type: 'user',
        text: input,
        urgency: urgencyLevel,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage]);
      setInput('');

      // Get API key from import.meta.env
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found. Please check your environment variables.');
      }

      const formattedQuery = formatMedicalQuery(input, urgencyLevel);
      
      try {
        // Updated API call to use gemini-2.0-flash model as shown in the curl example
        const response = await axios({
          method: 'post',
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            contents: [
              {
                parts: [
                  {
                    text: formattedQuery
                  }
                ]
              }
            ]
          }
        });

        console.log('API Response:', response.data); // Debug log

        if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const botResponse = {
            type: 'bot',
            text: response.data.candidates[0].content.parts[0].text,
            timestamp: new Date().toISOString()
          };

          setMessages(prev => [...prev, botResponse]);

          // Check for emergency keywords
          const hasEmergencyTerms = emergencyKeywords.some(keyword => 
            botResponse.text.toLowerCase().includes(keyword)
          );

          if (hasEmergencyTerms || urgencyLevel === 'emergency') {
            setShowEmergencyAlert(true);
          }
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        throw new Error(
          apiError.response?.data?.error?.message || 
          'Failed to get response from the medical AI'
        );
      }

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || "An unexpected error occurred");
      
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "I apologize, but I'm having trouble processing your request right now. Please try again or rephrase your question.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      sendMessage(e);
    }
  };

  const LoadingIndicator = () => (
    <div className="flex items-center space-x-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm text-gray-500">Processing medical query...</span>
    </div>
  );

  const ErrorNotification = ({ message }: { message: string }) => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-lg z-50"
    >
      <div className="flex items-center">
        <AlertOctagon className="text-red-500 mr-2" />
        <p className="text-red-700">{message}</p>
        <button
          onClick={() => setError(null)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    </motion.div>
  );

  const sidebarOptions = [
    { 
      label: 'Terms & Conditions',
      icon: <AlertCircle className="w-4 h-4" />,
      link: '/terms-and-conditions'
    },
    { 
      label: 'Privacy Policy',
      icon: <Info className="w-4 h-4" />,
      link: '/FAQ'
    },
    { 
      label: 'Overview',
      icon: <Heart className="w-4 h-4" />,
      link: '/overview'
    },
    { 
      label: 'About MedAssess',
      icon: <MessageCircle className="w-4 h-4" />,
      link: '/about'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-white">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-green-200">
          {/* Emergency Alert */}
          <AnimatePresence>
            {showEmergencyAlert && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="bg-red-50 p-4 border-b border-red-100"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                  <p className="text-red-700 font-medium">
                    Emergency symptoms detected. Please seek immediate medical attention!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Interface */}
          <div className="grid grid-cols-1 md:grid-cols-4 h-[800px] divide-x-2 divide-green-100">
            {/* Updated Sidebar */}
            <div className="hidden md:block bg-gradient-to-b from-green-50 to-white p-4 border-r-2 border-green-200">
              <div className="mb-8">
                <h3 className="font-bold text-green-800 text-lg mb-2">MedAssess AI</h3>
                <p className="text-sm text-green-600">Your Personal Advanced Medical AI</p>
              </div>
              <div className="space-y-2">
                {sidebarOptions.map(option => (
                  <a
                    key={option.label}
                    href={option.link}
                    className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-green-700"
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="col-span-3 flex flex-col h-full relative">
              {/* Holomark */}
              <AnimatePresence>
                {showHolomark && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="text-center">
                      <div className="relative">
                        <div className="absolute inset-0 animate-pulse bg-green-200 rounded-full blur-xl opacity-20"></div>
                        <h1 className="text-4xl font-bold text-green-700 mb-2">MedAssess</h1>
                      </div>
                      <p className="text-green-600">Your Advanced Medical AI</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Copy Chat Button */}
              <div className="absolute top-4 left-4 z-10">
                <Tooltip content="Copy entire chat">
                  <button
                    onClick={copyEntireChat}
                    className="p-2 bg-white rounded-lg shadow-md border-2 border-green-200 hover:bg-green-50 transition-colors"
                  >
                    {copied ? 
                      <Check className="w-4 h-4 text-green-600" /> : 
                      <Copy className="w-4 h-4 text-green-600" />
                    }
                  </button>
                </Tooltip>
              </div>

              {/* Updated Messages Container with better scroll handling */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-green-50 scrollbar-medical"
                style={{
                  maxHeight: 'calc(100vh - 250px)', // Adjust based on your header/footer height
                  overflowY: 'auto',
                  scrollBehavior: 'smooth'
                }}
              >
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 shadow-md ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white border-2 border-green-500'
                            : 'bg-white text-gray-800 border-2 border-green-200'
                        }`}
                      >
                        <MessageContent message={message} />
                        <div className="text-xs mt-2 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-lg p-4">
                        <LoadingIndicator />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-px" />
              </div>

              {/* Enhanced Input Area */}
              <form onSubmit={handleSubmit} className="border-t-2 border-green-200 p-4 bg-white">
                <div className="flex flex-col space-y-4">
                  {/* Symptoms Tags with medical styling */}
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 animate-fade-in"
                      >
                        {symptom}
                        <button
                          onClick={() => setSymptoms(symptoms.filter(s => s !== symptom))}
                          className="ml-2 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {/* Input and Buttons with medical theme */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Describe your symptoms..."
                      className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 
                        ${error ? 'border-red-300 focus:ring-red-500' : 'border-green-200 focus:ring-green-500'}
                        bg-green-50`}
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span className="hidden md:inline">Send</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AnimatePresence>
        {error && <ErrorNotification message={error} />}
      </AnimatePresence>
    </div>
  );
};

export default MedicalChatbot;



