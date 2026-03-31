import React from "react";

class ErrorBoundary extends React.Component {
    // Step 1: initial state
    state = { hasError: false };

    // Step 2: runs when child crashes
    static getDerivedStateFromError() {
        // update state → triggers fallback UI
        return { hasError: true };
    }

    // Step 3: used for logging error
    componentDidCatch(error, info) {
        console.log("Error:", error);
        console.log("Info:", info);
    }

    // Step 4: render UI
    render() {
        // if error → show fallback
        if (this.state.hasError) {
            return <h2>Something went wrong 🚨</h2>;
        }

        // otherwise → render children normally
        return this.props.children;
    }
}

export default ErrorBoundary;