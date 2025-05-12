import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../styles/chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
const socket = io('http://localhost:1010'); 

export const ChatApp = () => {
    const location = useLocation();
    const userName = location.state?.name || 'User';
console.log("userName",userName);

    
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    const to = prompt("Who do you want to chat with?");
    setUsername(userName);
    setRecipient(to);

    socket.emit('register', userName);

    socket.on('sendMessage', (msg) => {
      if (msg.recipient === userName) {
        setChat(prev => [...prev, { ...msg, type: 'incoming' }]);
      }
    });

    socket.on('sessionExpired', (msg) => {
      alert(msg);
      socket.disconnect();
    });


    return () => {
      socket.off(); // clean up listeners
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msgObj = {
      user: username,
      message: message.trim(),
      recipient
    };
    setChat(prev => [...prev, { ...msgObj, type: 'outgoing' }]);
    socket.emit('sendMessage', msgObj);
    setMessage('');
  };

  return (
    <section className="chat_section">
      <div className="border">
        <img className="chatlogo" src="/src/assets/Cv.png" alt="chat logo" />
        <h1>{userName}</h1>
        <div className="msg_area">
          {chat.map((msg, index) => (
            <div key={index} className={`${msg.type} message`}>
              <h4>{msg.type === 'outgoing' ? 'me' : msg.user}</h4>
              <p className='msgp'>{msg.message}</p>
            </div>
          ))}
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
