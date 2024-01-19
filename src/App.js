// App.js

import { ChatEngine } from 'react-chat-engine';
import { createContext, useEffect, useState } from 'react';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

const projectID = 'd43c2444-bdd0-40ec-a4ff-d28b7f8a2341';

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-full ${theme}`}>
        <ChatEngine
          height="100vh"
          projectID={projectID}
          userName={localStorage.getItem('username')}
          userSecret={localStorage.getItem('password')}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
        <div className="switch">
        <label>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} />
      </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
