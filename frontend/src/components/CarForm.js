
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const CarForm = ({ editMode }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
    });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [error, setError] = useState("");

    const { title, description, tags } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const fetchCar = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `http://localhost:5000/api/cars/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setFormData({
                title: res.data.title,
                description: res.data.description,
                tags: res.data.tags.join(", "),
            });
            setExistingImages(res.data.images);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch car");
        }
    };

    useEffect(() => {
        if (editMode) {
            fetchCar();
        }
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            data.append("title", title);
            data.append("description", description);
            data.append("tags", tags);
            images.forEach((image) => {
                data.append("images", image);
            });

            let res;
            if (editMode) {
                res = await axios.put(
                    `http://localhost:5000/api/cars/${id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                res = await axios.post("http://localhost:5000/api/cars", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit form");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">
                    {editMode ? "Edit Car" : "Add New Car"}
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                <form
                    className="space-y-4"
                    onSubmit={onSubmit}
                    encType="multipart/form-data"
                >
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            placeholder="Title"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            placeholder="Description"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="tags"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={onChange}
                            placeholder="Tags (comma separated)"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="images"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Images
                        </label>

                        <input
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={onFileChange}
                            disabled={editMode && existingImages.length >= 10}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        {editMode ? "Update Car" : "Add Car"}
                    </button>
                </form>
                {editMode && existingImages.length > 0 && (
                    <div>
                        <h3>Existing Images</h3>
                        {existingImages.map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/${img}`}
                                alt={`Existing ${index + 1}`}
                                width="100"
                            />
                        ))}
                    </div>
                )}
                <Link to="/">Back to List</Link>
            </div>
        </div>
    );
};

export default CarForm;
