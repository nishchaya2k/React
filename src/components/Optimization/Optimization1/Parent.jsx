import React, { useState, Suspense, useCallback } from 'react';
import Child_2 from './Child_2';
const Child_1 = React.lazy(() => import("./Child_1"))

const Parent = () => {
    const [count, setCount] = useState(0);


    const handleOnChildClick_2 = useCallback(() => {
        console.log("Child_2 clicked")
    }, [])
    return (
        <div>
            <Suspense fallback={<p>loading...</p>}>
                <Child_1 state={count} />
            </Suspense>
            <Child_2 onChildClick={handleOnChildClick_2} />
            <button onClick={() => setCount(prev => prev + 1)}>Child 1 Increament</button>
        </div>
    )
}

export default Parent






/*
============================================================
REACT PERFORMANCE OPTIMIZATION NOTES
Concepts Covered:
1) Code Splitting — React.lazy + Suspense
2) useMemo — Memoizing Expensive Calculations
3) useCallback — Memoizing Functions
============================================================
*/


/*
============================================================
1) CODE SPLITTING — React.lazy + Suspense
============================================================

Problem:
By default React bundles all components into one large JS file.
This increases initial bundle size and slows down the first page load.

Example without code splitting:

App Bundle
   |
   |-- Parent
   |-- Child
   |-- Other components

Everything loads immediately.


------------------------------------------------------------
Solution: React.lazy
------------------------------------------------------------

React.lazy allows components to be loaded only when they are needed.

Example:

const Child = React.lazy(() => import("./Child"))

Now Child component is loaded dynamically when required.


------------------------------------------------------------
Why Suspense Is Needed
------------------------------------------------------------

Lazy loading is asynchronous.

React needs a temporary UI while the component is loading.

Example:

<Suspense fallback={<p>loading...</p>}>
   <Child />
</Suspense>


------------------------------------------------------------
Render Flow
------------------------------------------------------------

Parent render
     ↓
Child lazy import triggered
     ↓
fallback UI shown ("loading...")
     ↓
Child downloaded
     ↓
Child rendered


------------------------------------------------------------
Benefits
------------------------------------------------------------

• Smaller initial bundle
• Faster page load
• Better performance
• Reduced unused code loading


------------------------------------------------------------
Common Use Cases
------------------------------------------------------------

• Route based code splitting
• Large dashboards
• Charts and graphs
• Heavy components
*/


/*
============================================================
2) useMemo — Memoizing Expensive Calculations
============================================================

Problem:
Whenever a component re-renders,
all functions inside it run again.

Example:

function getLen(data){
   console.log("calculating")
}

If Parent state changes:
   |
Child re-renders
   |
getLen runs again (even if data didn't change)

This causes unnecessary computation.


------------------------------------------------------------
Solution: useMemo
------------------------------------------------------------

useMemo memoizes (caches) the result of a calculation.

Example:

const totalEntries = useMemo(() => getLen(dummyData), [])


------------------------------------------------------------
How useMemo Works
------------------------------------------------------------

First render:
   |
getLen runs
   |
result stored in memory

Next renders:
   |
React returns stored result
   |
getLen NOT executed again


------------------------------------------------------------
Dependency Array
------------------------------------------------------------

[]  → calculation runs only once (on mount)

[data] → recalculates when data changes


------------------------------------------------------------
Example Flow (Your Code)
------------------------------------------------------------

Initial render
   |
"I am calculating" printed

Click increment
   |
Parent re-render
   |
Child re-render
   |
useMemo returns cached value
   |
getLen NOT executed again


------------------------------------------------------------
When To Use useMemo
------------------------------------------------------------

• Expensive calculations
• Sorting large arrays
• Filtering large datasets
• Derived state computations


------------------------------------------------------------
Important Note
------------------------------------------------------------

useMemo is an optimization tool.

Do NOT use it for small or cheap calculations.
*/


