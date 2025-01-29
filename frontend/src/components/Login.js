import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            onChange={onChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                            required 
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
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Login
                    </button>
                </form>
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    );
};

export default Login;