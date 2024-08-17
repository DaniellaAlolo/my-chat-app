import React, { useState, useEffect }  from 'react'
import {useNavigate} from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getToken, getUserData } from './storage';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const { userId } = getUserData();

  useEffect(() => {
    const fetchMessages = async () => {
      const token = getToken();

      try {
        const response = await fetch('https://chatify-api.up.railway.app/messages?', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          setError('Failed to load messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages');
      }
    };

    fetchMessages();
  }, []);

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    const token = getToken();

    // Sanitize the message
    const sanitizedMessage = DOMPurify.sanitize(newMessage);

    try {
      const response = await fetch('https://chatify-api.up.railway.app/messages?', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: sanitizedMessage }),
      });

      if (response.ok) {
        const newMsg = await response.json();
        setMessages([...messages, newMsg]); // Lägg till nytt meddelande i listan
        setNewMessage(''); // Rensa inputfältet
      } else {
        setError('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message');
    }
  };

  const handleDeleteMessage = async (msgId) => {
    const token = getToken();

    try {
      const response = await fetch(`https://chatify-api.up.railway.app/messages/${msgId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== msgId)); // Ta bort meddelandet från listan
      } else {
        setError('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Error deleting message');
    }
  };

  return (
    <div className="chat-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="messages-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.userId === userId ? 'right' : 'left'}`}
          >
            <p>{msg.content}</p>
            {msg.userId === userId && (
              <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>

      <div className="new-message">
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <div className='chat-page'>
      <h1>Chat</h1>
      <div className="redirect-to">
      <button className="btn-home" onClick={() => navigate("/")}>
        Go Home
      </button></div>
    </div>
  
    </div>
  );
};

  
  


export default Chat
