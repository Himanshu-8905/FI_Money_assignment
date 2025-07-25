import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';
import UpdateQuantityForm from '../components/UpdateQuantityForm';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const fetchProducts = useCallback(async () => {
        const response = await getProducts();
        if (response.error) {
            setError(response.error);
            if (response.error.toLowerCase().includes('token')) {
                handleLogout();
            }
        } else {
            setProducts(response.data.products);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/login";
    };

    const handleConfirmDelete = async () => {
        if (!deletingProduct) return;
        
        setIsDeleting(true);
        const response = await deleteProduct(deletingProduct._id);
        setIsDeleting(false);

        if (response.error) {
            setError(response.error);
        } else {
            setDeletingProduct(null);
            fetchProducts(); // Refetch products after deletion
        }
    };

    return (
        <div>
            <nav className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <h1 className="text-3xl font-bold text-gray-800 self-center">Inventory</h1>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md self-center transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
                    <div className="flex justify-between items-center mb-6 px-4 sm:px-0">
                        <h2 className="text-3xl font-bold text-gray-900">Your Products</h2>
                        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                            {showAddForm ? 'Cancel' : '+ Add Product'}
                        </button>
                    </div>

                    {showAddForm && <AddProductForm onProductAdded={() => { fetchProducts(); setShowAddForm(false); }} />}
                    
                    {editingProduct && <UpdateQuantityForm product={editingProduct} onProductUpdated={() => { fetchProducts(); setEditingProduct(null); }} onCancel={() => setEditingProduct(null)} />}

                    {deletingProduct && (
                        <DeleteConfirmationModal
                            product={deletingProduct}
                            onConfirm={handleConfirmDelete}
                            onCancel={() => setDeletingProduct(null)}
                            isLoading={isDeleting}
                        />
                    )}

                    <ProductList 
                        products={products} 
                        onEditQuantity={setEditingProduct} 
                        onDeleteProduct={setDeletingProduct}
                    />
                </div>
            </main>
        </div>
    );
}
