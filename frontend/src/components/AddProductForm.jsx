import React, { useState } from 'react';
import { addProduct } from '../services/api';

export default function AddProductForm({ onProductAdded }) {
    const [formData, setFormData] = useState({ name: '', type: '', sku: '', image_url: '', description: '', quantity: '', price: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        const dataToSubmit = {
            ...formData,
            quantity: Number(formData.quantity),
            price: Number(formData.price)
        };

        const response = await addProduct(dataToSubmit);
        setIsLoading(false);
        if (response.error) {
            setError(response.error);
        } else {
            onProductAdded();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 mx-4 sm:mx-0">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded-md" required disabled={isLoading} />
                <input name="type" value={formData.type} onChange={handleChange} placeholder="Type (e.g., Electronics)" className="p-2 border rounded-md" required disabled={isLoading} />
                <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" className="p-2 border rounded-md" required disabled={isLoading} />
                <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" className="p-2 border rounded-md" disabled={isLoading} />
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="p-2 border rounded-md" required min="0" disabled={isLoading} />
                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded-md" required min="0" disabled={isLoading} />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded-md md:col-span-2" rows="3" disabled={isLoading} />
                <button type="submit" className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-indigo-300" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}
