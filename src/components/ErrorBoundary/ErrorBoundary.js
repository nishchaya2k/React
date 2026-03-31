/*
============================================================
REACT ERROR BOUNDARY – COMPLETE NOTES (DETAILED)
============================================================

◆ 1. WHAT IS ERROR BOUNDARY
------------------------------------------------------------
- Error Boundary is a React component that catches JavaScript errors
  in its child component tree.

- It prevents the entire UI from crashing.

- Works like a "try-catch" for React components.

Example:
<ErrorBoundary>
  <App />
</ErrorBoundary>

------------------------------------------------------------

◆ 2. WHY DO WE NEED ERROR BOUNDARY
------------------------------------------------------------
- Without Error Boundary:
  → One component crash = Whole app crash (white screen)

- With Error Boundary:
  → Only failed part is replaced with fallback UI
  → Rest of the app continues working

------------------------------------------------------------

◆ 3. WHERE IT WORKS (IMPORTANT)
------------------------------------------------------------
ErrorBoundary catches errors in:

1. Rendering phase
2. Lifecycle methods
3. Constructor of child components

Example:
function Buggy() {
  throw new Error("Crash"); // ✅ caught
}

------------------------------------------------------------

◆ 4. WHERE IT DOES NOT WORK
------------------------------------------------------------
ErrorBoundary does NOT catch errors in:

1. Event handlers
2. Async code (setTimeout, API calls)
3. useEffect / promises
4. Server-side rendering

Example:
setTimeout(() => {
  throw new Error("Async error"); // ❌ not caught
}, 1000);

Reason:
→ These run outside React execution

------------------------------------------------------------

◆ 5. CORE CONCEPT (VERY IMPORTANT)
------------------------------------------------------------
👉 It’s NOT about where code is written
👉 It’s about who executes it

Case 1: Render phase
React → executes component → can catch error ✅

Case 2: Async / Event
Browser → executes callback → React not involved ❌

------------------------------------------------------------

◆ 6. REACT INTERNAL WORKING (SIMPLIFIED)
------------------------------------------------------------
React wraps rendering like:

try {
  render(Component)
} catch (e) {
  showFallbackUI()
}

👉 Works only during render phase

Async code is NOT inside this try-catch

------------------------------------------------------------

◆ 7. REQUIRED METHODS (CLASS COMPONENT)
------------------------------------------------------------

1. getDerivedStateFromError(error)
   - Static method
   - Updates state to show fallback UI

2. componentDidCatch(error, info)
   - Used for logging errors
   - Send errors to monitoring tools (Sentry, etc.)

------------------------------------------------------------

◆ 8. MINIMAL IMPLEMENTATION
------------------------------------------------------------

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong 🚨</h2>;
    }

    return this.props.children;
  }
}

------------------------------------------------------------

◆ 9. HOW IT WORKS (FLOW)
------------------------------------------------------------
1. Child component crashes ❌
2. React calls getDerivedStateFromError()
3. State updates → hasError = true
4. componentDidCatch() runs (logging)
5. Fallback UI is rendered ✅

------------------------------------------------------------

◆ 10. IMPORTANT BEHAVIOR
------------------------------------------------------------
- One ErrorBoundary = protects its children only

- If multiple components inside:
  → One crash = whole boundary fallback

- Better practice:
  → Use multiple boundaries for isolation

------------------------------------------------------------

◆ 11. REAL-WORLD USAGE
------------------------------------------------------------
- Wrap entire app → global fallback
- Wrap critical components → isolated failures

Example:
<ErrorBoundary>
  <Sidebar />
</ErrorBoundary>

<ErrorBoundary>
  <MainContent />
</ErrorBoundary>

------------------------------------------------------------

◆ 12. HANDLING ASYNC ERRORS (IMPORTANT)
------------------------------------------------------------
ErrorBoundary won't catch:

fetch("/api")
  .catch(err => {
    throw err; // ❌ not caught
  });

Correct approach:

.catch(err => {
  setError(true);
});

OR (advanced):

if (error) {
  throw new Error("API failed"); // ✅ caught in render
}

------------------------------------------------------------

◆ 13. ALTERNATIVE (LIBRARY)
------------------------------------------------------------
- react-error-boundary

Benefits:
- No need to write class component
- Cleaner API
- Supports reset + retry logic

------------------------------------------------------------

◆ 14. KEY TAKEAWAYS
------------------------------------------------------------
- ErrorBoundary = try-catch for React UI

- Works ONLY during render phase

- Async & event errors are outside React → not caught

- Class components still exist because of this feature

------------------------------------------------------------

◆ 15. ONE-LINE SUMMARY
------------------------------------------------------------
👉 ErrorBoundary catches errors only when React is executing code
   (render phase), not when browser executes it later.

============================================================
*/