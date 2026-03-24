import React, { useEffect, useState } from 'react'

const Hook_useEffect = () => {
    const [count, setCount] = useState(1)

    useEffect(() => {
        const id = setInterval(() => {
            console.log("s")
        }, 1000)
        // console.log("use Effect")


    })

    return (
        <div>
            <section>Use Effect</section>
            <button onClick={() => setCount(prev => prev + 1)}>Test</button>
        </div>
    )
}

export default Hook_useEffect

/*
1. What is useEffect?
- useEffect is a React Hook used to handle side effects in functional components.
- Side effects are operations that affect something outside the component render.
- Examples: API calls, subscriptions, timers, event listeners, DOM access, localStorage.

--------------------------------------------------

2. Why useEffect is needed?
- React rendering must be pure (no side effects during render).
- React may re-render components multiple times.
- Side effects during render can cause bugs and unpredictable behavior.
- useEffect ensures side effects run AFTER the UI is rendered to the screen.

--------------------------------------------------

3. Basic Syntax
useEffect(() => {
  // side effect logic
}, [dependencies]);

- First argument: effect callback
- Second argument: dependency array (controls when effect runs)

--------------------------------------------------

4. When does useEffect run?
- useEffect runs AFTER React commits the UI to the DOM.
- It never runs during rendering.

--------------------------------------------------

5. useEffect without dependency array
useEffect(() => {
  // runs on every render
});

- Runs after EVERY render
- Runs after every state or prop change
- Generally considered a bad practice
- Can cause performance issues or infinite loops

--------------------------------------------------

6. useEffect with empty dependency array
useEffect(() => {
  // runs once
}, []);

- Runs only once after initial render
- Similar to componentDidMount
- Common use cases:
  - Initial API calls
  - One-time setup (event listeners, subscriptions)

- React Strict Mode (development only):
  - Effect runs twice to detect side effects
  - Production runs only once

--------------------------------------------------

7. useEffect with dependencies
useEffect(() => {
  // runs when dependency changes
}, [count]);

- Runs after first render
- Runs again whenever 'count' changes
- Effect depends on values listed in dependency array

--------------------------------------------------

8. Dependency Array Concept
- Dependency array tells React:
  "Re-run this effect ONLY if these values change"
- React compares dependencies using Object.is()
- Missing dependencies can cause stale values and bugs

--------------------------------------------------

9. Cleanup Function
useEffect(() => {
  // setup logic

  return () => {
    // cleanup logic
  };
}, []);

- Cleanup function is optional
- Used to:
  - Clear timers
  - Remove event listeners
  - Cancel subscriptions
  - Prevent memory leaks

--------------------------------------------------

10. When cleanup runs?
- Before the effect runs again (on dependency change)
- When the component unmounts

Order:
1. Cleanup of previous effect
2. New effect execution

--------------------------------------------------

11. useEffect Execution Order
- Render phase happens first
- Browser paints the UI
- useEffect runs after paint
- Cleanup runs before next effect or unmount

--------------------------------------------------

12. Async in useEffect
- useEffect callback cannot be async

❌ Incorrect:
useEffect(async () => {});

✔️ Correct:
useEffect(() => {
  const fetchData = async () => {
    await fetch("/api");
  };
  fetchData();
}, []);

--------------------------------------------------

13. Closure Behavior in useEffect
useEffect(() => {
  console.log(count);
}, []);

- Logs only initial value of count
- Effect captures values from render in which it was created
- Missing dependencies cause stale closures

--------------------------------------------------

14. Infinite Loop Scenario
useEffect(() => {
  setCount(count + 1);
}, [count]);

- Effect updates a dependency
- Dependency change triggers effect again
- Causes infinite loop if not controlled properly

--------------------------------------------------

15. useEffect vs Class Lifecycle
- componentDidMount → useEffect(() => {}, [])
- componentDidUpdate → useEffect(() => {}, [deps])
- componentWillUnmount → cleanup function

--------------------------------------------------

16. Key Interview Line (Important)
- Rendering decides WHAT UI looks like
- useEffect decides WHAT HAPPENS because UI exists

17. Why useEffect callback cannot be async?
- React expects useEffect callback to return:
  - nothing (undefined), OR
  - a cleanup function
- Async functions always return a Promise
- Promise cannot be used as a cleanup function

--------------------------------------------------

18. Summary Rules
- Never cause side effects during render
- Always declare correct dependencies
- Use cleanup to avoid memory leaks
- Avoid useEffect without dependency array
- Trust ESLint dependency warnings
*/




