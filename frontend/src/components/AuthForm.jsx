import React, { useState } from 'react';
import { authUser } from '../services/api';

export default function AuthForm({ title, endpoint, onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        const response = await authUser(endpoint, { username, password });
        
        setIsLoading(false);

        if (response.error) {
            setError(response.error);
        } else {
            if (endpoint.includes('login')) {
                localStorage.setItem('token', response.data.access_token);
                if (onSuccess) onSuccess();
            } else {
                setMessage('Registration successful! Please login.');
            }
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{title}</h2>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center text-sm">{error}</p>}
            {message && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-center text-sm">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    disabled={isLoading}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-indigo-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : title}
                </button>
            </form>
        </div>
    );
}
