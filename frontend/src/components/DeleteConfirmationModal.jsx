import React from 'react';

export default function DeleteConfirmationModal({ product, onConfirm, onCancel, isLoading }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                 <h3 className="text-xl font-bold mb-1">Confirm Deletion</h3>
                 <p className="text-gray-600 mb-4">Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
                 <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors" disabled={isLoading}>Cancel</button>
                    <button type="button" onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-red-300" disabled={isLoading}>
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                 </div>
            </div>
        </div>
    );
}
