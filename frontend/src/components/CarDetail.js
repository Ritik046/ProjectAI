
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [error, setError] = useState('');

    const fetchCar = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCar(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch car');
        }
    };

    useEffect(() => {
        fetchCar();
        // eslint-disable-next-line
    }, []);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this car?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete car');
        }
    };

    if (!car) return <p className="text-center mt-4">Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4 text-center">{car.title}</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                {car.images.length > 0 && (
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {car.images.map((image, index) => (
                                <img 
                                    key={index}
                                    src={`http://localhost:5000/${image}`} 
                                    alt={`${car.title} ${index + 1}`} 
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex-1 mt-4 md:mt-0">
                    <p className="text-gray-700 mb-4">{car.description}</p>
                    <p className="text-gray-500 mb-4">Tags: {car.tags.join(', ')}</p>
                    <div className="flex items-center space-x-4 mb-4">
                        <Link to={`/cars/edit/${car._id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </button>
                        </Link>
                        <button 
                            onClick={handleDelete} 
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                    <Link to="/" className="text-blue-500 hover:underline">Back to List</Link>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;