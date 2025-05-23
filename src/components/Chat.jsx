import React, { useEffect, useState,useRef  } from 'react';
import { connectSocket, disconnectSocket } from "./Socket";
// import io from 'socket.io-client';
import '../styles/chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import logo from '../assets/Cv.png'
const socketRef = useRef(null);


let socket;

// const socket = io("https://chatbackend-ph5y.onrender.com", {
//     transports: ["websocket","polling"], 
//     withCredentials: true 
//     }); 

export const ChatApp = () => {
    const location = useLocation();
    const userName = location.state?.name || 'User';
    const uniqueusername = location.state?.username || 'User';
console.log("userName",userName);
console.log("uniqueusername",uniqueusername);


    
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [username, setUsername] = useState('');

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    socketRef = connectSocket();
 
    const to = prompt("Who do you want to chat with?")?.toLowerCase();
    setUsername(userName);
    setRecipient(to);

    socketRef.current.emit('register', uniqueusername.toLowerCase());

    socketRef.current.on('sendMessage', (msg) => {
      if (msg.recipient.toLowerCase() === uniqueusername.toLowerCase()) {
        setChat(prev => [...prev, { ...msg, type: 'incoming' }]);
      }
    });

    socketRef.current.on('sessionExpired', (msg) => {
      alert(msg);
      disconnectSocket();
    });


    return () => {
        disconnectSocket(); // clean up listeners
    };
  }, []);

  useEffect(() => {
    // 👇 Scroll to bottom when new message arrives
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msgObj = {
      user: username,
      message: message.trim(),
      recipient
    };
    setChat(prev => [...prev, { ...msgObj, type: 'outgoing' }]);
    socketRef.current.emit('sendMessage', msgObj);
    setMessage('');
  };

  return (
    <section className="chat_section">
      <div className="border">
        <img className="chatlogo" src={logo} alt="chat logo" />
        <div className='d-flex'>      
              <h1>{userName}</h1>
        <p className='uniqueusername'>{uniqueusername}</p>
        </div>

        <div className="msg_area">
          {chat.map((msg, index) => (
            <div key={index} className={`${msg.type} message`}>
              <h4>{msg.type === 'outgoing' ? 'me' : msg.user}</h4>
              <p className='msgp'>{msg.message}</p>
              
            </div>
          ))}
            <div ref={endOfMessagesRef}></div>
        </div>
        <div className="input_container">
          <textarea
            rows="1"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button className="send_btn" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatApp;
