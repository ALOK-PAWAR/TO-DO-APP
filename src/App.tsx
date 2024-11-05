import React, { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { TodoList } from './components/TodoList';

interface User {
  username: string;
  password: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem('currentUser');
  });

  const handleLogin = (username: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.username === username);
    
    if (user) {
      localStorage.setItem('currentUser', username);
      setCurrentUser(username);
    } else {
      alert('User not found. Please register first.');
    }
  };

  const handleRegister = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: User) => u.username === username)) {
      alert('Username already exists. Please choose another one.');
      return;
    }

    const updatedUsers = [...users, { username, password }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', username);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser ? (
        <TodoList username={currentUser} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
}

export default App;