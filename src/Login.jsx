import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesheets/login.css';
import logo from './assets/logo.jpg';

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [phoneInput, setPhoneInput] = useState('');

    const handleLogin = async (provider) => {
        setIsLoading(true);
        setError('');
        
        try {
            // Here you would implement actual authentication logic
            // For now, we'll just simulate a successful login
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/home');
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phoneInput.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }
        handleLogin('phone');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <img 
                            src={logo} 
                            alt="App Logo" 
                            className="login-logo"
                        />
                        <h1>Welcome Back</h1>
                        <p className="login-subtitle">Sign in to continue to your account</p>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    {selectedMethod === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} className="phone-form">
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input 
                                    type="tel" 
                                    id="phone"
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="login-button phone-submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending Code...' : 'Send Verification Code'}
                            </button>
                            <button 
                                type="button"
                                className="back-button"
                                onClick={() => setSelectedMethod(null)}
                            >
                                Back to Login Options
                            </button>
                        </form>
                    ) : (
                        <div className="login-methods">
                            <button 
                                type="button" 
                                onClick={() => handleLogin('google')}
                                className="login-button google"
                                disabled={isLoading}
                            >
                                <span className="icon">G</span>
                                <span className="text">{isLoading ? 'Loading...' : 'Continue with Google'}</span>
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={() => handleLogin('facebook')}
                                className="login-button facebook"
                                disabled={isLoading}
                            >
                                <span className="icon">f</span>
                                <span className="text">{isLoading ? 'Loading...' : 'Continue with Facebook'}</span>
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={() => setSelectedMethod('phone')}
                                className="login-button phone"
                                disabled={isLoading}
                            >
                                <span className="icon">📱</span>
                                <span className="text">{isLoading ? 'Loading...' : 'Continue with Phone'}</span>
                            </button>
                            
                            <div className="login-divider">
                                <span>or</span>
                            </div>
                            
                            <button 
                                type="button"
                                className="login-button email"
                                onClick={() => navigate('/signup')}
                            >
                                Create New Account
                            </button>
                        </div>
                    )}
                    
                    <div className="login-footer">
                        <p>By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;