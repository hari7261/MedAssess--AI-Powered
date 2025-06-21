import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Loader2, 
  Info, 
  GraduationCap, 
  AlertCircle,
  Check,
  Copy,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// Enhanced static dataset
const getExcelEngineeringCollegeData = () => {
  return {
    overview: {
      name: "Excel Engineering College (Autonomous)",
      location: "Komarapalayam, Namakkal District, Tamil Nadu, India",
      established: "2001",
      website: "https://excelinstitutions.com"
    },
    departments: {
      cse: {
        about: [
          `Academic excellence is the driver of everything we do.

Department of Computer Science and Engineering is working hard towards the goal of providing innovative and quality education with high standard to achieve academic excellence and provides platform for the students to achieve their carrier goals. Our department has excellent infrastructure and computing facilities.

Department has a team of experienced and highly motivated faculty members who are continuously taking efforts to make our students globally competitive.

Department has involved in conducting many technical and other activities to develop our students to solve social and national problems.`
        ],
        seats: 120,
        courses: ["B.E. Computer Science and Engineering", "M.E. Computer Science and Engineering"],
        hod: {
          name: "Dr.P.C.Senthil Mahesh",
          designation: "Professor and Head",
          qualification: "M.E., Ph.D",
          experience: "22 Years"
        },
mission: [
  "To instill quality in engineering education that demands excellence.",
  "To initiate desires among the students to work in close cooperation and collaboration with industry and professional bodies.",
  "To train the students for developing software and novel software systems.",
  "To create ambience for taking initiatives towards entrepreneurship and lifelong learning."
],
        facilities: ["Advanced Computer Labs", "AI and ML Labs", "High-Speed Internet"]
      },
      biomedicalEngineering: {
        seats: 60,
        courses: ["B.E. Biomedical Engineering"],
        hod: "Dr. Jane Smith",
        facilities: ["Biomedical Instrumentation Lab", "Research Center"]
      },
      safetyAndFireEngineering: {
        seats: 60,
        courses: ["B.E. Safety and Fire Engineering"],
        hod: "Dr. Alice Johnson",
        facilities: ["Fire Safety Lab", "Disaster Management Center"]
      }
    },
    recentEvents: [
      "Feb 17, 2025: 2025 PCT batch placed at PPG Paints, 2.4 LPA (https://t.co/xyuvsFkcyX).",
      "Feb 20, 2025: Multiple placements (https://t.co/2hftP2giQ6)."
    ]
  };
};

const ExcelCollegeChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  const COLLEGE_WEBSITE = "https://excelinstitutions.com";
  const staticData = getExcelEngineeringCollegeData();

  // Initial message setup
  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        text: `Welcome to Excel Engineering College Assistant! I can provide info based on data up to February 24, 2025, and I’ll try to fetch the latest from ${COLLEGE_WEBSITE} when possible. Ask away!`,
        timestamp: new Date().toISOString()
      }
    ]);

    // Cleanup function to clear chat data when component unmounts
    return () => {
      setMessages([]); // Clear messages
      setInput('');   // Clear input
      console.log("Chat data cleared on unmount");
    };
  }, []);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a question");
      return;
    }

    setIsLoading(true);
    setError(null);
    const userMessage = { type: 'user', text: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const botResponse = await generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      setError("Couldn’t get a full response. Here’s what I know statically.");
      const fallbackResponse = {
        type: 'bot',
        text: staticFallback(input),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const staticFallback = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("cse") || lowerQuery.includes("computer science")) {
      return `The Computer Science and Engineering (CSE) department at Excel Engineering College has **${staticData.departments.cse.seats} seats**. It offers courses like ${staticData.departments.cse.courses.join(", ")}.`;
    } else if (lowerQuery.includes("location") || lowerQuery.includes("where is")) {
      return `Excel Engineering College is located in **${staticData.overview.location}**.`;
    } else if (lowerQuery.includes("courses") || lowerQuery.includes("programs")) {
      return `Excel Engineering College offers the following programs: ${Object.values(staticData.departments).map(dept => dept.courses.join(", ")).join(", ")}.`;
    } else {
      return `I have details up to Feb 24, 2025. Visit ${COLLEGE_WEBSITE} for the latest or ask me something specific!`;
    }
  };

  const generateBotResponse = async (query) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error("API Key is missing or invalid.");
    }

    try {
      // First, try to fetch real-time data from the college website
      let realtimeData = "";
      try {
        const websiteResponse = await axios.get('https://excelinstitutions.com');
        realtimeData = `Latest information from website: ${websiteResponse.data}`;
      } catch (webErr) {
        console.log("Could not fetch real-time data:", webErr);
        realtimeData = "Could not fetch real-time data from website.";
      }

      // Also try to fetch news from search results
      let newsData = "";
      try {
        const newsResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=Excel Engineering College Komarapalayam&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        newsData = `Recent news: ${JSON.stringify(newsResponse.data.articles.slice(0, 3))}`;
      } catch (newsErr) {
        console.log("Could not fetch news:", newsErr);
        newsData = "Could not fetch recent news.";
      }

      const response = await axios.post(
        GEMINI_API_URL,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful assistant for Excel Engineering College (Autonomous). 
                  Use this static data: ${JSON.stringify(staticData)}. 
                  Real-time data: ${realtimeData}
                  ${newsData}
                  Here's the website link for reference: ${COLLEGE_WEBSITE}. 
                  Recent updates: 
                  - Feb 17, 2025: 2025 PCT batch placed at PPG Paints, 2.4 LPA (https://t.co/xyuvsFkcyX).
                  - Feb 20, 2025: Multiple placements (https://t.co/2hftP2giQ6).
                  If the question is unrelated to Excel Engineering College, provide a polite response. 
                  Current date: February 24, 2025. 
                  Question: ${query}`
                }
              ]
            }
          ]
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const botText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I couldn't generate a detailed response. Try again or check the website.";
      return { type: 'bot', text: botText, timestamp: new Date().toISOString() };
    } catch (err) {
      console.error("Gemini API Error:", err.response?.data || err.message);
      throw err;
    }
  };

  const copyEntireChat = () => {
    const chatText = messages.map(msg => `${msg.type === 'user' ? 'You' : 'Excel Assistant'}: ${msg.text}`).join('\n\n');
    navigator.clipboard.writeText(chatText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to clear chat history
  const clearChat = () => {
    setMessages([
      {
        type: 'bot',
        text: `Chat cleared! Welcome back to Excel Engineering College Assistant! Ask away!`,
        timestamp: new Date().toISOString()
      }
    ]);
    setInput('');
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-blue-200">
          <div className="h-[700px] flex flex-col">
            <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <GraduationCap className="w-8 h-8" />
                <div>
                  <h1 className="text-xl font-bold">Excel Engineering College Assistant</h1>
                  <p className="text-sm opacity-90">Powered by Gemini AI</p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white"
                title="Clear Chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-blue-50">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 shadow-md ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-2 border-blue-500'
                          : 'bg-white text-gray-800 border-2 border-blue-200'
                      }`}
                    >
                      <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                      <div className="mt-2 flex items-center space-x-2 text-xs opacity-70">
                        {message.type === 'bot' && <Info className="w-3 h-3" />}
                        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
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
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-gray-500">Generating response...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} className="h-px" />
            </div>
            <form onSubmit={handleSubmit} className="border-t-2 border-blue-200 p-4 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about courses, facilities, placements..."
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 border-blue-200 focus:ring-blue-500 bg-blue-50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /><span className="hidden md:inline">Send</span></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <button onClick={copyEntireChat} className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-lg z-50"
          >
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
              <button onClick={() => setError(null)} className="ml-4 text-red-500 hover:text-red-700">×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExcelCollegeChatbot;