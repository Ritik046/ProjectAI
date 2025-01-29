import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Signup</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            value={username} 
                            onChange={onChange} 
                            placeholder="Username" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            onChange={onChange} 
                            placeholder="Email" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password} 
                            onChange={onChange} 
                            placeholder="Password" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;