/*
============================================================
3) useCallback — Memoizing Functions
============================================================

Problem:
Functions inside React components
are recreated on every render.

Example:

function Component() {
   const handleClick = () => {
      console.log("clicked")
   }
}

Render 1 → handleClick (ref1)
Render 2 → handleClick (ref2)
Render 3 → handleClick (ref3)

Even if the function logic is the same,
the function reference changes.


------------------------------------------------------------
Why This Is A Problem
------------------------------------------------------------

1) React.memo Break

If a parent passes a function as a prop:

<Child onClick={handleClick} />

Child compares props using shallow comparison.

Render 1:
onClick = ref1

Render 2:
onClick = ref2

React thinks prop changed
→ Child re-renders unnecessarily.


------------------------------------------------------------

2) Event Listener Problems

Example:

window.addEventListener("load", handleLoad)

removeEventListener requires the SAME function reference.

If function changes:

addEventListener("load", f1)
removeEventListener("load", f2) ❌

Listener will NOT be removed.


------------------------------------------------------------
Solution: useCallback
------------------------------------------------------------

useCallback memoizes the function reference.

Example:

const handleLoad = useCallback(() => {
   console.log("Loaded")
}, [])

Now React reuses the same function reference.


------------------------------------------------------------
How useCallback Works
------------------------------------------------------------

Render 1 → create function
Render 2 → reuse same function
Render 3 → reuse same function


------------------------------------------------------------
Syntax
------------------------------------------------------------

const memoizedFunction = useCallback(() => {
   // function logic
}, [dependencies])


------------------------------------------------------------
Dependency Array
------------------------------------------------------------

[] → function created once (on mount)

[count] → function recreated when count changes

Example:

const handleClick = useCallback(() => {
   console.log(count)
}, [count])


------------------------------------------------------------
When To Use useCallback
------------------------------------------------------------

1) Passing functions to memoized components

Example:

const Child = React.memo(() => {})

<Child handleClick={handleClick} />


2) Event listeners

window.addEventListener
document.addEventListener


3) Stable function references in dependency arrays

useEffect(() => {
   doSomething()
}, [handleClick])


------------------------------------------------------------
When NOT To Use useCallback
------------------------------------------------------------

Avoid unnecessary use.

Example of overuse:

const handleClick = useCallback(() => {
   setCount(c => c + 1)
}, [])

If function is small and not passed to children,
useCallback adds unnecessary complexity.


------------------------------------------------------------
Difference Between useMemo and useCallback
------------------------------------------------------------

useMemo → memoizes VALUE

const value = useMemo(() => compute(), [])

useCallback → memoizes FUNCTION

const fn = useCallback(() => {}, [])


------------------------------------------------------------
Your Code Example
------------------------------------------------------------

const handleOnWindowLoad = useCallback(() => {
   console.log("Loaded")
}, [])

useEffect(() => {

   window.addEventListener("load", handleOnWindowLoad)

   return () => {
      window.removeEventListener("load", handleOnWindowLoad)
   }

}, [handleOnWindowLoad])


Why useCallback is important here:

Without it:
Each render creates a new function reference,
so removeEventListener may fail.

With useCallback:
The same function reference is preserved,
so event listener cleanup works correctly.


------------------------------------------------------------
Core Idea
------------------------------------------------------------

React recreates functions on every render.

useCallback keeps the function identity stable
when needed.
*/


/*
============================================================
3) useCallback — Memoizing Function References
============================================================

Problem:
Functions inside React components are recreated on every render.

Example:

function Component() {
   const handleClick = () => {
      console.log("clicked")
   }
}

Render 1 → handleClick (f1)
Render 2 → handleClick (f2)
Render 3 → handleClick (f3)

Even if the logic is the same, the function reference changes.


------------------------------------------------------------
Why Changing Function Reference Is A Problem
------------------------------------------------------------

1) React.memo Re-render Issue

If a parent passes a function as a prop:

<Child onClick={handleClick} />

Child wrapped with React.memo compares props by reference.

Render 1 → onClick = f1
Render 2 → onClick = f2

Since f1 ≠ f2 → React thinks prop changed
→ Child re-renders unnecessarily.


2) Event Listener Cleanup Issue

Browser requires the SAME function reference to remove listeners.

Example:

addEventListener("load", f1)
removeEventListener("load", f2) ❌

Listener will not be removed.


------------------------------------------------------------
Solution — useCallback
------------------------------------------------------------

useCallback memoizes the function reference
so React can reuse the same function between renders.

Example:

const handleClick = useCallback(() => {
   console.log("clicked")
}, [])


------------------------------------------------------------
How useCallback Works
------------------------------------------------------------

First render
↓
React stores function reference

Next renders
↓
If dependencies unchanged
↓
React returns stored function


------------------------------------------------------------
Syntax
------------------------------------------------------------

const memoizedFn = useCallback(() => {
   // logic
}, [dependencies])


------------------------------------------------------------
Dependency Behavior
------------------------------------------------------------

[] → function created once

[count] → new function created when count changes


------------------------------------------------------------
Common Use Cases
------------------------------------------------------------

1) Preventing unnecessary child re-renders

Parent:

const handleChildClick = useCallback(() => {
   console.log("Child clicked")
}, [])

<Child_2 onChildClick={handleChildClick} />

Child:

const Child_2 = memo(({ onChildClick }) => {
   console.log("Child_2 rendered")
})

Explanation:

Parent re-render
↓
Without useCallback → new function created
↓
React.memo detects prop change
↓
Child re-renders

With useCallback
↓
Function reference stays same
↓
React.memo skips re-render


------------------------------------------------------------

2) Stable event listeners

const handleLoad = useCallback(() => {
   console.log("Loaded")
}, [])

useEffect(() => {

   window.addEventListener("load", handleLoad)

   return () => {
      window.removeEventListener("load", handleLoad)
   }

}, [handleLoad])

Reason:
addEventListener and removeEventListener
must use the same function reference.


------------------------------------------------------------
When NOT To Use useCallback
------------------------------------------------------------

Avoid unnecessary usage.

Example:

const handleClick = useCallback(() => {
   setCount(c => c + 1)
}, [])

If function is small and not passed to children,
useCallback provides little benefit.


------------------------------------------------------------
Difference From useMemo
------------------------------------------------------------

useMemo → memoizes a VALUE

const value = useMemo(() => compute(), [])

useCallback → memoizes a FUNCTION

const fn = useCallback(() => {}, [])


------------------------------------------------------------
Core Idea
------------------------------------------------------------

React recreates functions on every render.

useCallback keeps the function reference stable
when dependency values do not change.
*/