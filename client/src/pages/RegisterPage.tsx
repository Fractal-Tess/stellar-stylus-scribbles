import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const ok = await register(username, password);
    setLoading(false);
    if (ok) {
      setSuccess('Registration successful! You can now sign in.');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError('Registration failed. Username may already be taken.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
        aria-label="Register form"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && (
          <div className="mb-4 text-red-600" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-600" role="status">
            {success}
          </div>
        )}
        <label htmlFor="username" className="block mb-2 font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          aria-label="Username"
        />
        <label htmlFor="password" className="block mb-2 font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full px-3 py-2 mb-6 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          aria-label="Password"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
