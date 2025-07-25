import React from 'react';

export default function ProductList({ products, onEditQuantity, onDeleteProduct }) {
    if (!products || products.length === 0) {
        return <p className="text-center text-gray-500 mt-12">No products found. Add one to get started!</p>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0">
            {products.map(product => (
                <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                    <img 
                        src={product.image_url || `https://placehold.co/600x400/e2e8f0/4a5568?text=${encodeURIComponent(product.name)}`} 
                        alt={product.name} 
                        className="w-full h-48 object-cover" 
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image'; }}
                    />
                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-1">SKU: {product.sku}</p>
                        <p className="text-gray-600 text-sm mb-2 capitalize">Type: {product.type}</p>
                        <p className="text-gray-700 mb-4 text-sm flex-grow">{product.description || 'No description available.'}</p>
                         <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
                            <div>
                                <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                                <p className="text-md text-gray-600">Quantity: <span className="font-semibold">{product.quantity}</span></p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => onEditQuantity(product)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors">
                                    Edit Qty
                                </button>
                                <button onClick={() => onDeleteProduct(product)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
