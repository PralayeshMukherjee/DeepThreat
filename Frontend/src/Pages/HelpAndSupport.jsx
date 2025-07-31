import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown,Mail, Phone, HelpCircle, Bot } from "lucide-react";

const faqsData = [
  {
    question: "How do I reset my password?",
    answer: "Go to the login page, click on 'Forgot Password', and follow the instructions.",
  },
  {
    question: "Where can I find my billing history?",
    answer: "Navigate to Account Settings > Billing > History to view all your past invoices.",
  },
  {
    question: "Can I delete my account permanently?",
    answer: "Yes, go to Account Settings > Security > Delete Account.",
  },
  {
    question: "How do I enable two-factor authentication?",
    answer: "Go to Account Settings > Security and toggle 2FA.",
  },
  {
    question: "What should I do if I see suspicious activity?",
    answer: "Immediately reset your password and contact our support team through the chatbot.",
  },
];

const popularArticles = [
  {
    title: "Getting Started with DeepThreat",
    content: "Welcome to DeepThreat! This article helps you understand the platform basics, from onboarding to securing your account.",
  },
  {
    title: "Top 10 Security Best Practices",
    content: "Security starts with awareness. This article walks through the top 10 tips to keep your account and organization secure.",
  },
  {
    title: "Account Setup & Verification",
    content: "Here's how to properly configure and verify your DeepThreat account, including identity verification steps.",
  },
  {
    title: "Managing API Tokens Securely",
    content: "This article details how to generate, manage, and safely store your API tokens to avoid unauthorized access.",
  },
  {
    title: "How to Use the Dashboard Efficiently",
    content: "Learn tips and tricks to navigate and customize your dashboard for maximum productivity.",
  },
];

const recentActivities = [
  "Visited 'Getting Started with DeepThreat'",
  "Read 'Top 10 Security Best Practices'",
  "Searched 'reset password'",
  "Gave feedback on 'How do I reset my password?'"
];

export default function HelpSupport() {
  const [search, setSearch] = useState("");
  const [faqFeedback, setFaqFeedback] = useState({});
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredFaqs = faqsData.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAnswer = (index) => {
    setFaqFeedback(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        expanded: !prev[index]?.expanded
      }
    }));
  };

  const handleVote = (index, type) => {
    if (faqFeedback[index]?.voted) return;
    setFaqFeedback(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [type]: (prev[index]?.[type] || 0) + 1,
        voted: type
      }
    }));
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === '/' && e.ctrlKey) {
        document.getElementById("search-box").focus();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className={`min-h-screen transition-all dark:bg-slate-900 dark:text-white  bg-white text-slate-900`}>
      <div className="flex justify-between p-4 items-center">
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowChatbot(!showChatbot)} className="p-2 rounded-full hover:bg-slate-700">
            <Bot size={20} />
          </button>
        </div>
      </div>

      {showChatbot && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-slate-800 text-white p-4 rounded-xl shadow-lg">
          <p className="text-sm">🤖 Chatbot Assistant is here to help you!</p>
          <input type="text" placeholder="Ask something..." className="mt-3 p-2 w-full rounded bg-slate-700" />
        </div>
      )}

      {!selectedArticle && (
        <>
          <div className="p-4 max-w-xl mx-auto">
            <input
              id="search-box"
              type="text"
              placeholder="Search topics... (Ctrl+/ to focus)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 text-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          <div className="p-4 max-w-2xl mx-auto space-y-4">
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => {
              const isExpanded = faqFeedback[index]?.expanded || false;
              const voted = faqFeedback[index]?.voted || null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800 p-4 rounded-xl"
                >
                  <h2
                    className="text-lg font-semibold cursor-pointer hover:underline"
                    onClick={() => toggleAnswer(index)}
                  >
                    {faq.question}
                  </h2>

                  {isExpanded && (
                    <div className="mt-2">
                      <p className="text-sm text-slate-300">{faq.answer}</p>
                      <div className="flex items-center mt-2 gap-2">
                        <button
                          className={`text-xs flex items-center gap-1 px-2 py-1 rounded ${voted === 'up' ? 'bg-green-600' : 'bg-slate-700'}`}
                          onClick={() => handleVote(index, 'up')}
                        >
                          <ThumbsUp size={12} /> {faqFeedback[index]?.up || 0}
                        </button>
                        <button
                          className={`text-xs flex items-center gap-1 px-2 py-1 rounded ${voted === 'down' ? 'bg-red-600' : 'bg-slate-700'}`}
                          onClick={() => handleVote(index, 'down')}
                        >
                          <ThumbsDown size={12} /> {faqFeedback[index]?.down || 0}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            }) : (
              <p className="text-center text-gray-400">No results found for "{search}"</p>
            )}
          </div>

          <div className="max-w-5xl mx-auto p-6">
            <h3 className="text-xl font-semibold mb-4">Popular Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {popularArticles.map((article, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <p className="text-sm font-medium">{article.title}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <ul className="list-disc list-inside text-sm text-slate-300">
              {recentActivities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {selectedArticle && (
        <div className="max-w-3xl mx-auto p-6">
          <button
            className="mb-4 text-sm underline text-blue-400 hover:text-blue-200"
            onClick={() => setSelectedArticle(null)}
          >
            ← Back to Articles
          </button>
          <h2 className="text-2xl font-bold mb-2">{selectedArticle.title}</h2>
          <p className="text-slate-300 text-sm leading-6">{selectedArticle.content}</p>
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div
          className={`p-6 rounded-xl shadow flex flex-col items-center gap-3 bg-blue-200 dark:bg-[#1e40af]`}
        >
          <HelpCircle size={28} />
          <h3 className="text-lg font-semibold">Guides & Tutorials</h3>
          <p className={`dark:text-gray-200  text-gray-800`}>
            Learn how to use the platform effectively with our step-by-step guides.
          </p>
        </div>

        <div
          className={`p-6 rounded-xl shadow flex flex-col items-center gap-3 dark:bg-[#059669]  bg-green-200`}
        >
          <Mail size={28} />
          <h3 className="text-lg font-semibold">Security & Account</h3>
          <p className={`dark:text-gray-200 text-gray-800`}>
            Help on login issues, password changes, and securing your account.
          </p>
        </div>

        <div
          className={`p-6 rounded-xl shadow flex flex-col items-center gap-3 dark:bg-[#6366f1] bg-indigo-200`}
        >
          <Phone size={28} />
          <h3 className="text-lg font-semibold">Billing & Subscriptions</h3>
          <p className={`dark:text-gray-200  text-gray-800`}>
            Get info on payments, invoices, refunds, and subscriptions.
          </p>
        </div>
      </section>
      <div className="text-center text-xs text-slate-500 py-4">
        ⌨️ Tip: Press <strong>Ctrl + /</strong> anytime to focus the search bar
      </div>
    </div>
  );
}
