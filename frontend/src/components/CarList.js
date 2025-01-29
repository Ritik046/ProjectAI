import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const fetchCars = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/cars?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCars(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch cars');
        }
    };

    useEffect(() => {
        fetchCars();
       
    }, [search]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Cars</h2>
            <div className="flex flex-wrap items-center justify-between mb-4">
                <div>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
                    >
                        Logout
                    </button>
                    <Link to="/cars/new">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2">
                            Add New Car
                        </button>
                    </Link>
                </div>
                <input 
                    type="text" 
                    placeholder="Search Cars..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="w-full sm:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {cars.map(car => (
                    <li key={car._id} className="bg-white shadow-md rounded-lg p-4">
                        {car.images.length > 0 && (
                            <img 
                                src={`http://localhost:5000/${car.images[0]}`} 
                                alt={car.title} 
                                className="w-full h-48 object-cover mb-4 rounded-lg"
                            />
                        )}
                        <Link to={`/cars/${car._id}`}>
                            <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">{car.title}</h3>
                        </Link>
                        <p className="text-gray-700 mb-2">{car.description}</p>
                        <p className="text-gray-500">Tags: {car.tags.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;