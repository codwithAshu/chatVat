import { faPaperPlane, faSmile, faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useRef } from 'react';
import { connectSocket, disconnectSocket } from "./Socket";

import '../styles/chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import logo from '../assets/Cv.png';
import EmojiPicker from 'emoji-picker-react';
import bgImg from '../assets/chatback3.jpg'

export const ChatApp = () => {
const socketRef = useRef(null);
  const location = useLocation();
  const userName = location.state?.name || 'User';
  const uniqueusername = location.state?.username || 'User';
  
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [username, setUsername] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [isSending, setIsSending] = useState(false);

  const endOfMessagesRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const typingDebounceRef = useRef(null);

  useEffect(() => {
    socketRef.current = connectSocket();
    const to = prompt("Who do you want to chat with?")?.toLowerCase();
    setUsername(userName);
    setRecipient(to);

    if (!to) {
      alert("Recipient is required");
      return;
    }

    socketRef.current.emit('register', uniqueusername.toLowerCase());

    // Message reception handler
    socketRef.current.on('sendMessage', (msg) => {
      if (msg.recipient.toLowerCase() === uniqueusername.toLowerCase()) {
        setChat(prev => [...prev, { 
          ...msg, 
          type: 'incoming',
          status: 'delivered'
        }]);
      }
    });

    // Typing indicator handler
    socketRef.current.on('typing', (data) => {
      if (data.user !== username) {
        setTypingUser(data.user);    
        setIsTyping(true);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setTypingUser('');
        }, 1500);
      }
    });

    // Stop typing handler
    socketRef.current.on('stopTyping', (data) => {
      if (data.user !== username) {
        setIsTyping(false);
        setTypingUser('');
      }
    });

    // Message status handler
    socketRef.current.on('messageStatus', (status) => {
      setChat(prev => prev.map(msg => 
        msg.id === status.id ? { ...msg, status: status.status } : msg
      ));
    });

    socketRef.current.on('sessionExpired', (msg) => {
      alert(msg);
      disconnectSocket();
    });

    return () => {
      disconnectSocket();
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(typingDebounceRef.current);
    };
  }, [username, uniqueusername]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const msgId = entry.target.getAttribute('data-msgid');
          const msg = chat.find(m => m.id.toString() === msgId);
          if (msg && msg.type === 'incoming') {
            socketRef.current.emit('messageSeen', msgId);
          }
        }
      });
    }, { threshold: 0.7 });
  
    document.querySelectorAll('.message.incoming').forEach(msg => {
      observer.observe(msg);
    });
  
    return () => observer.disconnect();
  }, [chat]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isTyping]);

  const handleTyping = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Clear existing debounce timer
    clearTimeout(typingDebounceRef.current);

    // Don't emit if sending
    if (isSending) return;

    // Set debounce timer to emit typing event
    typingDebounceRef.current = setTimeout(() => {
      if (value.trim()) {
        socketRef.current.emit('typing', {
          user: username,
          recipient
        });
      } else {
        socketRef.current.emit('stopTyping', {
          user: username,
          recipient
        });
      }
    }, 300); // 300ms debounce delay

    // Set timeout to stop typing after pause
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('stopTyping', {
        user: username,
        recipient
      });
    }, 1000);
  };

  const sendMessage = () => {
    if (!message.trim() || isSending) return;

    // Immediately stop typing indicators
    clearTimeout(typingDebounceRef.current);
    clearTimeout(typingTimeoutRef.current);
    socketRef.current.emit('stopTyping', {
      user: username,
      recipient
    });

    setIsSending(true);

    const msgObj = {
      id: Date.now(),
      user: username,
      message: message.trim(),
      recipient,
      status: 'sent'
    };

    setMessage('');
    setChat(prev => [...prev, { ...msgObj, type: 'outgoing' }]);
    socketRef.current.emit('sendMessage', msgObj);
    
    setTimeout(() => {
      socketRef.current.emit('messageStatus', {
        id: msgObj.id,
        status: 'delivered'
      });
      setIsSending(false);
    }, 1000);
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <section className="chat_section" style={{ backgroundImage: `url(${bgImg})` }} >
      <div className="border">
      <div className='chatlogodiv'>
        <img className="chatlogo" src={logo} alt="chat logo" />
        </div>
        <div className='d-flex'>      
          <h1>{userName}</h1>
          <p className='uniqueusername'>{uniqueusername}</p>
        </div>

        <div className="msg_area">
          {chat.map((msg, index) => (
            <div key={index} className={`${msg.type} message`}   data-msgid={msg.id}   >
                
              <div className="message_header">
                <h4>{msg.type === 'outgoing' ? 'You' : msg.user}</h4>
              </div>
              <p className='msgp'>{msg.message}</p>
              {msg.type === 'outgoing' && (
                <span className="message_status">
                  {msg.status === 'read' ? (
                    <>
                    <span style={{marginRight: '5px'}}>Seen</span>
                    <FontAwesomeIcon icon={faCheckDouble} color="#4CAF50" />
                    </>
                 ) : msg.status === 'delivered' ? (
                    <FontAwesomeIcon icon={faCheckDouble} color="#9E9E9E" />
                
                ) : (
                    <FontAwesomeIcon icon={faCheck} color="#9E9E9E" />
                  )}
                </span>
              )}
            </div>
          ))}
          
          {isTyping && typingUser && (
            <div className="typing_indicator">
              <div className="typing_dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span>{typingUser} is typing...</span>
            </div>
          )}
          
          <div ref={endOfMessagesRef}></div>
        </div>
        
        <div className="input_container">
          <button 
            className="emoji_btn" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FontAwesomeIcon icon={faSmile} />
          </button>
          
          <textarea
            rows="1"
            placeholder="Write a message..."
            value={message}
            onChange={handleTyping}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          
          <button className="send_btn" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} size="lg" />
          </button>
          
          {showEmojiPicker && (
            <div className="emoji_picker">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatApp;