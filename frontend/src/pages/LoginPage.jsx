import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
    const [isLoginView, setIsLoginView] = useState(true);

    const handleLoginSuccess = () => {
        // On successful login, navigate to the dashboard by reloading the page.
        // This triggers the route guard in App.jsx.
        window.location.href = "/";
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md m-4">
                {isLoginView ? (
                    <AuthForm title="Login" endpoint="/login" onSuccess={handleLoginSuccess} />
                ) : (
                    <AuthForm title="Register" endpoint="/register" />
                )}
                <button
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="mt-6 text-center w-full text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
                >
                    {isLoginView ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
            </div>
        </div>
    );
}
