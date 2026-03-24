import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./CreatePortal.css";

const options = ["Profile", "Settings", "Logout"];

export default function CreatePortal() {
    const [open, setOpen] = useState(false);
    const [usePortal, setUsePortal] = useState(false);

    const buttonRef = useRef(null);

    // get button position for portal relative to viewport
    const rect = buttonRef.current?.getBoundingClientRect();

    return (
        <>
            <div className="wrapper">
                <h4>Dropdown</h4>

                <button
                    ref={buttonRef}
                    className="button"
                    onClick={() => setOpen(!open)}
                >
                    Open Dropdown
                </button>

                <button onClick={() => setUsePortal(!usePortal)}>
                    Toggle Portal
                </button>

                {/* ❌ Without Portal */}
                {open && !usePortal && (
                    <div className="dropdown">
                        <div className="menu">
                            {options.map((item) => (
                                <div key={item}>{item}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ✅ With Portal */}
            {open && usePortal && rect &&
                createPortal(
                    <div
                        className="portalMenu"
                        style={{
                            top: rect.bottom + window.scrollY,
                            left: rect.left + window.scrollX
                        }}
                    >
                        {options.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    );
}


/*
===============================
📌 React createPortal - Notes
===============================

🔹 What is createPortal?
- A React API to render a component outside its parent DOM hierarchy
- Keeps React logic same, only DOM placement changes

Syntax:
createPortal(children, container)

----------------------------------------

🔹 Why do we need it?
- To escape parent layout restrictions like:
  • overflow: hidden / auto
  • z-index issues
  • stacking context problems

----------------------------------------

🔹 Core Concept
- React Tree ≠ DOM Tree

React Tree:
App → Dropdown

DOM (with portal):
body → Dropdown   (moved here)

👉 Logic stays same, UI moves

----------------------------------------

🔹 Most Common Use Cases
- Dropdowns (menus getting clipped)
- Modals / Dialogs
- Tooltips / Popovers
- Side panels / Drawers

----------------------------------------

🔹 Why z-index fails?
- z-index → controls layering (who is on top)
- overflow → controls visibility (what is visible)

👉 overflow: hidden clips child no matter z-index

----------------------------------------

🔹 How Portal fixes it?
- Moves element outside problematic parent
- Usually render into: document.body

createPortal(<UI />, document.body);

👉 No clipping, full visibility

----------------------------------------

🔹 Important Rule
- Portal works ONLY if target container is NOT restricted

❌ Wrong:
createPortal(UI, parentWithOverflowHidden)

✅ Correct:
createPortal(UI, document.body)

----------------------------------------

🔹 When NOT to use
- Normal UI rendering
- No layout/clipping issues
- Simple components

----------------------------------------

🔹 Senior-level takeaway
- Portal is for "floating UI"
- Use only when UI must ignore parent layout

----------------------------------------

🔹 One-line summary
👉 Render logically here, display physically elsewhere

================================
*/