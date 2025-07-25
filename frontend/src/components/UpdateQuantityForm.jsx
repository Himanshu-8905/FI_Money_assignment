import React, { useState } from 'react';
import { updateProductQuantity } from '../services/api';

export default function UpdateQuantityForm({ product, onProductUpdated, onCancel }) {
    const [quantity, setQuantity] = useState(product.quantity);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const response = await updateProductQuantity(product._id, Number(quantity));
        setIsLoading(false);
        if (response.error) {
            setError(response.error);
        } else {
            onProductUpdated();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                 <h3 className="text-xl font-bold mb-1">Update Quantity</h3>
                 <p className="text-gray-600 mb-4">for {product.name}</p>
                 {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                 <form onSubmit={handleSubmit}>
                     <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 border rounded-md mb-4"
                        required
                        min="0"
                        disabled={isLoading}
                     />
                     <div className="flex justify-end gap-4">
                        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors" disabled={isLoading}>Cancel</button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-blue-300" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update'}
                        </button>
                     </div>
                 </form>
            </div>
        </div>
    );
}
