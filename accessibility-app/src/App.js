import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Ensure Header is exported as default
import Footer from './components/Footer'; // Ensure Footer is exported as default
import Login from './components/Login'; // Ensure Login is exported as default
import SignUp from './components/signup'; // Ensure SignUp is exported as default

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const RouteSuggestions = lazy(() => import('./components/RouteSuggestions'));
const MyMap = lazy(() => import('./components/MyMap'));

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = React.useState(false);

    // Error handling
    const resetError = () => {
        setHasError(false);
    };

    React.useEffect(() => {
        const handleError = () => {
            setHasError(true);
        };

        window.addEventListener('error', handleError);
        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (hasError) {
        return (
            <div>
                <h1>Something went wrong loading the application.</h1>
                <button onClick={resetError}>Try Again</button>
            </div>
        );
    }

    return children;
};

const App = () => {
    return (
        <div>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/route-suggestions" element={<RouteSuggestions />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/map" element={<MyMap />} />
                    </Routes>
                </ErrorBoundary>
            </Suspense>
            <Footer />
        </div>
    );
};

export default App;
