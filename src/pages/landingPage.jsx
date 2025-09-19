import React, { useState, useEffect, useRef } from 'react';
import PasteArea from './pasteArea';

// Loading Screen component
const LoadingScreen = ({ onFinish }) => {
  const [logMessages, setLogMessages] = useState([]);
const logSequence = [
  'INITIATING CODE-SHARE OS v1.0...',
  'Scanning floppy disk drives...',
  'ERROR: Floppy not found. (Did you time travel from 1995?)',
  'Establishing secure connection via... carrier pigeon',
  'Loading syntax highlighter.exe...',
  'Compiling dad jokes module... SUCCESS',
  'Checking RAM... LOL just kidding, you have no RAM left.',
  'Fetching user profile... NOT FOUND (anonymous detected)',
  'Installing caffeine drivers... OK',
  'Verifying cheat codes... IDDQD OK, IDKFA OK',
  'BOOT SEQUENCE COMPLETE. Welcome to CodeShare 3000'
];


  const logRef = useRef(null);

  useEffect(() => {
    let messageIndex = 0;
    const logInterval = setInterval(() => {
      if (messageIndex < logSequence.length) {
        setLogMessages(prev => [...prev, logSequence[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 800); // Changed from 500 to 800 for a slower log display

    const finishTimeout = setTimeout(() => {
      onFinish();
    }, 10000);

    return () => {
      clearInterval(logInterval);
      clearTimeout(finishTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50">
      <div className="p-8 bg-black w-full max-w-4xl text-left">
        <h2 className="  text-2xl md:text-3xl text-gray-400 mb-4">
          // SYSTEM BOOTUP
        </h2>
        <div ref={logRef} className="text-left text-sm md:text-base leading-relaxed h-72 overflow-hidden">
          {logMessages.map((msg, index) => (
            <p key={index} className="mb-1 text-gray-400 animate-fade-in">
              {`> ${msg}`}
            </p>
          ))}
          {logMessages.length < logSequence.length && (
            <span className="blink-caret text-white">_</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Landing Page component
const LandingPage = ({ onNavigate, onEnterApp }) => {
  const [blinkMessage, setBlinkMessage] = useState('');
  const funnyMessages = [
     
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * funnyMessages.length);
      setBlinkMessage(funnyMessages[randomIndex]);
    }, 250);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      <div className="retro-grid-bg"></div>

      <nav className="w-full p-4 flex justify-between items-center z-20">
        <h1 className="pixel-font text-xl md:text-2xl">RETRO CONSOLE</h1>
        <div className="flex space-x-4">
          <a href="#" onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition-colors duration-200">HOME</a>
          <a href="#" onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors duration-200">CONTACT</a>
          <a href="#" onClick={() => onNavigate('secret')} className="text-gray-400 hover:text-white transition-colors duration-200">SECRET</a>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center text-white font-mono text-center p-4 z-10">
        <div className="animate-fade-in retro-border p-8 md:p-12 lg:p-16 bg-black bg-opacity-90 max-w-4xl w-full">
          <h1 className="text-4xl md:text-6xl pixel-font mb-4 overflow-hidden whitespace-nowrap pr-2">
            <span className="animate-typewriter">RETRO CONSOLE</span>
            <span className="blink-caret">_</span>
            {blinkMessage && (
              <span className="ml-2 animate-pulse">{blinkMessage}</span>
            )}
          </h1>
          <p className="text-md md:text-lg mb-8 animate-fade-in-up delay-300">
            A minimalist platform for sharing code snippets.
            <br />
            Experience the delightful chaos of vintage computing.
          </p>
          <button
            onClick={onEnterApp}
            className="save-button bg-black text-white border-2 border-white px-8 py-4 uppercase font-bold text-lg rounded-none shadow-[4px_4px_0_0_#fff] hover:bg-white hover:text-black animate-pulse"
          >
            ENTER
          </button>
        </div>
        
        <div className="mt-12 text-center max-w-2xl mx-auto z-10">
            <h2 className="pixel-font text-xl md:text-2xl text-gray-400 mb-4">
                // ABOUT US
            </h2>
            <div className="text-left text-sm md:text-base leading-relaxed">
                <p className="mb-4">
                    <span className="text-gray-500">{'>'} </span>
                    Our platform is a lightweight and hassle-free code sharing tool designed for developers, students, and programming enthusiasts. Unlike traditional platforms, you don’t need to create an account or go through lengthy setups — just paste your code, generate a shareable link, and send it anywhere instantly.
                </p>
                <p className="pixel-font text-xl md:text-2xl mt-8 text-white">
                    <span className="text-gray-500">{'>'} </span>
                    Simple. Fast. Analog.
                </p>
            </div>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto z-10">
            <h2 className="pixel-font text-xl md:text-2xl text-gray-400 mb-4">
                // CORE FEATURES
            </h2>
            <div className="text-left text-sm md:text-base leading-relaxed">
                <ul className="list-none">
                    <li className="mb-2">
                        <span className="text-gray-500">{'>'} </span>
                        <strong>Instant Sharing:</strong> Copy a link and share it with anyone.
                    </li>
                    <li className="mb-2">
                        <span className="text-gray-500">{'>'} </span>
                        <strong>Multiple Languages Support:</strong> Syntax highlighting for 50+ programming languages.
                    </li>
                    <li className="mb-2">
                        <span className="text-gray-500">{'>'} </span>
                        <strong>No Account Needed:</strong> Share anonymously without signing in.
                    </li>
                    <li className="mb-2">
                        <span className="text-gray-500">{'>'} </span>
                        <strong>Dark & Light Themes:</strong> Toggle between coding themes.
                    </li>
                    <li className="mb-2">
                        <span className="text-gray-500">{'>'} </span>
                        <strong>Editable/Read-Only Modes:</strong> Choose whether others can edit or only view your snippet.
                    </li>
                    <li className="mb-2">
                        <span className="text-gray-500">{'>'} </span>
                        <strong>Version History:</strong> Save different versions of your shared snippet.
                    </li>
                </ul>
            </div>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto z-10">
            <h2 className="pixel-font text-xl md:text-2xl text-gray-400 mb-4">
                // HOW IT WORKS
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="pixel-font text-4xl mb-2 text-gray-500">1</div>
                    <h4 className="pixel-font text-sm md:text-base mb-2">PASTE YOUR CODE</h4>
                    <p className="text-xs text-gray-400">Type or paste your code into the terminal. Our circuits will handle the rest.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="pixel-font text-4xl mb-2 text-gray-500">2</div>
                    <h4 className="pixel-font text-sm md:text-base mb-2">GENERATE A LINK</h4>
                    <p className="text-xs text-gray-400">Click save to generate a unique, shareable link for your snippet.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="pixel-font text-4xl mb-2 text-gray-500">3</div>
                    <h4 className="pixel-font text-sm md:text-base mb-2">SHARE INSTANTLY</h4>
                    <p className="text-xs text-gray-400">Distribute your link anywhere. No accounts, no hassle, no data.</p>
                </div>
            </div>
        </div>
      </main>

      <footer className="w-full p-8 md:p-12 lg:p-16 text-center text-sm text-gray-400 z-20">
        <p className="pixel-font text-lg md:text-xl lg:text-2xl">&copy; 2023 RETRO CONSOLE. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// New Secret Page component
const SecretPage = ({ onNavigate }) => {
  const [logMessages, setLogMessages] = useState([]);
  const logSequence = [
    'ACCESS GRANTED: Welcome, Administrator.',
    'WARNING: Unauthorized access will be met with immediate termination.',
    'LOG: 1984.07.12_14:30: The cake is a lie.',
    'LOG: 1985.03.21_09:00: All your base are belong to us.',
    'LOG: 1987.05.05_12:00: SYSTEM ACCESS: The secret phrase is "banana."',
    'LOG: 1990.11.10_18:00: Initiating self-destruct sequence. Just kidding!',
    'LOG: 2023.10.26_10:30: Monitoring user activity for secret keys.',
    'LOG: Asking developer for secret key...',
    'LOG: DEVELOPER: The developer is too lazy and denied the access.',
    'LOG: DEVELOPER: A secret is a secret for a reason.',
    'LOG: DEVELOPER: Try another time.',
    'LOG: Searching for the secret key...'
  ];

  useEffect(() => {
    let messageIndex = 0;
    const logInterval = setInterval(() => {
      if (messageIndex < logSequence.length) {
        setLogMessages(prev => [...prev, logSequence[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 1500); // Add a new message every 1.5 seconds

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="flex flex-col w-full relative min-h-screen p-4 text-white font-mono">
      <div className="retro-grid-bg"></div>

      <nav className="w-full p-4 flex justify-between items-center z-20">
        <h1 className="pixel-font text-xl md:text-2xl">RETRO CONSOLE</h1>
        <div className="flex space-x-4">
          <a href="#" onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition-colors duration-200">HOME</a>
          <a href="#" onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors duration-200">CONTACT</a>
          <a href="#" onClick={() => onNavigate('secret')} className="text-gray-400 hover:text-white transition-colors duration-200">SECRET</a>
        </div>
      </nav>
      
      <main className="flex-grow flex flex-col items-center justify-center text-center z-10">
        <div className="retro-border p-8 md:p-12 bg-black bg-opacity-90 max-w-4xl w-full">
          <h2 className="pixel-font text-2xl md:text-3xl text-gray-400 mb-4">
            // SECRET TERMINAL
          </h2>
          <div className="text-left text-sm md:text-base leading-relaxed h-72 overflow-hidden">
            {logMessages.map((msg, index) => (
              <p key={index} className="mb-1 text-gray-400 animate-fade-in">
                {`> ${msg}`}
              </p>
            ))}
            {logMessages.length < logSequence.length && (
              <span className="blink-caret text-white">_</span>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full p-8 md:p-12 lg:p-16 text-center text-sm text-gray-400 z-20">
        <p className="pixel-font text-lg md:text-xl lg:text-2xl">&copy; 2023 RETRO CONSOLE. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// New Contact Page component
const ContactPage = ({ onNavigate }) => {
  const [logMessages, setLogMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const logRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    setLogMessages([]);
    setIsConnecting(true);

    const fullLog = [
      `USER INPUT: ${inputMessage}`,
      'LOG: INITIATING CONNECTION TO DEVELOPER...',
      'LOG: Sending message via quantum entanglement...',
      'LOG: Transmission received. Developer is in a "code trance."',
      'LOG: Pinging developer for response...',
      'LOG: Retrying connection... (Attempt 1 of 3)',
      'LOG: Retrying connection... (Attempt 2 of 3)',
      'LOG: Retrying connection... (Attempt 3 of 3)',
      'ERROR: Developer not responding.',
      'ERROR: All attempts have failed.',
      'LOG: TERMINATING CONNECTION...',
      'LOG: Developer is probably lost in the code matrix. Try again later.'
    ];

    let messageIndex = 0;
    const logInterval = setInterval(() => {
      if (messageIndex < fullLog.length) {
        setLogMessages(prev => [...prev, fullLog[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(logInterval);
        setIsConnecting(false);
      }
    }, 1500);
  };
  
  useEffect(() => {
    if(logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logMessages]);

  return (
    <div className="flex flex-col w-full relative min-h-screen p-4 text-white font-mono">
      <div className="retro-grid-bg"></div>

      <nav className="w-full p-4 flex justify-between items-center z-20">
        <h1 className="pixel-font text-xl md:text-2xl">RETRO CONSOLE</h1>
        <div className="flex space-x-4">
          <a href="#" onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition-colors duration-200">HOME</a>
          <a href="#" onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors duration-200">CONTACT</a>
          <a href="#" onClick={() => onNavigate('secret')} className="text-gray-400 hover:text-white transition-colors duration-200">SECRET</a>
        </div>
      </nav>
      
      <main className="flex-grow flex flex-col items-center justify-center text-center z-10">
        <div className="retro-border p-8 md:p-12 bg-black bg-opacity-90 max-w-4xl w-full">
          <h2 className="pixel-font text-2xl md:text-3xl text-gray-400 mb-4">
            // CONTACT PROTOCOL
          </h2>
          <div ref={logRef} className="text-left text-sm md:text-base leading-relaxed h-72 overflow-hidden mb-4">
            {logMessages.length === 0 && (
              <p className="text-gray-400">
                {`> READY. Awaiting your message.`}
                <span className="blink-caret text-white">_</span>
              </p>
            )}
            {logMessages.map((msg, index) => (
              <p key={index} className="mb-1 text-gray-400 animate-fade-in">
                {`> ${msg}`}
              </p>
            ))}
            {isConnecting && (
              <span className="blink-caret text-white">_</span>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center w-full mt-4 space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Enter your message..."
              className="flex-grow p-2 text-white bg-gray-900 border-2 border-white rounded-none focus:outline-none focus:border-gray-500 font-mono text-sm"
              disabled={isConnecting}
            />
            <button
              onClick={handleSendMessage}
              className="save-button bg-black text-white border-2 border-white px-4 py-2 uppercase font-bold text-sm rounded-none shadow-[2px_2px_0_0_#fff] hover:bg-white hover:text-black"
              disabled={isConnecting}
            >
              SEND
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full p-8 md:p-12 lg:p-16 text-center text-sm text-gray-400 z-20">
        <p className="pixel-font text-lg md:text-xl lg:text-2xl">&copy; 2023 RETRO CONSOLE. All Rights Reserved.</p>
      </footer>
    </div>
  );
};


// Main App Component for routing
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessages, setPopupMessages] = useState([]);
  const [popupMessageIndex, setPopupMessageIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const popupLogRef = useRef(null);

  const verificationSequence = [
    'HUMANITY PROTOCOL: Verifying your pulse...',
    'HUMANITY PROTOCOL: Collecting your browsing data...',
    'HUMANITY PROTOCOL: Analyzing your funny bone...',
    'HUMANITY PROTOCOL: Cross-referencing with known human anomalies...',
    'HUMANITY PROTOCOL: Determining your snack preference...',
    'HUMANITY PROTOCOL: Found. Welcome, fellow meatbag.',
  ];

  useEffect(() => {
    if (showPopup && isVerifying && popupMessageIndex < verificationSequence.length) {
      const popupInterval = setInterval(() => {
        setPopupMessages(prev => [...prev, verificationSequence[popupMessageIndex]]);
        setPopupMessageIndex(prev => prev + 1);
      }, 1000);
      return () => clearInterval(popupInterval);
    }
  }, [showPopup, isVerifying, popupMessageIndex]);

  useEffect(() => {
    if (popupLogRef.current) {
      popupLogRef.current.scrollTop = popupLogRef.current.scrollHeight;
    }
  }, [popupMessages]);

  const handleEnterClick = () => {
    setShowPopup(true);
  };

  const handleVerifyClick = () => {
    setIsVerifying(true);
    setPopupMessages([]);
    setPopupMessageIndex(0);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsVerifying(false);
    setPopupMessages([]);
    setPopupMessageIndex(0);
    setCurrentPage('app'); // Navigate to the main app after verification
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    // Reset popup state when navigating away
    setShowPopup(false);
    setIsVerifying(false);
    setPopupMessages([]);
    setPopupMessageIndex(0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={navigateTo} onEnterApp={handleEnterClick} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'secret':
        return <SecretPage onNavigate={navigateTo} />;
      case 'app':
        // Placeholder for the main code-sharing app.
        window.location.href="/PasteArea";
      default:
        return window.location.href="/PasteArea";
    }
  };

  return (
    <div className="bg-black text-white font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden min-h-screen">
      <style>
        {`
          .retro-grid-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(90deg, #333 1px, transparent 1px) 0% 0%,
              linear-gradient(#333 1px, transparent 1px) 0% 0%;
            background-size: 50px 50px;
            background-repeat: repeat;
            opacity: 0.2;
            animation: scroll-grid 15s linear infinite;
          }
          @keyframes scroll-grid {
            from { background-position: 0% 0%; }
            to { background-position: 0% -100%; }
          }
          .retro-border {
            border: 4px solid #fff;
            box-shadow: 8px 8px 0px 0px #fff;
          }
          .save-button {
            transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
          }
          .save-button:hover {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px 0px #fff;
          }
          .pixel-font {
            font-family: 'Press Start 2P', cursive;
          }
          @media (max-width: 768px) {
            .pixel-font {
              font-size: 1.5rem;
            }
          }
          .animate-typewriter {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            animation: 
              typewriter 2s steps(20, end) forwards, 
              blink-caret 0.75s step-end infinite;
          }
          .blink-caret {
            border-right: 4px solid;
          }
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          .animate-fade-in {
            animation: fadeIn 2s forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s forwards;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .character-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .popup {
            animation: scanline-fade-in 0.5s forwards;
          }
          .popup-bg {
            animation: fadeIn 0.3s forwards;
          }
          @keyframes scanline-fade-in {
            from { opacity: 0; transform: scale(0.95); filter: brightness(0.5); }
            to { opacity: 1; transform: scale(1); filter: brightness(1); }
          }
          .terminal-log {
            height: 200px;
            overflow-y: scroll;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .terminal-log::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {isLoading ? (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      ) : (
        renderPage()
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 popup-bg">
          <div className="retro-border p-8 bg-black w-full max-w-sm text-center popup">
            <h3 className="pixel-font text-xl mb-4">VERIFY HUMANITY</h3>
            {!isVerifying ? (
              <>
                <p className="text-sm mb-6">
                  System detected human-like behavior.
                  <br />
                  Please proceed with verification.
                </p>
                <button onClick={handleVerifyClick} className="pixel-font text-sm mt-4 bg-black border-2 border-white px-4 py-2 hover:bg-white hover:text-black">
                  VERIFY ME
                </button>
              </>
            ) : (
              <>
                <div ref={popupLogRef} className="w-full text-left text-sm max-h-40 overflow-hidden">
                  {popupMessages.map((msg, index) => (
                    <p key={index} className="mb-1 text-gray-400">
                      {msg}
                    </p>
                  ))}
                  {popupMessageIndex < verificationSequence.length && (
                    <span className="blink-caret text-white">_</span>
                  )}
                </div>
                {popupMessageIndex >= verificationSequence.length && (
                  <button onClick={handlePopupClose} className="pixel-font text-sm mt-4 bg-black border-2 border-white px-4 py-2 hover:bg-white hover:text-black">
                    PROCEED
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
