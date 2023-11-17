import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set the default authorization header for all axios requests
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    // Fetch user information if authenticated
    if (authToken) {
      axios.get('http://your-django-api-url/user/').then((response) => {
        setUser(response.data);
      }).catch((error) => {
        console.error('Error fetching user:', error);
      });
    }
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/protected">Protected</Link></li>
            {authToken && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/login">
          {authToken ? <Redirect to="/protected" /> : <LoginForm setAuthToken={setAuthToken} />}
        </Route>
        <Route path="/register">
          {authToken ? <Redirect to="/protected" /> : <RegistrationForm setAuthToken={setAuthToken} />}
        </Route>
        <PrivateRoute path="/protected" authToken={authToken}>
          <ProtectedPage user={user} />
        </PrivateRoute>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children, authToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const LoginForm = ({ setAuthToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://your-django-api-url/login/', formData);
      localStorage.setItem('authToken', response.data.token);
      setAuthToken(response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

const RegistrationForm = ({ setAuthToken }) => {
  // Similar to LoginForm, implement registration logic here
};

const ProtectedPage = ({ user }) => {
  return (
    <div>
      {user && <p>Welcome, {user.username}!</p>}
      <p>This is a protected page.</p>
    </div>
  );
};

export default App;
