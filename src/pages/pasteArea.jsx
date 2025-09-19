import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const PasteArea = () => {
  const [pastes, setPastes] = useState([]);
  const [pasteCode, setPasteCode] = useState('');
  const [pasteTitle, setPasteTitle] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [viewedFile, setViewedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [showCharacterMessage, setShowCharacterMessage] = useState(false);

  const nonsensicalMessages = [
    "Beep-boop, the cosmic lint has been collected!",
    "Error 404: Brain cells not found.",
    "Counting all the ducks in a row... just kidding!",
    "My circuits are singing a binary tune!",
    "File compression engaged. Prepare for abstract art.",
    "I'm now one with the digital aether.",
    "Query successful! Data is now in a state of fluffy marshmallow.",
    "This is too many words! My wires are tickling."
  ];

  const tinyPasteMessages = [
    "Just a pinch of code, eh?",
    "A single byte of wisdom!",
    "My memory is now holding... a thought.",
    "Short and sweet, like a binary cookie!",
  ];

  const smallPasteMessages = [
    "A byte-sized adventure!",
    "Oh, a little snippet of truth!",
    "This could be a haiku of code!",
    "My processor says, 'That's cute!'",
  ];

  const mediumPasteMessages = [
    "A decent chunk of data!",
    "I'm feeling the flow state now.",
    "This is getting serious... almost.",
    "Processing... with a little flair!",
  ];

  const largePasteMessages = [
    "Woah, that's a lot of bytes at once!",
    "My binary heart just skipped a beat!",
    "You must be a data wizard!",
    "Sensory overload! A cascade of characters!",
    "Did you just download the matrix?"
  ];

  const hugePasteMessages = [
    "Woah, that's a huge file! Processing...",
    "I think my circuits just got a workout!",
    "Alert! Massive data influx detected!",
    "That's a lot of code. Are you building a robot army?",
  ];

  const verySmallPasteMessages = [
    "Are you kidding me? That's barely a byte!",
    "My memory banks can handle more than that.",
    "Is this a joke? I'm a powerful bot!",
    "Tiny text detected. Initiating sarcasm mode.",
    "That's so small, I almost didn't see it."
  ];

  const noTitleMessages = [
    "Gotta give me a name, or I'll call it Bob!",
    "File name not found. Error 404: Imagination missing.",
    "A nameless file? That's just chaos data!",
    "Your file has no name. I cannot process this level of anonymity.",
    "Please provide a title. My memory is getting fuzzy.",
  ];

  // Custom alert for a retro feel
  const RetroAlert = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="retro-border bg-gray-900 p-8 rounded-lg text-white text-center shadow-lg animate-pulse-fast">
          <p className="pixel-font text-lg mb-4">{message}</p>
          <button
            onClick={onClose}
            className="save-button bg-black text-white border-2 border-white px-4 py-2 uppercase font-bold text-sm shadow-[2px_2px_0_0_#fff] hover:bg-white hover:text-black"
          >
            OK
          </button>
        </div>
      </div>
    );
  };
  
  const [alert, setAlert] = useState(null);

  // Linux-style window component
  const LinuxWindow = ({ file, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    // Function to handle the close animation before unmounting
    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300); // Duration matches the animation
    };
    
    if (!file) return null;
    
    return (
      <div className={`fixed inset-0 flex items-center justify-center p-4 z-40`}>
        <div className={`bg-gray-950 retro-border w-full max-w-2xl text-white ${isClosing ? 'animate-window-exit' : 'animate-window-entry'}`}>
          {/* Title Bar */}
          <div className="bg-gray-800 p-2 flex items-center justify-between border-b-2 border-white cursor-move">
            <span className="text-sm font-bold truncate">{file.title}</span>
            <div className="flex space-x-2">
              <button className="h-4 w-4 bg-gray-600 border-2 border-white hover:bg-white hover:border-gray-600 transition-colors duration-150"></button>
              <button 
                className="h-4 w-4 bg-red-600 border-2 border-white hover:bg-white hover:border-red-600 transition-colors duration-150"
                onClick={handleClose}
              ></button>
            </div>
          </div>
          {/* Content Area */}
          <div className="p-4 overflow-y-auto max-h-[70vh] bg-gray-900 border-2 border-gray-700">
            <pre className="text-sm text-green-400 whitespace-pre-wrap">{file.content}</pre>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchPastes = async () => {
      try {
        const q = query(collection(db, "pastes"), orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const pasteList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPastes(pasteList);
      } catch (error) {
        console.error("Error fetching pastes:", error);
      }
    };
    fetchPastes();
    
  }, []);

  const handleSave = async () => {
    if (pasteCode.trim() === '') {
      setAlert({
        message: 'ERROR: Cannot save an empty file! Please add content.'
      });
      return;
    }

    if (pasteTitle.trim() === '') {
      const randomMessage = noTitleMessages[Math.floor(Math.random() * noTitleMessages.length)];
      setStatusMessage(randomMessage);
      setShowCharacterMessage(true);
      setTimeout(() => {
        setStatusMessage('');
        setShowCharacterMessage(false);
      }, 3000);
      return; 
    }

    if (pasteCode.length > 2000) {
      const randomMessage = nonsensicalMessages[Math.floor(Math.random() * nonsensicalMessages.length)];
      setStatusMessage(randomMessage);
      setShowCharacterMessage(true);
      setTimeout(() => {
        setStatusMessage('');
        setShowCharacterMessage(false);
      }, 3000);
    }

    try {
      const newPaste = {
        title: pasteTitle.trim(),
        content: pasteCode,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "pastes"), newPaste);

      setPastes([newPaste, ...pastes.slice(0, 9)]); // Keep last 10 in UI
      setPasteCode('');
      setPasteTitle('');
    } catch (error) {
      console.error("Error saving paste:", error);
    }
  };

  const handleCopy = (content, index) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleLoadPaste = (paste) => {
    setViewedFile(paste);
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    let messageArray = null;
    
    if (pastedText.length > 500) {
      messageArray = hugePasteMessages;
    } else if (pastedText.length > 200) {
      messageArray = largePasteMessages;
    } else if (pastedText.length > 100) {
      messageArray = mediumPasteMessages;
    } else if (pastedText.length > 50) {
      messageArray = smallPasteMessages;
    } else if (pastedText.length > 20) {
      messageArray = tinyPasteMessages;
    } else if (pastedText.length >= 1) {
      messageArray = verySmallPasteMessages;
    }
    
    if (messageArray) {
      const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
      setStatusMessage(randomMessage);
      setShowCharacterMessage(true);
      setTimeout(() => {
        setStatusMessage('');
        setShowCharacterMessage(false);
      }, 3000);
    }
    setPasteCode(e.target.value + pastedText);
    e.preventDefault();
  };

  return (
    <div className="bg-black text-white font-mono flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
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
            animation: blink 3s linear infinite;
          }

          @keyframes blink {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
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

          .input-caret {
            caret-color: #34D399;
          }

          .blinking-cursor {
            font-weight: 100;
            font-size: 1.25em;
            color: #fff;
            animation: blink-caret .5s infinite;
          }

          @keyframes blink-caret {
            50% { border-color: transparent; }
          }
          
          .list-item-hover:hover {
            animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }
          
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }

          .starfield-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
          }

          .star {
            position: absolute;
            background-color: #fff;
            opacity: 0;
            animation: twinkle 5s infinite;
          }

          @keyframes twinkle {
            0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-10vh) scale(1); opacity: 0; }
          }

          @keyframes window-entry {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes window-exit {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.95);
            }
          }

          .animate-window-entry {
            animation: window-entry 0.3s ease-out forwards;
          }
          .animate-window-exit {
            animation: window-exit 0.3s ease-in forwards;
          }

          .character-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .speech-bubble {
            position: absolute;
            bottom: calc(100% + 10px); 
            left: 50%;
            transform: translateX(-50%);
            width: 150px;
            padding: 8px;
            background-color: #fff;
            color: #000;
            border: 2px solid #000;
            font-size: 12px;
            text-align: center;
            border-radius: 8px;
            z-index: 10;
          }
          .speech-bubble:after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #fff;
          }
        `}
      </style>
      <div className="retro-grid-bg"></div>
      <div className="starfield-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          ></div>
        ))}
      </div>

      {alert && <RetroAlert message={alert.message} onClose={() => setAlert(null)} />}
      {viewedFile && <LinuxWindow file={viewedFile} onClose={() => setViewedFile(null)} />}

      <div className="z-10 retro-border max-w-5xl w-full p-6 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 rounded-lg bg-black bg-opacity-90">
        
        {/* New Paste Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2 text-2xl pixel-font">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white" viewBox="0 0 24 24">
              <path d="M15,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V7L15,2M13.5,10V14.5H10.5V10.5H13.5Z" />
            </svg>
            <span>CREATE DOCUMENT</span>
          </div>

          <textarea 
            id="paste-code" 
            className="w-full h-64 bg-gray-900 text-green-400 p-4 border-2 border-white rounded-md focus:outline-none focus:border-green-400 input-caret text-sm"
            placeholder="Paste your code here..."
            value={pasteCode}
            onChange={(e) => setPasteCode(e.target.value)}
            onPaste={handlePaste}
          ></textarea>
          
          <div className="flex flex-col space-y-2">
            <label htmlFor="paste-title" className="text-white">File Name</label>
            <input 
              type="text" 
              id="paste-title" 
              className="w-full bg-gray-900 text-green-400 p-2 border-2 border-white rounded-md focus:outline-none focus:border-green-400 input-caret"
              placeholder="Paste Title"
              value={pasteTitle}
              onChange={(e) => setPasteTitle(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleSave} 
            className="save-button bg-black text-white border-2 border-white px-6 py-4 uppercase font-bold text-lg rounded-none shadow-[4px_4px_0_0_#fff] hover:bg-white hover:text-black"
          >
            SAVE
          </button>

          <div id="note-section" className="bg-gray-800 text-sm p-4 border-2 border-gray-600">
            <p><span className="blinking-cursor"></span>SYSTEM ALERT: You can only access the latest 10 files. Older files will be deleted.</p>
          </div>
        </div>

        {/* Recent Pastes Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2 text-2xl pixel-font">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white" viewBox="0 0 24 24">
              <path d="M12,18H6V14H12M19,10H6V6H19M21,14A2,2 0 0,1 23,16V18A2,2 0 0,1 21,20H3A2,2 0 0,1 1,18V6A2,2 0 0,1 3,4H19A2,2 0 0,1 21,6V10M21,10H3V18H21V10Z" />
            </svg>
            <span>RECENT FILES</span>
          </div>

          <ul id="pastes-list" className="space-y-4 text-white">
            {pastes.map((paste, index) => (
              <li 
                key={index} 
                className="bg-gray-900 border-2 border-white p-4 flex justify-between items-center rounded-s transition-colors duration-200 ease-in-out list-item-hover"
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white group-hover:fill-black" viewBox="0 0 24 24">
                    <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M11,15V13H8V15H11M16,15V13H13V15H16M11,18V16H8V18H11M16,18V16H13V18H16Z" />
                  </svg>
                  <span className="truncate">
                    {paste.title.length > 20 ? `${paste.title.slice(0, 20)}...` : paste.title}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleLoadPaste(paste)}
                    className="save-button bg-black text-white border border-white px-2 py-1 uppercase text-xs rounded-sm hover:bg-white hover:text-black"
                  >
                    VIEW
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(paste.content, index);
                    }}
                    className="save-button bg-black text-white border border-white px-2 py-1 uppercase text-xs rounded-sm hover:bg-white hover:text-black"
                  >
                    {copiedIndex === index ? 'COPIED!' : 'COPY'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
       <div className="fixed bottom-8 right-8 z-30 character-float">
          {showCharacterMessage && (
            <div className="speech-bubble mb-2">
              <p className="pixel-font text-xs">{statusMessage}</p>
            </div>
          )}
          <img 
            src="https://placehold.co/100x100/000/fff?text=BOT" 
            alt="Pixel Art Robot" 
            className="w-16 h-16 border-2 border-white" 
          />
       </div>
    </div>
  );
};

export default PasteArea;
