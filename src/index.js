import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, json, useParams } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/AllPosts';
import Post from './components/PostView';
import { Messages } from './components/Messages';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
    setIsLoggedIn(false);
  }

  const fetchPosts = () => {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(json => setPosts(json.data.posts));
  }

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');
    setToken(token);
    if (token) {
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(result => {
          if (!result.success) {
            logout();
          } else {
            const user = result.data;
            setUser(user);
          }
        })
        .catch(err => console.log(err));
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    exchangeTokenForUser();
    fetchPosts();
  }, [token]);

  return (
    <div>
      <h1 id='page-title'>Strangers Things</h1>
      <nav id='nav-bar'>
        <Link to='/posts'>Posts ({posts.length})</Link>
        <Link to='/messages'>Messages ({user.messages ? user.messages.length : null})</Link>
        <Link to='/login'>Login</Link>
        {
          user._id ? null : <Link to='/register'>Register</Link>
        }
      </nav>
      <Routes>
        <Route path='/posts' element={
          <Posts posts={posts} setPosts={setPosts} isLoggedIn={isLoggedIn} token={token} />
        } />
        <Route path='/posts/:id' element={
          <Post posts={posts} setPosts={setPosts} token={token} isLoggedIn={isLoggedIn} />
        } />
        <Route path='/login' element={
          user._id ? <div>Welcome {user.username} <button onClick={logout}>Logout</button></div> :
            <Login exchangeTokenForUser={exchangeTokenForUser} />
        } />
        <Route path='/register' element={
          <Register />
        } />
        <Route path='/messages' element={
          user._id ? <Messages user={user} /> : <h2 className='please-log-in'>You must be logged in to view your messages.</h2>
        } />
      </Routes>
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
